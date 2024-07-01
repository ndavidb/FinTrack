namespace api.Models;

public class Portfolio
{
    public int Id { get; set; }
    public string AppUserId { get; set; }
    public int StockId { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public AppUser AppUser { get; set; }
    public Stock Stock { get; set; }
}