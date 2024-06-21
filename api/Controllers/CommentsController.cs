using api.Data;
using api.Dto.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IStockService _stockService;
    private readonly UserManager<AppUser> _userManager;
    private readonly IFmpService _fmpService;
    public CommentsController(ApplicationDbContext context, ICommentService commentService, IStockService stockService, UserManager<AppUser> userManager, IFmpService fmpService)
      {
        _commentService = commentService;
        _stockService = stockService;
        _userManager = userManager;
        _fmpService = fmpService;
      }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<CommentDto>>> GetAllComments()
    {
        
        var commentsDto = await _commentService.GetAllCommentsAsync();

        return Ok(commentsDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CommentDto>> GetCommentById([FromRoute] int id)
    {
        var commentDto = await _commentService.GetCommentByIdAsync(id);

        return Ok(commentDto);
    }

    [HttpPost("{symbol:alpha}")]
    [Authorize]
    public async Task<ActionResult<CommentDto>> CreateComment([FromRoute] string symbol, [FromBody] CreateCommentDtoRequest newCommentDto)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        
        var stock = await _stockService.GetStockBySymbolAsync(symbol);

        if (stock == null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);
            if (stock == null)
            {
                return BadRequest("Stock does not exists");
            }
            else
            {
                await _stockService.CreateStockAsync(stock);
            }
        }
        
        var comment = newCommentDto.ToCommentFromCommentDto(stock.Id);
        comment.AppUserId = appUser.Id;
        
        await _commentService.CreateCommentAsync(comment);

        
        return CreatedAtAction(nameof(GetCommentById), 
            new { id = comment.Id}, 
            comment);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CommentDto>> UpdateComment([FromRoute] int id,
        [FromBody] UpdateCommentRequestDto updateDto)
    {
        var commentModel = await _commentService.UpdateCommentAsync(updateDto.ToCommentFromUpdateDto(id), id);

        if (commentModel ==null)
        {
            return NotFound("Comment could not be found");
        }

        return Ok(commentModel.ToCommentDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment([FromRoute] int id)
    {
        try
        {
            await _commentService.DeleteCommentAsync(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return NotFound(e.Message);
        }
        
    }
}