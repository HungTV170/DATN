using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RestaurantListening.Migrations
{
    /// <inheritdoc />
    public partial class Upd_OrderItem_Colname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7be36051-f70f-4b3f-80b0-aa00c8437165");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7200aca-d37c-48f2-bdc2-2d23ec9cb6bc");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "orderItems",
                newName: "PromotionalPrice");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "12c04ac6-60d5-48f2-913a-fced631c13f5", null, "User", "USER" },
                    { "8c37e0bb-fb54-4913-8999-7fd3c8578a40", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "12c04ac6-60d5-48f2-913a-fced631c13f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c37e0bb-fb54-4913-8999-7fd3c8578a40");

            migrationBuilder.RenameColumn(
                name: "PromotionalPrice",
                table: "orderItems",
                newName: "Price");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7be36051-f70f-4b3f-80b0-aa00c8437165", null, "Administrator", "ADMINISTRATOR" },
                    { "a7200aca-d37c-48f2-bdc2-2d23ec9cb6bc", null, "User", "USER" }
                });
        }
    }
}
