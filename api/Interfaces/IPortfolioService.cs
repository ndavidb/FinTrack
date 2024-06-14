using api.Dto;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces;

public interface IPortfolioService
{
    public Task<List<Stock>> GetUserPortfolio(AppUser user);
    public Task<Portfolio> CreatePortfolioAsync(Portfolio portfolio);
    public Task<bool> DeletePortfolioAsync(AppUser user, string symbol);
}