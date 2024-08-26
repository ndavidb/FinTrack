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
        var userPortfolio = await _context.Portfolios
            .Where(p => p.AppUserId == user.Id)
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
        var performances = await _context.Portfolios
            .Where(p => p.AppUserId == user.Id)
            .Select(p => new
            {
                p.Stock.Symbol,
                p.Stock.CompanyName,
                p.Stock.Website,
                p.PurchaseDate,
                p.PurchasePrice,
                LatestPrice = DateOnly.FromDateTime(p.PurchaseDate) == DateOnly.FromDateTime(DateTime.Today) ? p.PurchasePrice : _context.StockPrices
                    .Where(sp => sp.StockId == p.StockId)
                    .OrderByDescending(sp => sp.Date)
                    .Select(sp => sp.Price)
                    .FirstOrDefault()
            })
            .ToListAsync();
        
        return performances.Select(p => new StockPerformanceDto
        {
            Symbol = p.Symbol,
            CompanyName = p.CompanyName,
            Website = UrlManagement.CleanUrl(p.Website),
            PurchaseDate = p.PurchaseDate,
            PurchasePrice = p.PurchasePrice,
            CurrentPrice =  p.LatestPrice,
            Performance = (p.LatestPrice - p.PurchasePrice) / p.PurchasePrice * 100
        }).ToList();
    }
}