using api.Data;
using api.Dto.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class AccountsController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AccountsController> _logger;
    private readonly ApplicationDbContext _context;

    public AccountsController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        ILogger<AccountsController> logger,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _logger = logger;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var appUser = new AppUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(appUser, registerDto.Password);
        if (!result.Succeeded)
        {
            _logger.LogError("Failed to create user: {@Errors}", result.Errors);
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
        if (!roleResult.Succeeded)
        {
            _logger.LogError("Failed to add user to role: {@Errors}", roleResult.Errors);
            return StatusCode(500, "Failed to create user. Please try again later.");
        }

        var refreshToken = _tokenService.GenerateRefreshToken();
        appUser.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            AccessToken = await _tokenService.CreateToken(appUser),
            RefreshToken = refreshToken.Token,
            Email = appUser.Email,
            Roles = (await _userManager.GetRolesAsync(appUser)).ToList()
        });
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var user = await _userManager.Users
            .Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

        if (user == null) return Unauthorized("Invalid email or password");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Invalid email or password");

        // Remove expired refresh tokens
        user.RefreshTokens.RemoveAll(r => r.IsExpired);

        var refreshToken = _tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            AccessToken = await _tokenService.CreateToken(user),
            RefreshToken = refreshToken.Token,
            Email = user.Email,
            Roles = (await _userManager.GetRolesAsync(user)).ToList()
        });
    }

    [Authorize]
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.RefreshToken))
            return BadRequest("Invalid refresh token");

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

        // Replace old refresh token with a new one
        oldRefreshToken.Revoked = DateTime.UtcNow;
        oldRefreshToken.ReasonRevoked = "Refresh token rotated";
        
        var newRefreshToken = _tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            AccessToken = await _tokenService.CreateToken(user),
            RefreshToken = newRefreshToken.Token,
            Email = user.Email,
            Roles = (await _userManager.GetRolesAsync(user)).ToList()
        });
    }

    [Authorize]
    [HttpPost("revoke-token")]
    public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.RefreshToken))
            return BadRequest("Token is required");

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
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}