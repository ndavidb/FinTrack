using api.Interfaces;
using api.Models;

namespace api.Services;

public class FmpService
{
    private HttpClient _client;
    private IConfiguration _config;
    public FmpService(HttpClient client, IConfiguration config)
    {
        _client = client;
        _config = config;
    }
    
}