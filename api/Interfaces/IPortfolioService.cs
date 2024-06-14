using api.Dto;
using api.Models;

namespace api.Interfaces;

public interface IPortfolioService
{
    public Task<List<Stock>> GetUserPortfolio(AppUser user);
}