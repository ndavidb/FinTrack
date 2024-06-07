using api.Data;
using api.Dto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class StockService : IStockService
{
    private readonly ApplicationDbContext _context;
    public StockService(ApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<List<Stock>> GetAllAsync()
    {
        var stocks = await _context.Stocks.Include(c => c.Comments).ToListAsync();

        return stocks;
    }

    public async Task<Stock?> GetStockByIdAsync(int id)
    {
        var stock = await _context.Stocks
            .Include(c => c.Comments)
            .FirstOrDefaultAsync(s => s.Id == id);

        return stock;
    }

    public async Task<Stock?> UpdateStockAsync(UpdateStockRequestDto updateDto, int id)
    {
        var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

        if (stockModel == null) return null;

        stockModel.Symbol = updateDto.Symbol;
        stockModel.CompanyName = updateDto.CompanyName;
        stockModel.Purchase = updateDto.Purchase;
        stockModel.LastDiv = updateDto.LastDiv;
        stockModel.Industry = updateDto.Industry;
        stockModel.MarketCap = updateDto.MarketCap;
        
        await _context.SaveChangesAsync();
        
        return stockModel;
    }

    public Task<StockDto?> CreateStockAsync(CreateStockRequestDto createDto)
    {
        throw new NotImplementedException();
    }

    public Task<ActionResult> DeleteStockAsync(int id)
    {
        throw new NotImplementedException();
    }
}