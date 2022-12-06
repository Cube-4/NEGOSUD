using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nego.dataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyWId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRole");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OrderArticle");
        }
    }
}
