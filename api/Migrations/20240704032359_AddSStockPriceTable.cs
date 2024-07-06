using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddSStockPriceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1883f035-9dfa-4ce5-bed0-f8624980676d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aee9e384-4ac4-45da-9b0a-06578a6f7d71");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cc01290-3570-4eb6-86f1-6f54d756ede2", null, "Admin", "ADMIN" },
                    { "b2c7c1c3-a1a0-4122-837c-34b50c617bd8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cc01290-3570-4eb6-86f1-6f54d756ede2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2c7c1c3-a1a0-4122-837c-34b50c617bd8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1883f035-9dfa-4ce5-bed0-f8624980676d", null, "Admin", "ADMIN" },
                    { "aee9e384-4ac4-45da-9b0a-06578a6f7d71", null, "User", "USER" }
                });
        }
    }
}
