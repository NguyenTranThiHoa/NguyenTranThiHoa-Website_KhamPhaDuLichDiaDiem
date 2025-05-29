using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebDoAn2.Migrations
{
    /// <inheritdoc />
    public partial class Lan3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_TransportTypes_TransportTypeID",
                table: "Transports");

            migrationBuilder.AlterColumn<int>(
                name: "TransportTypeID",
                table: "Transports",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CityFood",
                table: "Specialties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProvinceFood",
                table: "Specialties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Specialties",
                keyColumn: "SpecialtyID",
                keyValue: 1,
                columns: new[] { "CityFood", "ProvinceFood" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Specialties",
                keyColumn: "SpecialtyID",
                keyValue: 2,
                columns: new[] { "CityFood", "ProvinceFood" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Specialties",
                keyColumn: "SpecialtyID",
                keyValue: 3,
                columns: new[] { "CityFood", "ProvinceFood" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Specialties",
                keyColumn: "SpecialtyID",
                keyValue: 4,
                columns: new[] { "CityFood", "ProvinceFood" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Specialties",
                keyColumn: "SpecialtyID",
                keyValue: 5,
                columns: new[] { "CityFood", "ProvinceFood" },
                values: new object[] { null, null });

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_TransportTypes_TransportTypeID",
                table: "Transports",
                column: "TransportTypeID",
                principalTable: "TransportTypes",
                principalColumn: "TransportTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_TransportTypes_TransportTypeID",
                table: "Transports");

            migrationBuilder.DropColumn(
                name: "CityFood",
                table: "Specialties");

            migrationBuilder.DropColumn(
                name: "ProvinceFood",
                table: "Specialties");

            migrationBuilder.AlterColumn<int>(
                name: "TransportTypeID",
                table: "Transports",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_TransportTypes_TransportTypeID",
                table: "Transports",
                column: "TransportTypeID",
                principalTable: "TransportTypes",
                principalColumn: "TransportTypeID");
        }
    }
}
