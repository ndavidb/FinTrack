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


    public async Task<List<StockDto>> GetAllAsync()
    {
        var stocks = await _context.Stocks
            .Include(c => c.Comments)
            .ToListAsync();
        var stockDto = stocks.Select(s => s.ToStockDto()).ToList();

        return stockDto;
    }

    public async Task<StockDto?> GetStockByIdAsync(int id)
    {
        var stock = await _context.Stocks
            .Include(c => c.Comments)
            .FirstOrDefaultAsync(s => s.Id == id);
        
        return stock?.ToStockDto();
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

    public async Task<StockDto?> CreateStockAsync(CreateStockRequestDto newStock)
    {
        var stock = newStock.ToStockFromCreateStockDto();
        await _context.Stocks.AddAsync(stock);
        await _context.SaveChangesAsync();
        return stock.ToStockDto();

    }

    public async Task<StockDto?> DeleteStockAsync(int id)
    {
        var stock = await _context.Stocks.FindAsync(id);
        if (stock == null)
        {
            return null;
        }
        
        _context.Stocks.Remove(stock);

        await _context.SaveChangesAsync();
        return stock.ToStockDto();
    }

    public async Task<bool> StockExistsAsync(int id)
    {
        return await _context.Stocks.AnyAsync(s => s.Id == id);
    }
}