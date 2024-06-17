using api.Dto;
using api.Dto.Stock;
using api.Helpers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces;

public interface IStockService
{
    Task<List<StockDto>> GetAllAsync(QueryObject query);
    Task<Stock?> GetStockByIdAsync(int id);
    Task<Stock?> GetStockBySymbolAsync(string symbol);
    Task<Stock?> UpdateStockAsync(UpdateStockRequestDto updateDto, int id);
    Task<StockDto?> CreateStockAsync(Stock stockModel);
    Task<StockDto?> DeleteStockAsync(int id);
    Task<bool> StockExistsAsync(int id);
}