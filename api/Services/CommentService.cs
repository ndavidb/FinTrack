﻿using api.Data;
using api.Dto.Comment;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class CommentService: ICommentService
{
    private readonly ApplicationDbContext _context;
    public CommentService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<CommentDto>> GetAllCommentsAsync()
    {
        var comments = await _context.Comments.ToListAsync();
        var commentsDto = comments
            .Select(c => c.ToCommentDto())
            .ToList();
        
        return commentsDto;
    }

    public async Task<CommentDto?> GetCommentByIdAsync(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        return comment?.ToCommentDto();
    }

    public async Task<Comment> CreateCommentAsync(Comment newComment)
    {
        await _context.Comments.AddAsync(newComment);
        await _context.SaveChangesAsync();

        return newComment;
    }

    public async Task<Comment?> UpdateCommentAsync(Comment commentModel, int id)
    {
        var existingComment = await _context.Comments.FindAsync(id);
        
        if (existingComment == null)
        {
            return null;
        }

        existingComment.Title = commentModel.Title;
        existingComment.Content = commentModel.Content;

        await _context.SaveChangesAsync();

        return commentModel;
    }

    public async Task<CommentDto?> DeleteCommentAsync(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return null;
        }
        
        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return comment.ToCommentDto();
    }
}