using System.Globalization;
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
    private readonly ILogger<FmpService> _logger;
    public FmpService(HttpClient client, IConfiguration config, ILogger<FmpService> logger)
    {
        _httpClient = client;
        _config = config;
        _logger = logger;
    }

    public async Task<Stock?> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                _logger.LogInformation($"FMP API Response: {content}");

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var stocks = JsonSerializer.Deserialize<List<FmpStock>>(content, options);
                var stock = stocks?.FirstOrDefault();

                if (stock != null)
                {
                    return new Stock
                    {
                        Symbol = stock.symbol,
                        CompanyName = stock.companyName,
                        Industry = stock.industry,
                        MarketCap = stock.mktCap,
                        Website = stock.website
                    };
                }
            }
            else
            {
                _logger.LogError($"FMP API request failed: {result.StatusCode}");
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in FindStockBySymbolAsync");
            return null;
        }
    }

    public async Task<decimal> GetCurrentPrice(string symbol)
    {
        try
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
            
            throw new HttpRequestException("API request was not successful");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<List<StockPriceInfo>> GetStockHistoryAsync(string symbol, int days = 31)
    {
        var endDate = DateTime.Today;
        var startDate = endDate.AddDays(-days);
        var formattedStartDate = startDate.ToString("yyyy-MM-dd");

        try
        {
            var apiKey = _config["FMPKey"];
            var url = $"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?from={formattedStartDate}&apikey={apiKey}";
            
            _logger.LogInformation($"Fetching stock history for {symbol} from {formattedStartDate}");

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            _logger.LogDebug($"API Response: {content}");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var priceHistory = JsonSerializer.Deserialize<PriceHistoryResponse>(content, options);

            if (priceHistory?.Historical == null || !priceHistory.Historical.Any())
            {
                _logger.LogWarning($"No historical data found for {symbol}");
                return new List<StockPriceInfo>();
            }

            return priceHistory.Historical
                .Select(h => new StockPriceInfo
                {
                    Date = DateTime.SpecifyKind(DateTime.ParseExact(h.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture), DateTimeKind.Utc),
                    Open = h.Open,
                    High = h.High,
                    Low = h.Low,
                    Close = h.Close,
                    Volume = h.Volume
                })
                .ToList();
        }
        catch (HttpRequestException e)
        {
            _logger.LogError(e, $"HTTP request error while fetching stock history for {symbol}");
            throw;
        }
        catch (JsonException e)
        {
            _logger.LogError(e, $"JSON deserialization error for {symbol} stock history");
            throw;
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Unexpected error fetching stock history for {symbol}");
            throw;
        }
    }
    
}