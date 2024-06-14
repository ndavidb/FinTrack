namespace api.Models;

public class Comment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    
    
    public int? StockId { get; set; }
    public Stock? Stock { get; set; }
    
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}