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
                new Stock { Id = 1, Symbol = "AAPL", CompanyName = "Apple Inc.", Industry = "Technology", MarketCap = 2400000000000 },
                new Stock { Id = 2, Symbol = "MSFT", CompanyName = "Microsoft Corporation", Industry = "Technology", MarketCap = 2300000000000 },
                new Stock { Id = 3, Symbol = "GOOGL", CompanyName = "Alphabet Inc.", Industry = "Technology", MarketCap = 1900000000000 },
                new Stock { Id = 4, Symbol = "AMZN", CompanyName = "Amazon.com Inc.", Industry = "Consumer Cyclical", MarketCap = 1700000000000 },
                new Stock { Id = 5, Symbol = "FB", CompanyName = "Meta Platforms Inc.", Industry = "Technology", MarketCap = 900000000000 },
                new Stock { Id = 6, Symbol = "TSLA", CompanyName = "Tesla Inc.", Industry = "Automotive", MarketCap = 750000000000 },
                new Stock { Id = 7, Symbol = "BRK.A", CompanyName = "Berkshire Hathaway Inc.", Industry = "Financial Services", MarketCap = 620000000000 },
                new Stock { Id = 8, Symbol = "JPM", CompanyName = "JPMorgan Chase & Co.", Industry = "Financial Services", MarketCap = 460000000000 },
                new Stock { Id = 9, Symbol = "V", CompanyName = "Visa Inc.", Industry = "Financial Services", MarketCap = 480000000000 },
                new Stock { Id = 10, Symbol = "JNJ", CompanyName = "Johnson & Johnson", Industry = "Healthcare", MarketCap = 450000000000 },
                new Stock { Id = 11, Symbol = "WMT", CompanyName = "Walmart Inc.", Industry = "Consumer Defensive", MarketCap = 400000000000 },
                new Stock { Id = 12, Symbol = "PG", CompanyName = "Procter & Gamble Co.", Industry = "Consumer Defensive", MarketCap = 340000000000 },
                new Stock { Id = 13, Symbol = "NVDA", CompanyName = "NVIDIA Corporation", Industry = "Technology", MarketCap = 550000000000 },
                new Stock { Id = 14, Symbol = "HD", CompanyName = "The Home Depot Inc.", Industry = "Consumer Cyclical", MarketCap = 330000000000 },
                new Stock { Id = 15, Symbol = "DIS", CompanyName = "The Walt Disney Company", Industry = "Communication Services", MarketCap = 320000000000 },
                new Stock { Id = 16, Symbol = "BAC", CompanyName = "Bank of America Corporation", Industry = "Financial Services", MarketCap = 350000000000 },
                new Stock { Id = 17, Symbol = "KO", CompanyName = "The Coca-Cola Company", Industry = "Consumer Defensive", MarketCap = 240000000000 },
                new Stock { Id = 18, Symbol = "XOM", CompanyName = "Exxon Mobil Corporation", Industry = "Energy", MarketCap = 260000000000 },
                new Stock { Id = 19, Symbol = "PFE", CompanyName = "Pfizer Inc.", Industry = "Healthcare", MarketCap = 215000000000 },
                new Stock { Id = 20, Symbol = "CSCO", CompanyName = "Cisco Systems Inc.", Industry = "Technology", MarketCap = 230000000000 }
        
            };

            await context.Stocks.AddRangeAsync(stocks);
        }

        if (!context.Comments.Any())
        {
            var comments = new List<Comment>
            {
                new Comment { Id = 1, Title = "Great potential", Content = "This stock shows promising growth patterns.", CreatedOn = DateTime.UtcNow.AddDays(-5), StockId = 1, AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95" },
                new Comment { Id = 2, Title = "Concerning trend", Content = "Recent market volatility affects this stock negatively.", CreatedOn = DateTime.UtcNow.AddDays(-4), StockId = 2, AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95" },
                new Comment { Id = 3, Title = "Solid fundamentals", Content = "Strong balance sheet and consistent earnings.", CreatedOn = DateTime.UtcNow.AddDays(-3), StockId = 3, AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95" },
                new Comment { Id = 4, Title = "Overvalued", Content = "Current price seems too high compared to peers.", CreatedOn = DateTime.UtcNow.AddDays(-2), StockId = 4, AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95" },
                new Comment { Id = 5, Title = "Dividend stock", Content = "Reliable dividend payouts make this attractive.", CreatedOn = DateTime.UtcNow.AddDays(-1), StockId = 5, AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95" },
                new Comment { Id = 6, Title = "Tech leader", Content = "Innovative products keep this company ahead.", CreatedOn = DateTime.UtcNow.AddHours(-12), StockId = 6, AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564" },
                new Comment { Id = 7, Title = "Cyclical stock", Content = "Performance tied closely to economic cycles.", CreatedOn = DateTime.UtcNow.AddHours(-6), StockId = 7, AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564" },
                new Comment { Id = 8, Title = "Emerging markets exposure", Content = "Good way to diversify portfolio geographically.", CreatedOn = DateTime.UtcNow.AddHours(-3), StockId = 8, AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564" },
                new Comment { Id = 9, Title = "Acquisition target", Content = "Rumors of potential buyout boosting price.", CreatedOn = DateTime.UtcNow.AddHours(-1), StockId = 9, AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564" },
                new Comment { Id = 10, Title = "Regulatory challenges", Content = "New policies may impact future growth.", CreatedOn = DateTime.UtcNow, StockId = 10, AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564" }
            };

            await context.Comments.AddRangeAsync(comments);
        }

        if (!context.Portfolios.Any())
        {
            var portfolios = new List<Portfolio>
            { 
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 1 },
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 3 },
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 5 },
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 2 },
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 4 },
                new Portfolio { AppUserId = "5b987a9e-cce3-40ea-b7c1-16fa2e936d95", StockId = 6 },
                new Portfolio { AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564", StockId = 7 },
                new Portfolio { AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564", StockId = 8 },
                new Portfolio { AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564", StockId = 9 },
                new Portfolio { AppUserId = "a1f02cbc-451c-492f-9595-fd9238162564", StockId = 10 }
            };

            await context.Portfolios.AddRangeAsync(portfolios);
        }

        await context.SaveChangesAsync();
    }
}