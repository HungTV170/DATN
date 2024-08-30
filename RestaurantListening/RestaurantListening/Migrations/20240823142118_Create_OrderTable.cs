using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RestaurantListening.Migrations
{
    /// <inheritdoc />
    public partial class Create_OrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_tables_TableId",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "IX_orders_TableId",
                table: "orders");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17174394-ba5d-439c-9dc3-a4df9df30e89");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d0cae5e1-7d79-419e-aba2-3dd652728f47");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "orders");

            migrationBuilder.CreateTable(
                name: "OrderTable",
                columns: table => new
                {
                    OrderTableId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderTable", x => x.OrderTableId);
                    table.ForeignKey(
                        name: "FK_OrderTable_orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderTable_tables_TableId",
                        column: x => x.TableId,
                        principalTable: "tables",
                        principalColumn: "TableId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7be36051-f70f-4b3f-80b0-aa00c8437165", null, "Administrator", "ADMINISTRATOR" },
                    { "a7200aca-d37c-48f2-bdc2-2d23ec9cb6bc", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderTable_OrderId",
                table: "OrderTable",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderTable_TableId",
                table: "OrderTable",
                column: "TableId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderTable");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7be36051-f70f-4b3f-80b0-aa00c8437165");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7200aca-d37c-48f2-bdc2-2d23ec9cb6bc");

            migrationBuilder.AddColumn<int>(
                name: "TableId",
                table: "orders",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17174394-ba5d-439c-9dc3-a4df9df30e89", null, "Administrator", "ADMINISTRATOR" },
                    { "d0cae5e1-7d79-419e-aba2-3dd652728f47", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_orders_TableId",
                table: "orders",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_tables_TableId",
                table: "orders",
                column: "TableId",
                principalTable: "tables",
                principalColumn: "TableId");
        }
    }
}
