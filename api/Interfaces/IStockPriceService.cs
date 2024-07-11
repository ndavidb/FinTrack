namespace api.Interfaces;

public interface IStockPriceService
{
    Task FetchDailyStockPrices();
}