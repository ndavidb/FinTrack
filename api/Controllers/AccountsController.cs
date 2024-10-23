using api.Data;
using api.Dto.Account;
using api.Interfaces;
using api.Models;
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

    public AccountsController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        ILogger<AccountsController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var appUser = new AppUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        if (registerDto.Password != null)
        {
            var result = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (!result.Succeeded)
            {
                if (!result.Succeeded)
                {
                    // Clean up and simplify error messages
                    var simplifiedErrors = result.Errors.Select(error =>
                    {
                        // Map specific error messages to simpler versions
                        return error.Description switch
                        {
                            var msg when msg.Contains("Passwords must have at least one digit") 
                                => "Password must contain at least one number",
                            var msg when msg.Contains("Passwords must have at least one uppercase") 
                                => "Password must contain at least one uppercase letter",
                            var msg when msg.Contains("Passwords must have at least one lowercase") 
                                => "Password must contain at least one lowercase letter",
                            var msg when msg.Contains("Passwords must have at least one special character") 
                                => "Password must contain at least one special character",
                            _ => error.Description
                        };
                    }).ToList();

                    return BadRequest(new { errors = simplifiedErrors });
                }
            }
        }

        var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
        if (!roleResult.Succeeded)
        {
            _logger.LogError("Failed to add user to role: {@Errors}", roleResult.Errors);
            return StatusCode(500, "Failed to create user. Please try again later.");
        }

        var token = _tokenService.CreateToken(appUser);

        return Ok(new NewUserDto
        {
            Email = appUser.Email,
            Token = token
        });
        // return Ok(new { message = "User created successfully" });
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Invalid email or password");
        }   

        return Ok(new NewUserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        });
    }

}