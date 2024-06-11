using api.Data;
using api.Dto.Comment;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ICommentService _commentService;
    private readonly IStockService _stockService;
    public CommentController(ApplicationDbContext context, ICommentService commentService, IStockService stockService)
      {
        _context = context;
        _commentService = commentService;
        _stockService = stockService;

      }

    [HttpGet]
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

    [HttpPost("{stockId}")]
    public async Task<ActionResult<CommentDto>> CreateComment([FromRoute] int stockId, [FromBody] CreateCommentDtoRequest newCommentDto)
    {
        var stockExists = await _stockService.StockExistsAsync(stockId);
        
        if (!stockExists)
        {
            return BadRequest("Stock does not exist");
        }
        
        var comment = newCommentDto.ToCommentFromCommentDto(stockId);
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
        var comment = await _commentService.DeleteCommentAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        return NoContent();
    }
}