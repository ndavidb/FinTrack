using api.Data;
using api.Dto;
using api.Interfaces;
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
    private readonly IStockService _stockService;
    public StocksController(ApplicationDbContext context, IStockService stockService)
    {
        _context = context;
        _stockService = stockService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Stock>>> GetAllStocks()
    {
        var stocks = await _stockService.GetAllAsync();
        var stockDto = stocks.Select(stock => stock.ToStockDto());

        return Ok(stockDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Stock>> GetStockById([FromRoute] int id)
    {
        var stock = await _stockService.GetStockByIdAsync(id);

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

    [HttpPut("{id}")]
    public async Task<ActionResult<StockDto>> UpdateStockById([FromRoute] int id,
        [FromBody] UpdateStockRequestDto updateDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var stockModel = await _stockService.UpdateStockAsync(updateDto, id);

        if (stockModel == null)
        {
            return NotFound();
        }

        return Ok(stockModel.ToStockDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStockById([FromRoute] int id)
    {
        var stock = await _context.Stocks.FindAsync(id);

        if (stock == null) return NotFound();

        _context.Stocks.Remove(stock);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}