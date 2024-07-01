using System.ComponentModel.DataAnnotations;

namespace api.Dto.Stock;

public class UpdateStockRequestDto
{
    [Required]
    [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters")]
    public string Symbol { get; set; } = string.Empty;
    [Required]
    [MaxLength(20, ErrorMessage = "Company name cannot be over 20 characters")]
    public string CompanyName { get; set; } = string.Empty;
    [Required]
    [MaxLength(20, ErrorMessage = "Industry cannot be over 20 characters")]
    public string Industry { get; set; } = string.Empty;
    [Required]
    [Range(1, 500000000000)]
    public long MarketCap { get; set; }
    [Required]
    [MaxLength(150, ErrorMessage = "Website cannot be over 150 characters")]
    public string Website { get; set; } = string.Empty;
}