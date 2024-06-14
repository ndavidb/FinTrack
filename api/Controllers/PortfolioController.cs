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
}