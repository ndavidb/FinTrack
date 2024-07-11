using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class PortfolioModelCheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "54d8ed83-2973-4421-bd72-5617fc43862e", null, "Admin", "ADMIN" },
                    { "5d3b1223-50f1-4201-a415-568fcee2c1a1", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54d8ed83-2973-4421-bd72-5617fc43862e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d3b1223-50f1-4201-a415-568fcee2c1a1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5f5f1327-7f96-465f-b1e0-393bceef3c4d", null, "User", "USER" },
                    { "7692e02b-ae1b-429d-acb2-0f3f2d22efdd", null, "Admin", "ADMIN" }
                });
        }
    }
}
