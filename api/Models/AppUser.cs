using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class AppUser : IdentityUser
{
    public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}