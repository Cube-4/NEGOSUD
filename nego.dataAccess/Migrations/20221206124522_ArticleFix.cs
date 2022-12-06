using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nego.dataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ArticleFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Family",
                table: "Articles",
                newName: "Reference");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Reference",
                table: "Articles",
                newName: "Family");
        }
    }
}
