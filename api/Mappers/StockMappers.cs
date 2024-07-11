using api.Dto;
using api.Dto.Stock;
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
            Industry = stockModel.Industry,
            MarketCap = stockModel.MarketCap,
            Website = stockModel.Website,
            Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
        };
    }

    public static Stock ToStockFromCreateStockDto(this CreateStockRequestDto stockRequestDto)
    {
        return new Stock
        {
            Symbol = stockRequestDto.Symbol,
            CompanyName = stockRequestDto.CompanyName,
            Industry = stockRequestDto.Industry,
            MarketCap = stockRequestDto.MarketCap,
            Website = stockRequestDto.Website,
        };
    }

    public static Stock ToStockFromFmpStock(this FmpStock fmpStock)
    {
        return new Stock
        {
            Symbol = fmpStock.symbol,
            CompanyName = fmpStock.companyName,
            Industry = fmpStock.industry,
            MarketCap = fmpStock.mktCap,
            Website = fmpStock.website
        };
    }

    public static StockPortfolioDto ToStockPortfolioDto(this Stock stockModel)
    {
        return new StockPortfolioDto
        {
            Symbol = stockModel.Symbol,
            CompanyName = stockModel.CompanyName,
            Industry = stockModel.Industry,
            Website = stockModel.Website
        };
    }
}