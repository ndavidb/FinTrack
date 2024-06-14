using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddPortfolioTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Portfolio_AspNetUsers_AppUserId",
                table: "Portfolio");

            migrationBuilder.DropForeignKey(
                name: "FK_Portfolio_Stocks_StockId",
                table: "Portfolio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Portfolio",
                table: "Portfolio");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "076da7b6-dde1-4fc0-a865-db1d9cea2e63");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9070eb92-fff9-4aee-937d-3c196564b9f9");

            migrationBuilder.RenameTable(
                name: "Portfolio",
                newName: "Portfolios");

            migrationBuilder.RenameIndex(
                name: "IX_Portfolio_StockId",
                table: "Portfolios",
                newName: "IX_Portfolios_StockId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Portfolios",
                table: "Portfolios",
                columns: new[] { "AppUserId", "StockId" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "28227fc4-074c-402c-8e07-5d76430c3ec5", null, "Admin", "ADMIN" },
                    { "67172e9f-fcc8-4bb9-977a-f7606cf0ac52", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolios_AspNetUsers_AppUserId",
                table: "Portfolios",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolios_Stocks_StockId",
                table: "Portfolios",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Portfolios_AspNetUsers_AppUserId",
                table: "Portfolios");

            migrationBuilder.DropForeignKey(
                name: "FK_Portfolios_Stocks_StockId",
                table: "Portfolios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Portfolios",
                table: "Portfolios");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "28227fc4-074c-402c-8e07-5d76430c3ec5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67172e9f-fcc8-4bb9-977a-f7606cf0ac52");

            migrationBuilder.RenameTable(
                name: "Portfolios",
                newName: "Portfolio");

            migrationBuilder.RenameIndex(
                name: "IX_Portfolios_StockId",
                table: "Portfolio",
                newName: "IX_Portfolio_StockId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Portfolio",
                table: "Portfolio",
                columns: new[] { "AppUserId", "StockId" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "076da7b6-dde1-4fc0-a865-db1d9cea2e63", null, "User", "USER" },
                    { "9070eb92-fff9-4aee-937d-3c196564b9f9", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolio_AspNetUsers_AppUserId",
                table: "Portfolio",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolio_Stocks_StockId",
                table: "Portfolio",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
