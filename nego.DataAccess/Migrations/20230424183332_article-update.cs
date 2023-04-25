using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nego.dataAccess.Migrations
{
    /// <inheritdoc />
    public partial class articleupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StripePriceId",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StripeProductId",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StripePriceId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "StripeProductId",
                table: "Articles");
        }
    }
}
