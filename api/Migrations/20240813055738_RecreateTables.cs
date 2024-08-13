using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RecreateTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bb9e77e-45a2-4efc-8d0f-725beeac5907");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2ddd3d5-341c-4aec-8bc3-16972dee7d16");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "295d4976-d469-46d5-ba4d-97129a989359", null, "Admin", "ADMIN" },
                    { "632fc986-9da8-4fec-820b-b77d378a2ffc", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "295d4976-d469-46d5-ba4d-97129a989359");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "632fc986-9da8-4fec-820b-b77d378a2ffc");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4bb9e77e-45a2-4efc-8d0f-725beeac5907", null, "User", "USER" },
                    { "b2ddd3d5-341c-4aec-8bc3-16972dee7d16", null, "Admin", "ADMIN" }
                });
        }
    }
}
