using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebDoAn2.Migrations
{
    /// <inheritdoc />
    public partial class Lan1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rating = table.Column<float>(type: "real", nullable: true),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationID);
                });

            migrationBuilder.CreateTable(
                name: "Slide",
                columns: table => new
                {
                    SlideID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlideImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slide", x => x.SlideID);
                });

            migrationBuilder.CreateTable(
                name: "TransportTypes",
                columns: table => new
                {
                    TransportTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportTypes", x => x.TransportTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiry = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    HotelID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameHotel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityHotel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvinceHotel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PricePerNight = table.Column<int>(type: "int", nullable: true),
                    RatingHotel = table.Column<float>(type: "real", nullable: true),
                    ImageHotel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionHotel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.HotelID);
                    table.ForeignKey(
                        name: "FK_Hotels_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Specialties",
                columns: table => new
                {
                    SpecialtyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameFood = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionFood = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrlFood = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationID = table.Column<int>(type: "int", nullable: false),
                    RatingFood = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialties", x => x.SpecialtyID);
                    table.ForeignKey(
                        name: "FK_Specialties_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transports",
                columns: table => new
                {
                    TransportID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransportTypeID = table.Column<int>(type: "int", nullable: true),
                    DescriptionTransports = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactTransports = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityTransports = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvinceTransports = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriceRange = table.Column<int>(type: "int", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transports", x => x.TransportID);
                    table.ForeignKey(
                        name: "FK_Transports_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transports_TransportTypes_TransportTypeID",
                        column: x => x.TransportTypeID,
                        principalTable: "TransportTypes",
                        principalColumn: "TransportTypeID");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RatingReviews = table.Column<float>(type: "real", nullable: true),
                    ReviewDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    LocationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ReviewID);
                    table.ForeignKey(
                        name: "FK_Reviews_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Locations",
                columns: new[] { "LocationID", "City", "Description", "ImageUrl", "Name", "Province", "PublishedDate", "Rating" },
                values: new object[,]
                {
                    { 1, "Thành phố Hạ Long", "Vịnh nổi tiếng với cảnh đẹp", "image1.jpg", "Vịnh Hạ Long tui", "Quảng Ninh", new DateTime(2024, 11, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4.8f },
                    { 2, "Thành phố Đà Lạt", "Thành phố sương mù lãng mạn", "image2.jpg", "Thành phố Sương mù Đà Lạt", "Lâm Đồng", new DateTime(2024, 5, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 4.5f },
                    { 3, "Thành phố 3", "Mang tên đẹp, xuất sắc", "image3.jpg", "Name 3", "Tỉnh 3", new DateTime(2024, 5, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 4.6f },
                    { 4, "Thành phố 4", "Phong cảnh đẹp, rất hữu tình", "image4.jpg", "Name 4", "Tỉnh 4", new DateTime(2023, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5f },
                    { 5, "Thành phố 5", "Con người rất thân thiện, tích cực và vui vẻ", "image5.jpg", "Name 5", "Tỉnh 5", new DateTime(2022, 9, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4.3f }
                });

            migrationBuilder.InsertData(
                table: "Slide",
                columns: new[] { "SlideID", "SlideImage" },
                values: new object[] { 1, "image1.jpg" });

            migrationBuilder.InsertData(
                table: "TransportTypes",
                columns: new[] { "TransportTypeID", "Name" },
                values: new object[,]
                {
                    { 1, "Xe máy" },
                    { 2, "Xe hơi" },
                    { 3, "Xe buýt" },
                    { 4, "Tàu hỏa" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "Email", "FullName", "ImageUser", "Password", "Phone", "RefreshToken", "RefreshTokenExpiry", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "hoanguyentranthi32@gmail.com", "Nguyen Tran Thi Hoa", "image1.jpg", "0309", "0772962490", null, null, "User", "ThiHoa" },
                    { 2, "cogainho@gmail.com", "Tran Thi My A", "image2.jpg", "2503", "0773258462", null, null, "Admin", "CoGaiNho" },
                    { 3, "caunhocxauxi23@gmail.com", "Le Van H", "image3.jpg", "12345", "0992152625", null, null, "User", "CauNhocXauXi" },
                    { 4, "Echcon123@gmail.com", "Nguyen Van C", "image4.jpg", "EchCon123", "0125226584", null, null, "User", "EchCon" },
                    { 5, "vitconvotri253@gmail.com", "Nguyen Pham D", "image5.jpg", "VitCon2003", "0385584808", null, null, "Admin", "VitConVoTri" }
                });

            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] { "HotelID", "CityHotel", "DescriptionHotel", "ImageHotel", "LocationID", "NameHotel", "PricePerNight", "ProvinceHotel", "RatingHotel" },
                values: new object[,]
                {
                    { 1, "Thành phố 1", "Hợp lí rất đẹp đó", "image1.jpg", 1, "Name 1", 250000, "Tỉnh 1", 4.8f },
                    { 2, "Thành phố 2", "Hợp lí rất đẹp đó", "image2.jpg", 2, "Name 2", 450000, "Tỉnh 2", 4.2f },
                    { 3, "Thành phố 3", "Hợp lí rất đẹp đó", "image3.jpg", 3, "Name 3", 210000, "Tỉnh 3", 4.4f },
                    { 4, "Thành phố 4", "Hợp lí rất đẹp đó", "image4.jpg", 4, "Name 4", 330000, "Tỉnh 4", 4.2f },
                    { 5, "Thành phố 5", "Hợp lí rất đẹp đó", "image5.jpg", 5, "Name 5", 460000, "Tỉnh 5", 5f }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "ReviewID", "LocationID", "NoiDung", "RatingReviews", "ReviewDate", "UserID" },
                values: new object[,]
                {
                    { 2, 1, "Cảnh này đẹp quá chời đẹp", 4.5f, new DateTime(2024, 11, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 3, 2, "Tôi thích món ăn lắm, rất ngon luôn nha", 4.8f, new DateTime(2024, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 4, 2, "Tôi sẽ tham gia và hỗ trợ tiếp nhé", 4.4f, new DateTime(2024, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 5, 4, "Sẽ đến và tham quan tiếp", 4.7f, new DateTime(2022, 6, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 3 },
                    { 6, 3, "Tuyệt vời, mọi thứ rất oke và đẹp", 5f, new DateTime(2023, 7, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 5 }
                });

            migrationBuilder.InsertData(
                table: "Specialties",
                columns: new[] { "SpecialtyID", "DescriptionFood", "ImageUrlFood", "LocationID", "NameFood", "RatingFood" },
                values: new object[,]
                {
                    { 1, "Món ăn rất ngon", "image1.jpg", 1, "Food 1", 4.5f },
                    { 2, "Món ăn tuyệt vời", "image2.jpg", 2, "Food 2", 4.6f },
                    { 3, "Món ăn rất oke", "image3.jpg", 3, "Food 3", 4.7f },
                    { 4, "Món ăn xuất sắc", "image4.jpg", 4, "Food 4", 4.6f },
                    { 5, "Món ăn hấp dẫn", "image5.jpg", 5, "Food 5", 4.4f }
                });

            migrationBuilder.InsertData(
                table: "Transports",
                columns: new[] { "TransportID", "CityTransports", "ContactTransports", "DescriptionTransports", "ImageUrl", "LocationID", "PriceRange", "ProvinceTransports", "TransportTypeID" },
                values: new object[,]
                {
                    { 1, "Thành phố 1", "0772962490", "Rất oke, dễ chịu dễ đi lắm", "image1.jpg", 1, 520000, "Tỉnh 1", 1 },
                    { 2, "Thành phố 2", "0992568420", "Rất oke", "image2.jpg", 2, 350000, "Tỉnh 2", 2 },
                    { 3, "Thành phố 3", "0372777243", "Rất hợp lí", "image3.jpg", 3, 340000, "Tỉnh 3", 2 },
                    { 4, "Thành phố 4", "0122568480", "Thoải mái và dễ chịu", "image4.jpg", 4, 110000, "Tỉnh 4", 1 },
                    { 5, "Thành phố 5", "0772962490", "Giá cả hợp lí", "image5.jpg", 5, 800000, "Tỉnh 5", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_LocationID",
                table: "Hotels",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_LocationID",
                table: "Reviews",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserID",
                table: "Reviews",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Specialties_LocationID",
                table: "Specialties",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Transports_LocationID",
                table: "Transports",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Transports_TransportTypeID",
                table: "Transports",
                column: "TransportTypeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hotels");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Slide");

            migrationBuilder.DropTable(
                name: "Specialties");

            migrationBuilder.DropTable(
                name: "Transports");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "TransportTypes");
        }
    }
}
