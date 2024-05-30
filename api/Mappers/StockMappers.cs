using api.Dto;
using api.Models;

namespace api.Mappers;

public static class StockMappers
{
    public static StockDto ToStockDto(this Stock stockModel)
    {
        return new StockDto
        {
            Symbol = stockModel.Symbol,
            CompanyName = stockModel.CompanyName,
            Purchase = stockModel.Purchase,
            LastDiv = stockModel.Purchase,
            Industry = stockModel.Industry,
            MarketCap = stockModel.MarketCap,
        };
    }

    public static Stock ToStockFromCreateStockDto(this CreateStockRequestDto stockRequestDto)
    {
        return new Stock
        {
            Symbol = stockRequestDto.Symbol,
            CompanyName = stockRequestDto.CompanyName,
            Purchase = stockRequestDto.Purchase,
            LastDiv = stockRequestDto.Purchase,
            Industry = stockRequestDto.Industry,
            MarketCap = stockRequestDto.MarketCap,
        };
    }
}