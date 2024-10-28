using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace api.Extensions;

public static class ClaimsExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? 
                     user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("User ID claim not found");
        }

        
        var email = user.FindFirst(ClaimTypes.Email)?.Value ??
                    user.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

        if (string.IsNullOrEmpty(email))
        {
            throw new UnauthorizedAccessException("Email claim not found");
        }

        return email;
    }
}