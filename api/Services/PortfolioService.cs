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
    public PortfolioService(ApplicationDbContext context, IStockService stockService, IFmpService fmpService)
    {
        _context = context;
        _stockService = stockService;
        _fmpService = fmpService;
    }


    public async Task<List<StockPortfolioDto>> GetUserPortfolio(AppUser user)
    {
        var userPortfolio = await _context.Portfolios
            .Where(p => p.AppUserId == user.Id)
            .Select(portfolio => new StockPortfolioDto()
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

        return portfolio;
    }

    public async Task<List<PortfolioPerformance>> GetUserPortfolioPerformance(AppUser user)
    {
        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-31);
        
        var userStocks = await _context.Portfolios
            .Where(s => s.AppUserId == user.Id)
            .Select(s => s.StockId)
            .ToListAsync();

        var stockPrices = await _context.StockPrices
            .Where(sp => userStocks.Contains(sp.StockId) && sp.Date >= thirtyDaysAgo)
            .GroupBy(sp => sp.Date)
            .Select(g => new
            {
                Date = g.Key,
                AveragePerformance = g.Average(sp => sp.Price)
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var performanceList = new List<PortfolioPerformance>();

        for (int i = 1; i < stockPrices.Count; i++)
        {
            var yesterdayPrice = stockPrices[i - 1].AveragePerformance;
            var todayPrice = stockPrices[i].AveragePerformance;

            var dailyPerformance = yesterdayPrice != 0
                ? (todayPrice - yesterdayPrice) / yesterdayPrice * 100
                : 0;
            
            performanceList.Add(new PortfolioPerformance
            {
                Date = stockPrices[i].Date,
                Performance = Math.Round(dailyPerformance, 2)
            });
        }

        return performanceList;
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
                LatestPrice = _context.StockPrices
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
            CurrentPrice = p.LatestPrice,
            Performance = (p.LatestPrice - p.PurchasePrice) / p.PurchasePrice * 100
        }).ToList();
    }
}