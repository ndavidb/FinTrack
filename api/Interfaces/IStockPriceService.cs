namespace api.Interfaces;

public interface IStockPriceService
{
    Task FetchDailyStockPrices();
    Task AddHistoricalPricesForNewStock(string symbol);
}