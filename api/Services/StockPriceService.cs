using api.Data;
using api.Dto.Stock;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class StockPriceService : IStockPriceService
{
    private readonly IFmpService _fmpService;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<StockPriceService> _logger;
    public StockPriceService(IFmpService fmpService, 
        ApplicationDbContext context, 
        ILogger<StockPriceService> logger)
    {
        _fmpService = fmpService;
        _context = context;
        _logger = logger;
    }
    
    public async Task FetchDailyStockPrices()
    {
        try
        {
            var stocks = await _context.Stocks.ToListAsync();
            foreach (var stock in stocks)
            {
                try
                {
                    var currentPrice = await _fmpService.GetCurrentPrice(stock.Symbol);
                    var stockPrice = new StockPrice
                    {
                        Symbol = stock.Symbol,
                        Date = DateTime.UtcNow,
                        Price = currentPrice,
                        StockId = stock.Id
                    };

                    await _context.StockPrices.AddAsync(stockPrice);
                    _logger.LogInformation($"Updated price for {stock.Symbol}");
                }
                catch (Exception e)
                {
                    _logger.LogError(e, $"Error updating price for {stock.Symbol}");
                }
            }
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error in FetchDailyStockPrices");
        }
    }
    
}