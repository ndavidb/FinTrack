using Microsoft.IdentityModel.Tokens;

namespace api.Helpers;

public static class UrlManagement
{
    public static string CleanUrl(string url)
    {
        if (url.IsNullOrEmpty()) return url;

        url = url.Replace("https://", "")
            .Replace("http://", "")
            .TrimEnd('/');
        
        return url;
    }
}