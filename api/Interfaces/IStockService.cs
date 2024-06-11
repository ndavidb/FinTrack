using api.Dto;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces;

public interface IStockService
{
    Task<List<StockDto>> GetAllAsync();
    Task<StockDto?> GetStockByIdAsync(int id);
    Task<Stock?> UpdateStockAsync(UpdateStockRequestDto updateDto, int id);
    Task<StockDto?> CreateStockAsync(CreateStockRequestDto createDto);
    Task<StockDto?> DeleteStockAsync(int id);
    Task<bool> StockExistsAsync(int id);
}