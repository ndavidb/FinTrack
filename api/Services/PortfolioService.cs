using api.Data;
using System.Linq;
using api.Dto.Stock;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class PortfolioService : IPortfolioService
{
    private readonly ApplicationDbContext _context;
    private readonly IStockService _stockService;
    private readonly IFmpService _fmpService;
    private readonly ILogger<PortfolioService> _logger;

    public PortfolioService(ApplicationDbContext context, IStockService stockService, IFmpService fmpService, ILogger<PortfolioService> logger)
    {
        _context = context;
        _stockService = stockService;
        _fmpService = fmpService;
        _logger = logger;
    }


    public async Task<List<StockPortfolioDto>> GetUserPortfolio(AppUser user)
    {
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user), "User cannot be null");
        }

        try
        {
            var userPortfolio = await _context.Portfolios
                .Where(p => p.AppUserId == user.Id)
                .Include(p => p.Stock)
                .Select(portfolio => new StockPortfolioDto
                {
                    Id = portfolio.Stock.Id,
                    Symbol = portfolio.Stock.Symbol,
                    CompanyName = portfolio.Stock.CompanyName,
                    Industry = portfolio.Stock.Industry,
                    Website = UrlManagement.CleanUrl(portfolio.Stock.Website),
                    PurchaseDate = portfolio.PurchaseDate,
                    PurchasePrice = portfolio.PurchasePrice

                }).ToListAsync();
            
            return userPortfolio;

        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while getting portfolio {UserId}", user.Id);
            throw;
        }
    }

    public async Task<Portfolio> AddPortfolioAsync(Portfolio portfolio)
    {
        await _context.Portfolios.AddAsync(portfolio);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"Added stock {portfolio.StockId} to portfolio for user {portfolio.AppUserId}");

        return portfolio;
    }

    public async Task<List<PortfolioPerformance>> GetUserPortfolioPerformance(AppUser user)
    {
        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30).Date;

        var userStocks = await _context.Portfolios
            .Where(p => p.AppUserId == user.Id)
            .Select(p => p.StockId)
            .Distinct()
            .ToListAsync();

        var dailyChanges = await _context.StockPrices
            .Where(sp => userStocks.Contains(sp.StockId) && sp.Date >= thirtyDaysAgo && sp.Date.DayOfWeek != DayOfWeek.Saturday && sp.Date.DayOfWeek != DayOfWeek.Sunday)
            .GroupBy(sp => new { sp.Symbol, Date = sp.Date.Date })
            .Select(g => new
            {
                g.Key.Symbol,
                g.Key.Date,
                Price = g.Average(sp => sp.Price)
            })
            .OrderBy(x => x.Symbol)
            .ThenBy(x => x.Date)
            .ToListAsync();

        var performanceByDate = dailyChanges
            .GroupBy(dc => dc.Symbol)
            .SelectMany(g =>
            {
                var orderedPrices = g.OrderBy(x => x.Date).ToList();

                return orderedPrices
                    .Skip(1)
                    .Select((current, index) =>
                    {
                        var previous = orderedPrices[index];
                        var dailyChangePercent = (current.Price - previous.Price) / previous.Price * 100;
                        return new { current.Date, dailyChangePercent };
                    });
            })
            .GroupBy(x => x.Date)
            .Select(g => new PortfolioPerformance
            {
                Date = g.Key,
                Performance = Math.Round(g.Average(x => x.dailyChangePercent), 4)
            })
            .OrderBy(x => x.Date)
            .ToList();

        return performanceByDate;

    }

    public async Task<bool> AddPortfolioHistory(string symbol)
    {
        var stock = await _stockService.GetStockBySymbolAsync(symbol);
        if (stock is null) return false;

        var stockHistory = await _fmpService.GetStockHistoryAsync(symbol);
        if (stockHistory.Count == 0) return false;
        
        var stockPrices = stockHistory.Select(sp => new StockPrice
        {
            Symbol = stock.Symbol,
            Date = DateTime.SpecifyKind(sp.Date, DateTimeKind.Utc),
            Price = sp.Close,
            StockId = stock.Id
        }).ToList();

        await _context.StockPrices.AddRangeAsync(stockPrices);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<bool> DeletePortfolioAsync(AppUser user, string symbol)
    {
        var portfolioModel = await _context.Portfolios
            .FirstOrDefaultAsync(p =>
                p.AppUserId == user.Id 
                && p.Stock.Symbol.ToLower() == symbol.ToLower()
            );

        if (portfolioModel == null)
        {
            return false;
        }
        
        _context.Portfolios.Remove(portfolioModel);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<StockPerformanceDto>> GetUserStocksPerformance(AppUser user)
{
    if (user == null)
    {
        _logger.LogError("GetUserStocksPerformance called with null user");
        throw new ArgumentNullException(nameof(user));
    }

    try 
    {
        var today = DateTime.UtcNow.Date;
        
        // Get portfolio stocks with explicit loading of Stock navigation property
        var portfolioStocks = await _context.Portfolios
            .Include(p => p.Stock)
            .Where(p => p.AppUserId == user.Id && p.Stock != null) // Ensure Stock is not null
            .ToListAsync();

        if (!portfolioStocks.Any())
        {
            _logger.LogInformation($"No portfolio stocks found for user {user.Id}");
            return new List<StockPerformanceDto>();
        }

        var stockIds = portfolioStocks
            .Where(p => p.Stock != null)
            .Select(p => p.StockId)
            .Distinct()
            .ToList();
        
        // Get latest prices with null check
        var latestPrices = await _context.StockPrices
            .Where(sp => stockIds.Contains(sp.StockId))
            .GroupBy(sp => sp.StockId)
            .Select(g => new
            {
                StockId = g.Key,
                LatestPrice = g.OrderByDescending(sp => sp.Date)
                    .Select(sp => sp.Price)
                    .FirstOrDefault()
            })
            .ToDictionaryAsync(x => x.StockId, x => x.LatestPrice);

        var result = new List<StockPerformanceDto>();

        foreach (var p in portfolioStocks)
        {
            if (p.Stock == null) continue;

            var currentPrice = p.PurchaseDate.Date == today
                ? p.PurchasePrice
                : latestPrices.GetValueOrDefault(p.StockId, p.PurchasePrice);

            var performance = p.PurchaseDate.Date == today
                ? 0
                : ((currentPrice - p.PurchasePrice) / p.PurchasePrice * 100);

            result.Add(new StockPerformanceDto
            {
                Symbol = p.Stock.Symbol,
                CompanyName = p.Stock.CompanyName,
                Website = !string.IsNullOrEmpty(p.Stock.Website) 
                    ? UrlManagement.CleanUrl(p.Stock.Website) 
                    : string.Empty,
                PurchaseDate = p.PurchaseDate,
                PurchasePrice = p.PurchasePrice,
                CurrentPrice = currentPrice,
                Performance = performance
            });
        }

        return result;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error getting stock performance for user {UserId}: {Message}", 
            user.Id, ex.Message);
        throw;
    }
}
}