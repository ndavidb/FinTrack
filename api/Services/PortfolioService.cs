using api.Data;
using api.Dto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class PortfolioService : IPortfolioService
{
    private readonly ApplicationDbContext _context;
    private readonly IStockService _stockService;
    public PortfolioService(ApplicationDbContext context, IStockService stockService)
    {
        _context = context;
        _stockService = stockService;
    }


    public async Task<List<Stock>> GetUserPortfolio(AppUser user)
    {
        return await _context.Portfolios
            .Where(p => p.AppUserId == user.Id)
            .Select(stock => new Stock
            {
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                CompanyName = stock.Stock.CompanyName,
                Purchase = stock.Stock.Purchase,
                LastDiv = stock.Stock.LastDiv,
                Industry = stock.Stock.Industry,
                MarketCap = stock.Stock.MarketCap

            }).ToListAsync();
    }

    public async Task<Portfolio> CreatePortfolioAsync(Portfolio portfolio)
    {
        await _context.Portfolios.AddAsync(portfolio);
        await _context.SaveChangesAsync();

        return portfolio;
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
    
}