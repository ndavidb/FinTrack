using api.Data;
using api.Dto;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class StocksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StocksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Stock>>> GetAllStocks()
    {
        var stocks = await _context.Stocks
            .Include(c => c.Comments).ToListAsync();
        var stockDto = stocks.Select(stock => stock.ToStockDto());

        return Ok(stockDto);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Stock>> GetStockById([FromRoute] int id)
    {
        var stock = await _context.Stocks
            .Include(c => c.Comments)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (stock == null) return NotFound();

        return Ok(stock.ToStockDto());
    }

    [HttpPost]
    public async Task<ActionResult<Stock>> CreateStockByRequest([FromBody] CreateStockRequestDto stockDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var stock = stockDto.ToStockFromCreateStockDto();

        await _context.Stocks.AddAsync(stock);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<StockDto>> UpdateStockById([FromRoute] int id,
        [FromBody] UpdateStockRequestDto updateDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);

        if (stockModel == null) return NotFound();

        stockModel.Symbol = updateDto.Symbol;
        stockModel.CompanyName = updateDto.CompanyName;
        stockModel.Purchase = updateDto.Purchase;
        stockModel.LastDiv = updateDto.LastDiv;
        stockModel.Industry = updateDto.Industry;
        stockModel.MarketCap = updateDto.MarketCap;

        await _context.SaveChangesAsync();

        return Ok(stockModel.ToStockDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteStockById([FromRoute] int id)
    {
        var stock = await _context.Stocks.FindAsync(id);

        if (stock == null) return NotFound();

        _context.Stocks.Remove(stock);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}