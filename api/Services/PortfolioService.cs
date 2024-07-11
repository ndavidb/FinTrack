using api.Data;
using api.Dto;
using api.Dto.Stock;
using api.Helpers;
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

    public async Task<bool> DeletePortfolioAsync(AppUser user, string symbol)
    {
        var portfolioModel = await _context.Portfolios
            .FirstOrDefaultAsync(p =>
                p.AppUserId == user.Id 
                && string.Equals(p.Stock.Symbol, symbol)
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