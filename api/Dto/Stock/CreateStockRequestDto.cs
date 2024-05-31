using System.ComponentModel.DataAnnotations;

namespace api.Dto;

public class CreateStockRequestDto
{
    [Required]
    [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters")]
    public string Symbol { get; set; } = string.Empty;
    [Required]
    [MaxLength(20, ErrorMessage = "Company name cannot be over 20 characters")]
    public string CompanyName { get; set; } = string.Empty;
    [Required]
    [Range(1, 100000000)]
    public decimal Purchase { get; set; }
    [Required]
    [Range(0.1, 200)]
    public decimal LastDiv { get; set; }
    [Required]
    [MaxLength(20, ErrorMessage = "Industry cannot be over 20 characters")]
    public string Industry { get; set; } = string.Empty;
    [Required]
    [Range(1, 500000000000)]
    public long MarketCap { get; set; }
}