using api.Dto.Comment;

namespace api.Dto.Stock;

public class StockDto
{
    public string Symbol { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public long MarketCap { get; set; }
    public string Website { get; set; } = string.Empty;
    public List<CommentDto>? Comments { get; set; }
}