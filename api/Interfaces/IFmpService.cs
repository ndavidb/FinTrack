using api.Dto.Stock;
using api.Models;

namespace api.Interfaces;

public interface IFmpService
{
    Task<Stock> FindStockBySymbolAsync(string symbol);
    Task<Decimal> GetCurrentPrice(string symbol);
    Task<List<StockPriceInfo>> GetStockHistoryAsync(string symbol, int days = 30);
}