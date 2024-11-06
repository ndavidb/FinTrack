using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class IndexToUserAndTokenTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StockPrices_StockId",
                table: "StockPrices");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b5db710-697f-4d94-a556-5c0041c9308c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5e362ce-b72e-4755-ba82-fb3d17456b8a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "94f944f2-6091-46b2-b605-8a23dee451c9", null, "Admin", "ADMIN" },
                    { "aca982d6-0fd3-4ce8-9c62-9b72d6549250", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_CompanyName",
                table: "Stocks",
                column: "CompanyName");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_Symbol",
                table: "Stocks",
                column: "Symbol",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StockPrices_StockId_Date",
                table: "StockPrices",
                columns: new[] { "StockId", "Date" });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token_Revoked_Expires",
                table: "RefreshTokens",
                columns: new[] { "Token", "Revoked", "Expires" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers",
                column: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stocks_CompanyName",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_Symbol",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_StockPrices_StockId_Date",
                table: "StockPrices");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_Token_Revoked_Expires",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94f944f2-6091-46b2-b605-8a23dee451c9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aca982d6-0fd3-4ce8-9c62-9b72d6549250");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b5db710-697f-4d94-a556-5c0041c9308c", null, "User", "USER" },
                    { "f5e362ce-b72e-4755-ba82-fb3d17456b8a", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockPrices_StockId",
                table: "StockPrices",
                column: "StockId");
        }
    }
}
