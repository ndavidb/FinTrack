using System.ComponentModel.DataAnnotations;

namespace api.Dto.Comment;

public class UpdateCommentRequestDto
{
    [Required]
    [MinLength(5, ErrorMessage = "The minimum length for the title is 5 characters")]
    [MaxLength(100, ErrorMessage = "The maximum length for the title is 100 characters")]
    public string Title { get; set; } = string.Empty;
    [Required]
    [MinLength(5, ErrorMessage = "The minimum length for the content is 5 characters")]
    [MaxLength(280, ErrorMessage = "The maximum length for the content is 280 characters")]
    public string Content { get; set; } = string.Empty;
}