using System.Text.Json;
using api.Dto.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;

namespace api.Services;

public class FmpService : IFmpService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    public FmpService(HttpClient client, IConfiguration config)
    {
        _httpClient = client;
        _config = config;
    }

    public async Task<Stock> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result = await _httpClient
                .GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                var task = JsonSerializer.Deserialize<FmpStock[]>(content);
                var stock = task?[0];
                if (stock != null)
                {
                    return stock.ToStockFromFmpStock();
                }
                return null;
            }

            return null;

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }

    public async Task<decimal> GetCurrentPrice(string symbol)
    {
        var result =
            await _httpClient.GetAsync(
                $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");
        if (result.IsSuccessStatusCode)
        {
            var content = await result.Content.ReadAsStringAsync();
            var task = JsonSerializer.Deserialize<FmpStock[]>(content);
            var stockPrice = (decimal)task[0].price; 
            return stockPrice;
        }

        throw new Exception("Failed to fetch current price");
    }
}