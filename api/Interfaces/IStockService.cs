using api.Dto;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces;

public interface IStockService
{
    Task<List<Stock>> GetAllAsync();
    Task<Stock?> GetStockByIdAsync(int id);
    Task<Stock?> UpdateStockAsync(UpdateStockRequestDto updateDto, int id);
    Task<StockDto?> CreateStockAsync(CreateStockRequestDto createDto);
    Task<ActionResult> DeleteStockAsync(int id);
}