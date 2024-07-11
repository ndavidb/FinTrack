using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ResetAndRessedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM \"Portfolios\"");
            migrationBuilder.Sql("DELETE FROM \"Comments\"");
            migrationBuilder.Sql("DELETE FROM \"StockPrices\"");
            migrationBuilder.Sql("DELETE FROM \"Stocks\"");
            migrationBuilder.Sql("DELETE FROM \"AspNetUserRoles\"");
            migrationBuilder.Sql("DELETE FROM \"AspNetUsers\"");
            
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0f8f61c4-bb01-459e-b4b2-a69865c5152f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e49572bc-0a73-4833-9715-17fdea072f68");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5f5f1327-7f96-465f-b1e0-393bceef3c4d", null, "User", "USER" },
                    { "7692e02b-ae1b-429d-acb2-0f3f2d22efdd", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5f5f1327-7f96-465f-b1e0-393bceef3c4d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7692e02b-ae1b-429d-acb2-0f3f2d22efdd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0f8f61c4-bb01-459e-b4b2-a69865c5152f", null, "User", "USER" },
                    { "e49572bc-0a73-4833-9715-17fdea072f68", null, "Admin", "ADMIN" }
                });
        }
    }
}
