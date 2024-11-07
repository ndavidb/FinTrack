using api.Data;
using api.Dto.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class AccountsController : ControllerBase
{
    private static readonly string DefaultUserRole = "User"; 
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AccountsController> _logger;
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _cache;
    public AccountsController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        ILogger<AccountsController> logger,
        ApplicationDbContext context,
        IMemoryCache cache)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _logger = logger;
        _context = context;
        _cache = cache;
    }

    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try
    {
        // Check if user exists before starting transaction
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            return BadRequest(new { errors = new[] { "Email is already registered" } });
        }

        // Start transaction
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var appUser = new AppUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                Portfolios = new List<Portfolio>(),
                RefreshTokens = new List<RefreshToken>()
            };

            // Create user
            var result = await _userManager.CreateAsync(appUser, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }

            // Add to role
            var roleResult = await _userManager.AddToRoleAsync(appUser, DefaultUserRole);
            if (!roleResult.Succeeded)
            {
                throw new Exception("Failed to assign user role");
            }

            // Create refresh token
            var refreshToken = _tokenService.GenerateRefreshToken();
            appUser.RefreshTokens.Add(refreshToken);

            // Save changes
            await _context.SaveChangesAsync();

            // Generate access token
            var accessToken = await _tokenService.CreateToken(appUser);

            // Commit transaction
            await transaction.CommitAsync();

            // Prepare response
            var authResponse = new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Email = appUser.Email,
                Roles = new List<string> { DefaultUserRole }
            };

            // Cache the user's basic info
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(30));
            _cache.Set($"user_{appUser.Id}", appUser, cacheEntryOptions);

            _logger.LogInformation("User {Email} registered successfully", registerDto.Email);
            return Ok(authResponse);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error during user registration for {Email}", registerDto.Email);
            throw;
        }
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error during registration for {Email}", registerDto.Email);
        return StatusCode(500, "An unexpected error occurred during registration");
    }
}
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            // First, get the user with their refresh tokens
            var user = await _userManager.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                _logger.LogWarning("Login attempt failed for non-existent user: {Email}", loginDto.Email);
                return Unauthorized(new {message = "Invalid email or password"} );
            }

            // Check password
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                _logger.LogWarning("Failed login attempt for user: {Email}", loginDto.Email);
                return Unauthorized(new {message = "Invalid email or password"} );
            }

            // Get roles first
            var roles = await _userManager.GetRolesAsync(user);

            // Clean up expired tokens and add new refresh token
            user.RefreshTokens.RemoveAll(r => r.IsExpired);
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);

            // Save changes
            await _context.SaveChangesAsync();

            // Generate access token
            var accessToken = await _tokenService.CreateToken(user);

            var authResponse = new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Email = user.Email,
                Roles = roles.ToList()
            };

            _logger.LogInformation("User {Email} logged in successfully", loginDto.Email);
            return Ok(authResponse);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for user {Email}", loginDto.Email);
            return StatusCode(500, "An unexpected error occurred during login");
        }
    }

    [Authorize]
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.RefreshToken))
            return BadRequest("Invalid refresh token");

        try
        {
            var user = await _userManager.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => 
                    u.RefreshTokens.Any(t => t.Token == request.RefreshToken));

            if (user == null)
                return Unauthorized("Invalid refresh token");

            var oldRefreshToken = user.RefreshTokens
                .Single(x => x.Token == request.RefreshToken);

            if (!oldRefreshToken.IsActive)
                return Unauthorized("Invalid refresh token");

            // Generate new tokens
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            var accessTokenTask = _tokenService.CreateToken(user);
            var rolesTask = _userManager.GetRolesAsync(user);

            // Update refresh token
            oldRefreshToken.Revoked = DateTime.UtcNow;
            oldRefreshToken.ReasonRevoked = "Refresh token rotation";
            user.RefreshTokens.Add(newRefreshToken);

            // Wait for all operations
            await Task.WhenAll(
                accessTokenTask,
                rolesTask,
                _context.SaveChangesAsync()
            );

            var response = new AuthResponse
            {
                AccessToken = await accessTokenTask,
                RefreshToken = newRefreshToken.Token,
                Email = user.Email,
                Roles = (await rolesTask).ToList()
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return StatusCode(500, "An unexpected error occurred while refreshing the token");
        }
    }

    [Authorize]
    [HttpPost("revoke-token")]
    public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.RefreshToken))
            return BadRequest("Token is required");

        try
        {
            var user = await _userManager.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => 
                    u.RefreshTokens.Any(t => t.Token == request.RefreshToken));

            if (user == null)
                return NotFound("Token not found");

            var refreshToken = user.RefreshTokens
                .Single(x => x.Token == request.RefreshToken);

            if (!refreshToken.IsActive)
                return BadRequest("Token is not active");

            // Revoke token
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.ReasonRevoked = "Revoked by user";
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking token");
            return StatusCode(500, "An unexpected error occurred while revoking the token");
        }
    }
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}