using api.Data;
using api.Dto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class PortfolioService : IPortfolioService
{
    private readonly ApplicationDbContext _context;
    public PortfolioService(ApplicationDbContext context)
    {
        _context = context;
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
}