using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Data;

public class Seed
{
    public static async Task SeedData(ApplicationDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        if (!context.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser { UserName = "abc", Email = "abc@gmail.com" },
                new AppUser { UserName = "test123", Email = "test123@gmail.com" },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "test123*");
            }
        }

        if (!context.Stocks.Any())
        {
            var stocks = new List<Stock>
            {
                new Stock { Id = 1, Symbol = "AAPL", CompanyName = "Apple Inc.", Industry = "Technology", MarketCap = 2400000000000, Website = "www.apple.com" },
                new Stock { Id = 2, Symbol = "MSFT", CompanyName = "Microsoft Corporation", Industry = "Technology", MarketCap = 2300000000000, Website = "www.microsoft.com" },
                new Stock { Id = 3, Symbol = "GOOGL", CompanyName = "Alphabet Inc.", Industry = "Technology", MarketCap = 1900000000000, Website = "www.abc.xyz" },
                new Stock { Id = 4, Symbol = "AMZN", CompanyName = "Amazon.com Inc.", Industry = "Consumer Cyclical", MarketCap = 1700000000000, Website = "www.amazon.com" },
                new Stock { Id = 5, Symbol = "FB", CompanyName = "Meta Platforms Inc.", Industry = "Technology", MarketCap = 900000000000, Website = "about.facebook.com" },
                new Stock { Id = 6, Symbol = "TSLA", CompanyName = "Tesla Inc.", Industry = "Automotive", MarketCap = 750000000000, Website = "www.tesla.com" },
                new Stock { Id = 7, Symbol = "BRK.A", CompanyName = "Berkshire Hathaway Inc.", Industry = "Financial Services", MarketCap = 620000000000, Website = "www.berkshirehathaway.com" },
                new Stock { Id = 8, Symbol = "JPM", CompanyName = "JPMorgan Chase & Co.", Industry = "Financial Services", MarketCap = 460000000000, Website = "www.jpmorganchase.com" },
                new Stock { Id = 9, Symbol = "V", CompanyName = "Visa Inc.", Industry = "Financial Services", MarketCap = 480000000000, Website = "www.visa.com" },
                new Stock { Id = 10, Symbol = "JNJ", CompanyName = "Johnson & Johnson", Industry = "Healthcare", MarketCap = 450000000000, Website = "www.jnj.com" }
            };

            await context.Stocks.AddRangeAsync(stocks);
        }

        if (!context.Comments.Any())
        {
            var comments = new List<Comment>
            {
                new Comment { Id = 1, Title = "Great potential", Content = "This stock shows promising growth patterns.", CreatedOn = DateTime.UtcNow.AddDays(-5), StockId = 1, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa" },
                new Comment { Id = 2, Title = "Concerning trend", Content = "Recent market volatility affects this stock negatively.", CreatedOn = DateTime.UtcNow.AddDays(-4), StockId = 2, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa" },
                new Comment { Id = 3, Title = "Solid fundamentals", Content = "Strong balance sheet and consistent earnings.", CreatedOn = DateTime.UtcNow.AddDays(-3), StockId = 3, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa" },
                new Comment { Id = 4, Title = "Overvalued", Content = "Current price seems too high compared to peers.", CreatedOn = DateTime.UtcNow.AddDays(-2), StockId = 4, AppUserId = "a8e98c17-00a0-48e2-9314-fc8a458e9de8" },
                new Comment { Id = 5, Title = "Dividend stock", Content = "Reliable dividend payouts make this attractive.", CreatedOn = DateTime.UtcNow.AddDays(-1), StockId = 5, AppUserId = "a8e98c17-00a0-48e2-9314-fc8a458e9de8" }
            };

            await context.Comments.AddRangeAsync(comments);
        }

        if (!context.StockPrices.Any())
        {
            var stockPrices = new List<StockPrice>
            {
                new StockPrice { Id = 1, Symbol = "AAPL", Date = DateTime.UtcNow.AddDays(-5), Price = 150.25m, StockId = 1},
                new StockPrice { Id = 2, Symbol = "MSFT", Date = DateTime.UtcNow.AddDays(-4), Price = 305.50m, StockId = 2 },
                new StockPrice { Id = 3, Symbol = "GOOGL", Date = DateTime.UtcNow.AddDays(-3), Price = 2750.00m, StockId = 3 },
                new StockPrice { Id = 4, Symbol = "AMZN", Date = DateTime.UtcNow.AddDays(-2), Price = 3380.75m, StockId = 4 },
                new StockPrice { Id = 5, Symbol = "FB", Date = DateTime.UtcNow.AddDays(-1), Price = 330.15m, StockId = 5 }
            };

            await context.StockPrices.AddRangeAsync(stockPrices);
        }

        if (!context.Portfolios.Any())
        {
            var portfolios = new List<Portfolio>
            { 
                new Portfolio { Id = 1, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa", StockId = 1, PurchaseDate = DateTime.UtcNow.AddDays(-30), PurchasePrice = 150.00m },
                new Portfolio { Id = 2, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa", StockId = 3, PurchaseDate = DateTime.UtcNow.AddDays(-25), PurchasePrice = 2800.00m },
                new Portfolio { Id = 3, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa", StockId = 5, PurchaseDate = DateTime.UtcNow.AddDays(-20), PurchasePrice = 330.00m },
                new Portfolio { Id = 4, AppUserId = "7c56cfa6-3ae4-449b-a031-c564ccf8b9aa", StockId = 2, PurchaseDate = DateTime.UtcNow.AddDays(-15), PurchasePrice = 300.00m },
                new Portfolio { Id = 5, AppUserId = "a8e98c17-00a0-48e2-9314-fc8a458e9de8", StockId = 4, PurchaseDate = DateTime.UtcNow.AddDays(-10), PurchasePrice = 3300.00m },
                new Portfolio { Id = 6, AppUserId = "a8e98c17-00a0-48e2-9314-fc8a458e9de8", StockId = 6, PurchaseDate = DateTime.UtcNow.AddDays(-5), PurchasePrice = 700.00m },
                new Portfolio { Id = 7, AppUserId = "a8e98c17-00a0-48e2-9314-fc8a458e9de8", StockId = 7, PurchaseDate = DateTime.UtcNow.AddDays(-4), PurchasePrice = 420000.00m }
            };

            await context.Portfolios.AddRangeAsync(portfolios);
        }

        await context.SaveChangesAsync();
    }
}