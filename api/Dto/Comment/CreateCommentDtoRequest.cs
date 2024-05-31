namespace api.Dto.Comment;

public class CreateCommentDtoRequest
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}