using System.Security.Claims;
using api.Dto;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IPortfolioService _portfolioService;
    private readonly IStockService _stockService;
    private readonly UserManager<AppUser> _userManager;

    public PortfolioController(
        IPortfolioService portfolioService,
        IStockService stockService,
        UserManager<AppUser> userManager
    )
    {
        _portfolioService = portfolioService;
        _stockService = stockService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<StockDto>>> GetUserPortfolio()
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

        if (stock == null)
        {
            return BadRequest("Stock not found");
        }

        var userPortfolio = await _portfolioService.GetUserPortfolio(appUser);
        
        if (userPortfolio.Any(s => s.Symbol.ToLower() == symbol.ToLower()))
        {
            return BadRequest("Stock already exists in portfolio");
        }

        var newPortfolio = new Portfolio
        {
            StockId = stock.Id,
            AppUserId = appUser.Id
        };

        await _portfolioService.CreatePortfolioAsync(newPortfolio);

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