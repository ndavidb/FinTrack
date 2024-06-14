using api.Models;

namespace api.Interfaces;

public interface IFmpService
{
    Task<Stock> FindStockBySymbolAsync(string symbol);
}