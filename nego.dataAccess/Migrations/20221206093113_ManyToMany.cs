using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nego.dataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderArticle",
                table: "OrderArticle");

            migrationBuilder.DropIndex(
                name: "IX_OrderArticle_OrderId",
                table: "OrderArticle");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRole");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OrderArticle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderArticle",
                table: "OrderArticle",
                columns: new[] { "OrderId", "ArticleId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderArticle",
                table: "OrderArticle");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserRole",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "OrderArticle",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderArticle",
                table: "OrderArticle",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderArticle_OrderId",
                table: "OrderArticle",
                column: "OrderId");
        }
    }
}
