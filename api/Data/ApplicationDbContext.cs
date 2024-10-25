using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<Stock> Stocks { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Portfolio> Portfolios { get; set; }
    public DbSet<StockPrice> StockPrices { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        
        builder.Entity<Stock>()
            .HasIndex(s => s.Symbol)
            .IsUnique();
        
        builder.Entity<Stock>()
            .HasIndex(s => s.CompanyName);

        
        builder.Entity<StockPrice>()
            .HasIndex(sp => new { sp.StockId, sp.Date });

        
        builder.Entity<Portfolio>()
            .HasIndex(p => p.AppUserId);

        builder.Entity<Portfolio>(x =>
        {
            x.HasKey(p => new { p.AppUserId, p.StockId });
            x.HasIndex(p => p.AppUserId);
        });
        
        builder.Entity<Portfolio>()
            .HasOne(u => u.AppUser)
            .WithMany(p => p.Portfolios)
            .HasForeignKey(p => p.AppUserId);

        builder.Entity<Portfolio>()
            .HasOne(s => s.Stock)
            .WithMany(s => s.Portfolios)
            .HasForeignKey(p => p.StockId);
        
        builder.Entity<RefreshToken>()
            .HasOne(r => r.AppUser)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(r => r.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER"
            }
        };
        
        builder.Entity<IdentityRole>().HasData(roles);
    }
}