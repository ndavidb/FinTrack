using api.Data;
using api.Dto;
using api.Dto.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class StocksController : ControllerBase
{
    private readonly IStockService _stockService;
    public StocksController(IStockService stockService)
    {
        _stockService = stockService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<StockDto>>> GetAllStocks([FromQuery] QueryObject query)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        
        var stocksDto = await _stockService.GetAllAsync(query);

        return Ok(stocksDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StockDto>> GetStockById([FromRoute] int id)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var stock = await _stockService.GetStockByIdAsync(id);

        if (stock == null) return NotFound();

        return Ok(stock);
    }

    [HttpPost]
    public async Task<ActionResult<StockDto>> CreateStockByRequest([FromBody] CreateStockRequestDto stockDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var stock = await _stockService.CreateStockAsync(stockDto);

        return CreatedAtAction(nameof(GetStockById), new { id = stock?.Id }, stock);
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
        var stock = await _stockService.DeleteStockAsync(id);

        if (stock == null) return NotFound();

        return NoContent();
    }
}