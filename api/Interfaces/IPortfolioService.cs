using api.Dto;
using api.Dto.Stock;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces;

public interface IPortfolioService
{
    public Task<List<StockPortfolioDto>> GetUserPortfolio(AppUser user);
    public Task<Portfolio> AddPortfolioAsync(Portfolio portfolio);
    public Task<List<PortfolioPerformance>> GetUserPortfolioPerformance(AppUser user);
    public Task<bool> AddPortfolioHistory(string symbol);
    public Task<bool> DeletePortfolioAsync(AppUser user, string symbol);
    public Task<List<StockPerformanceDto>> GetUserStocksPerformance(AppUser user);
}