using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyPortfolioTable_ModifyStockTableRemovingPurchaseAndLastDiv : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30d0286e-7dd9-49be-8951-f6deed51efc7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3409ac0e-7a6c-4309-b50e-a668f3c45c7e");

            migrationBuilder.DropColumn(
                name: "LastDiv",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "Purchase",
                table: "Stocks");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Portfolios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1883f035-9dfa-4ce5-bed0-f8624980676d", null, "Admin", "ADMIN" },
                    { "aee9e384-4ac4-45da-9b0a-06578a6f7d71", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1883f035-9dfa-4ce5-bed0-f8624980676d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aee9e384-4ac4-45da-9b0a-06578a6f7d71");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Portfolios");

            migrationBuilder.AddColumn<decimal>(
                name: "LastDiv",
                table: "Stocks",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Purchase",
                table: "Stocks",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "30d0286e-7dd9-49be-8951-f6deed51efc7", null, "Admin", "ADMIN" },
                    { "3409ac0e-7a6c-4309-b50e-a668f3c45c7e", null, "User", "USER" }
                });
        }
    }
}
