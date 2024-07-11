using System.Security.Claims;
using api.Dto;
using api.Dto.Stock;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class PortfoliosController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;
    private readonly IStockService _stockService;
    private readonly UserManager<AppUser> _userManager;
    private readonly IFmpService _fmpService;

    public PortfoliosController(
        IPortfolioService portfolioService,
        IStockService stockService,
        UserManager<AppUser> userManager,
        IFmpService fmpService
    )
    {
        _portfolioService = portfolioService;
        _stockService = stockService;
        _userManager = userManager;
        _fmpService = fmpService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<StockPortfolioDto>>> GetUserPortfolio()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var userPortfolio = await _portfolioService.GetUserPortfolio(appUser);

        return Ok(userPortfolio);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<StockDto>> CreatePortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        
        var stock = await _stockService.GetStockBySymbolAsync(symbol);

        if (stock is null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);
            
            if (stock == null)
            {
                return BadRequest("Stock not found");
            }
            await _stockService.CreateStockAsync(stock);
        }

        var userPortfolio = await _portfolioService.GetUserPortfolio(appUser);
        
        if (userPortfolio.Any(s => s.Symbol.ToLower() == symbol.ToLower()))
        {
            return BadRequest("Stock already exists in portfolio");
        }

        var currentPrice = await _fmpService.GetCurrentPrice(symbol);

        var newPortfolio = new Portfolio
        {
            StockId = stock.Id,
            AppUserId = appUser.Id,
            PurchaseDate = DateTime.UtcNow,
            PurchasePrice = currentPrice
        };

        await _portfolioService.AddPortfolioAsync(newPortfolio);

        return Created();

    }
    
    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeletePortfolioStock(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        
        var deleteResult = await _portfolioService.DeletePortfolioAsync(appUser, symbol);

        if (!deleteResult)
        {
            return BadRequest("Stock not found in portfolio");
        }
        
        return Ok();
    }
}