using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nego.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addEnableToClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Enable",
                table: "Clients",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Enable",
                table: "Clients");
        }
    }
}
