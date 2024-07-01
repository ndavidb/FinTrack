using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class PortfolioPriceAndDateColumnsandStockNewWebsiteColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "263b8605-0285-432c-9eb5-13f44625604f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a130f903-4445-4c37-a67b-919e70de0312");

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Stocks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "PurchaseDate",
                table: "Portfolios",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "PurchasePrice",
                table: "Portfolios",
                type: "numeric",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Website",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "PurchaseDate",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "PurchasePrice",
                table: "Portfolios");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "263b8605-0285-432c-9eb5-13f44625604f", null, "User", "USER" },
                    { "a130f903-4445-4c37-a67b-919e70de0312", null, "Admin", "ADMIN" }
                });
        }
    }
}
