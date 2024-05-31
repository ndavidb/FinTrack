using api.Data;
using api.Dto.Comment;
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
    public CommentController(ApplicationDbContext context)
      {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CommentDto>>> GetAllComments()
    {
        var comments = await _context.Comments.ToListAsync();
        var commentDto = comments.Select(c => c.ToCommentDto());

        return Ok(commentDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CommentDto>> GetCommentById([FromRoute] int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment.ToCommentDto());
    }

    [HttpPost("{stockId}")]
    public async Task<ActionResult<CommentDto>> CreateComment([FromRoute] int stockId, [FromBody] CreateCommentDtoRequest commentDto)
    {
        var stockExists = await _context.Stocks.AnyAsync(s => s.Id == stockId);
        
        if (!stockExists)
        {
            return BadRequest("Stock does not exist");
        }
        
        var comment = commentDto.ToCommentFromCommentDto(stockId);

        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCommentById), 
            new { id = comment.Id }, 
            comment.ToCommentDto());
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CommentDto>> UpdateComment([FromRoute] int id,
        [FromBody] UpdateCommentRequestDto updateDto)
    {
        var commentModel = await _context.Comments.FindAsync(id);

        if (commentModel ==null)
        {
            return NotFound("Comment could not be found");
        }

        commentModel.Title = updateDto.Title;
        commentModel.Content = updateDto.Content;

        await _context.SaveChangesAsync();

        return Ok(commentModel.ToCommentDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment([FromRoute] int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}