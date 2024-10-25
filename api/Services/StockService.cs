using api.Data;
using api.Dto;
using api.Dto.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Repositories;

public class StockService : IStockService
{
    private readonly ApplicationDbContext _context;
    public StockService(ApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<List<StockDto>> GetAllAsync(QueryObject query)
    {
        var stocks = _context.Stocks
            .Include(c => c.Comments).ThenInclude(u => u.AppUser).AsQueryable();
            
        if (!String.IsNullOrWhiteSpace(query.CompanyName))
        {
            stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
        }

        if (!String.IsNullOrWhiteSpace(query.Symbol))
        {
            stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
        }
        
        stocks = query.IsSortDescending ?
            stocks.OrderByDescending(s => s.CompanyName) :
            stocks.OrderBy(s => s.CompanyName);
        
        var skipNumber = (query.PageNumber - 1) * query.PageSize;
        stocks = stocks.Skip(skipNumber).Take(query.PageSize);
        
        var stockDto = await stocks.Select(s => s.ToStockDto()).ToListAsync();

        return stockDto;
    }

    public async Task<Stock?> GetStockByIdAsync(int id)
    {
        return await _context.Stocks
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Stock?> GetStockBySymbolAsync(string symbol)
    {
        var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol.ToLower() == symbol.ToLower());

        return stock;
    }

    public async Task<Stock?> UpdateStockAsync(UpdateStockRequestDto updateDto, int id)
    {
        var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

        if (stockModel == null) return null;

        stockModel.Symbol = updateDto.Symbol;
        stockModel.CompanyName = updateDto.CompanyName;
        stockModel.Industry = updateDto.Industry;
        stockModel.MarketCap = updateDto.MarketCap;
        
        await _context.SaveChangesAsync();
        
        return stockModel;
    }

    public async Task<StockDto?> CreateStockAsync(Stock stockModel)
    {
        await _context.Stocks.AddAsync(stockModel);
        await _context.SaveChangesAsync();
        return stockModel.ToStockDto();
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
    public async Task<bool> StockExistsBySymbolAsync(string symbol)
    {
        return await _context.Stocks.AnyAsync(s => s.Symbol.ToLower() == symbol.ToLower());
    }
}

