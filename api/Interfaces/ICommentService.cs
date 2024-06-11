using api.Dto.Comment;
using api.Models;

namespace api.Interfaces;

public interface ICommentService
{
    Task<List<CommentDto>> GetAllCommentsAsync();
    Task<CommentDto?> GetCommentByIdAsync(int id);
    Task<Comment> CreateCommentAsync(Comment newComment);
    Task<Comment?> UpdateCommentAsync(Comment commentModel, int id);
    Task<CommentDto?> DeleteCommentAsync(int id);
}