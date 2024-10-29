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
    private readonly ILogger<PortfoliosController> _logger;
    private readonly IPortfolioService _portfolioService;
    private readonly IStockService _stockService;
    private readonly UserManager<AppUser> _userManager;
    private readonly IFmpService _fmpService;

    public PortfoliosController(
        IPortfolioService portfolioService,
        IStockService stockService,
        UserManager<AppUser> userManager,
        IFmpService fmpService,
        ILogger<PortfoliosController> logger)
    {
        _portfolioService = portfolioService;
        _stockService = stockService;
        _userManager = userManager;
        _fmpService = fmpService;
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<StockPortfolioDto>>> GetUserPortfolio()
    {
        try
        {
            var username = User.GetUsername();
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Invalid user");
            }

            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("User not found");
            }

            var userPortfolio = await _portfolioService.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving the portfolio");
        }
    }

    [HttpGet]
    [Route("stocks-performance")]
    [Authorize]
    public async Task<ActionResult<List<StockPerformanceDto>>> GetUserStocksPerformance()
    {
        try 
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
        
            if (appUser == null)
            {
                _logger.LogWarning("User not found for username: {Username}", username);
                return Unauthorized("User not found");
            }

            var performanceStocksPortfolio = await _portfolioService.GetUserStocksPerformance(appUser);
            return Ok(performanceStocksPortfolio);
        }
        catch (ArgumentNullException ex)
        {
            _logger.LogError(ex, "Invalid argument in GetUserStocksPerformance");
            return BadRequest("Invalid request parameters");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetUserStocksPerformance");
            return StatusCode(500, "An error occurred while processing your request");
        }
    }

    [HttpGet]
    [Route("portfolio-performance")]
    [Authorize]
    public async Task<ActionResult<List<PortfolioPerformance>>> GetPortfolioPerformance()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        if (appUser is null) throw new Exception("User was not found");
        
        var portfolioPerformance = await _portfolioService.GetUserPortfolioPerformance(appUser);

        return Ok(portfolioPerformance);
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
            var stockFmp = await _fmpService.FindStockBySymbolAsync(symbol);
            
            if (stockFmp == null)
            {
                return BadRequest(new { message = "Stock not found" });
            }
            await _stockService.CreateStockAsync(stockFmp);
            
            await _portfolioService.AddPortfolioHistory(symbol);
        }
        
        stock = await _stockService.GetStockBySymbolAsync(symbol);

        var userPortfolio = await _portfolioService.GetUserPortfolio(appUser);
        
        if (userPortfolio.Any(s => string.Equals(s.Symbol, symbol, StringComparison.OrdinalIgnoreCase)))
        {
            return BadRequest(new { message = "Stock already exists in portfolio" });
        }

        var currentPrice = await _fmpService.GetCurrentPrice(symbol);

        var newPortfolio = new Portfolio
        {
            StockId = stock!.Id,
            AppUserId = appUser.Id,
            PurchaseDate = DateTime.UtcNow,
            PurchasePrice = currentPrice
        };

        await _portfolioService.AddPortfolioAsync(newPortfolio);

        return Created("", new { message = "Stock added to portfolio" });
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