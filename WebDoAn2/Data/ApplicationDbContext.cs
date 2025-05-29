using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel;
using System.Drawing;
using WebDoAn2.Model;


namespace WebDoAn2.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<UsersModel> Users { get; set; }
        public DbSet<LocationsModel> Locations { get; set; }
        public DbSet<ReviewsModel> Reviews { get; set; }
        public DbSet<HotelsModel> Hotels { get; set; }
        public DbSet<SpecialtiesModel> Specialties { get; set; }
        public DbSet<TransportsModel> Transports { get; set; }
        public DbSet<SlideModel> Slide { get; set; }
        public DbSet<TransportTypeModel> TransportTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for Users
            modelBuilder.Entity<UsersModel>().HasData(
                new UsersModel
                {
                    UserID = 1,
                    Username = "ThiHoa",
                    Password = "0309",
                    FullName = "Nguyen Tran Thi Hoa",
                    Email = "hoanguyentranthi32@gmail.com",
                    Phone = "0772962490",
                    Role = "User",
                    ImageUser ="image1.jpg"
                },
                new UsersModel
                {
                    UserID = 2,
                    Username = "CoGaiNho",
                    Password = "2503",
                    FullName = "Tran Thi My A",
                    Email = "cogainho@gmail.com",
                    Phone = "0773258462",
                    Role = "Admin",
                    ImageUser = "image2.jpg"
                },
                new UsersModel
                {
                    UserID = 3,
                    Username = "CauNhocXauXi",
                    Password = "12345",
                    FullName = "Le Van H",
                    Email = "caunhocxauxi23@gmail.com",
                    Phone = "0992152625",
                    Role = "User",
                    ImageUser = "image3.jpg"
                },
                new UsersModel
                {
                    UserID = 4,
                    Username = "EchCon",
                    Password = "EchCon123",
                    FullName = "Nguyen Van C",
                    Email = "Echcon123@gmail.com",
                    Phone = "0125226584",
                    Role = "User",
                    ImageUser = "image4.jpg"
                },
                new UsersModel
                {
                    UserID = 5,
                    Username = "VitConVoTri",
                    Password = "VitCon2003",
                    FullName = "Nguyen Pham D",
                    Email = "vitconvotri253@gmail.com",
                    Phone = "0385584808",
                    Role = "Admin",
                    ImageUser = "image5.jpg"
                }
            );

            // Seed data for Locations
            modelBuilder.Entity<LocationsModel>().HasData(
                new LocationsModel
                {
                    LocationID = 1,
                    Name = "Vịnh Hạ Long tui",
                    Description = "Vịnh nổi tiếng với cảnh đẹp",
                    City = "Thành phố Hạ Long",
                    Province = "Quảng Ninh",
                    ImageUrl = "image1.jpg",
                    Rating = (float?)4.8,
                    PublishedDate = new DateTime(2024, 11, 30)
                },
                new LocationsModel
                {
                    LocationID = 2,
                    Name = "Thành phố Sương mù Đà Lạt",
                    Description = "Thành phố sương mù lãng mạn",
                    City = "Thành phố Đà Lạt",
                    Province = "Lâm Đồng",
                    ImageUrl = "image2.jpg",
                    Rating = (float?)4.5,
                    PublishedDate = new DateTime(2024, 05, 26)
                },
                new LocationsModel
                {
                    LocationID = 3,
                    Name = "Name 3",
                    Description = "Mang tên đẹp, xuất sắc",
                    City = "Thành phố 3",
                    Province = "Tỉnh 3",
                    ImageUrl = "image3.jpg",
                    Rating = (float?)4.6,
                    PublishedDate = new DateTime(2024, 05, 14)
                },
                new LocationsModel
                {
                    LocationID = 4,
                    Name = "Name 4",
                    Description = "Phong cảnh đẹp, rất hữu tình",
                    City = "Thành phố 4",
                    Province = "Tỉnh 4",
                    ImageUrl = "image4.jpg",
                    Rating = (float?)5.0,
                    PublishedDate = new DateTime(2023, 03, 25)
                },
                new LocationsModel
                {
                    LocationID = 5,
                    Name = "Name 5",
                    Description = "Con người rất thân thiện, tích cực và vui vẻ",
                    City = "Thành phố 5",
                    Province = "Tỉnh 5",
                    ImageUrl = "image5.jpg",
                    Rating = (float?)4.3,
                    PublishedDate = new DateTime(2022, 09, 28)
                }
            );

            // Seed data for Reviews
            modelBuilder.Entity<ReviewsModel>().HasData(
                new ReviewsModel
                {
                    ReviewID = 2,
                    NoiDung = "Cảnh này đẹp quá chời đẹp",
                    RatingReviews = (float?)4.5,
                    ReviewDate = new DateTime(2024, 11, 30),
                    UserID = 1,
                    LocationID = 1
                },
                new ReviewsModel
                {
                    ReviewID = 3,
                    NoiDung = "Tôi thích món ăn lắm, rất ngon luôn nha",
                    RatingReviews = (float?)4.8,
                    ReviewDate = new DateTime(2024, 11, 15),
                    UserID = 1,
                    LocationID = 2
                },
                new ReviewsModel
                {
                    ReviewID = 4,
                    NoiDung = "Tôi sẽ tham gia và hỗ trợ tiếp nhé",
                    RatingReviews = (float?)4.4,
                    ReviewDate = new DateTime(2024, 05, 15),
                    UserID = 2,
                    LocationID = 2
                },
                new ReviewsModel
                {
                    ReviewID = 5,
                    NoiDung = "Sẽ đến và tham quan tiếp",
                    RatingReviews = (float?)4.7,
                    ReviewDate = new DateTime(2022, 06, 22),
                    UserID = 3,
                    LocationID = 4
                },
                new ReviewsModel
                {
                    ReviewID = 6,
                    NoiDung = "Tuyệt vời, mọi thứ rất oke và đẹp",
                    RatingReviews = (float?)5.0,
                    ReviewDate = new DateTime(2023, 07, 02),
                    UserID = 5,
                    LocationID = 3
                }
            );

            // Seed data for Hotels
            modelBuilder.Entity<HotelsModel>().HasData(
                new HotelsModel
                {
                    HotelID = 1,
                    NameHotel = "Name 1",
                    CityHotel = "Thành phố 1",
                    ProvinceHotel = "Tỉnh 1",
                    PricePerNight = 250000,
                    RatingHotel = (float?)4.8,
                    ImageHotel = "image1.jpg",
                    DescriptionHotel = "Hợp lí rất đẹp đó",
                    LocationID = 1
                },
                new HotelsModel
                {
                    HotelID = 2,
                    NameHotel = "Name 2",
                    CityHotel = "Thành phố 2",
                    ProvinceHotel = "Tỉnh 2",
                    PricePerNight = 450000,
                    RatingHotel = (float?)4.2,
                    ImageHotel = "image2.jpg",
                    DescriptionHotel = "Hợp lí rất đẹp đó",
                    LocationID = 2
                },
                new HotelsModel
                {
                    HotelID = 3,
                    NameHotel = "Name 3",
                    CityHotel = "Thành phố 3",
                    ProvinceHotel = "Tỉnh 3",
                    PricePerNight = 210000,
                    RatingHotel = (float?)4.4,
                    ImageHotel = "image3.jpg",
                    DescriptionHotel = "Hợp lí rất đẹp đó",
                    LocationID = 3
                },
                new HotelsModel
                {
                    HotelID = 4,
                    NameHotel = "Name 4",
                    CityHotel = "Thành phố 4",
                    ProvinceHotel = "Tỉnh 4",
                    PricePerNight = 330000,
                    RatingHotel = (float?)4.2,
                    ImageHotel = "image4.jpg",
                    DescriptionHotel = "Hợp lí rất đẹp đó",
                    LocationID = 4
                },
                new HotelsModel
                {
                    HotelID = 5,
                    NameHotel = "Name 5",
                    CityHotel = "Thành phố 5",
                    ProvinceHotel = "Tỉnh 5",
                    PricePerNight = 460000,
                    RatingHotel = (float?)5.0,
                    ImageHotel = "image5.jpg",
                    DescriptionHotel = "Hợp lí rất đẹp đó",
                    LocationID = 5
                }
            );

            modelBuilder.Entity<SpecialtiesModel>().HasData(
                new SpecialtiesModel
                {
                    SpecialtyID = 1,
                    NameFood = "Food 1",
                    DescriptionFood = "Món ăn rất ngon",
                    ImageUrlFood = "image1.jpg",
                    LocationID = 1,
                    RatingFood = (float?)4.5
                },
                new SpecialtiesModel
                {
                    SpecialtyID = 2,
                    NameFood = "Food 2",
                    DescriptionFood = "Món ăn tuyệt vời",
                    ImageUrlFood = "image2.jpg",
                    LocationID = 2,
                    RatingFood = (float?)4.6
                },
                new SpecialtiesModel
                {
                    SpecialtyID = 3,
                    NameFood = "Food 3",
                    DescriptionFood = "Món ăn rất oke",
                    ImageUrlFood = "image3.jpg",
                    LocationID = 3,
                    RatingFood = (float?)4.7
                },
                new SpecialtiesModel
                {
                    SpecialtyID = 4,
                    NameFood = "Food 4",
                    DescriptionFood = "Món ăn xuất sắc",
                    ImageUrlFood = "image4.jpg",
                    LocationID = 4,
                    RatingFood = (float?)4.6
                },
                new SpecialtiesModel
                {
                    SpecialtyID = 5,
                    NameFood = "Food 5",
                    DescriptionFood = "Món ăn hấp dẫn",
                    ImageUrlFood = "image5.jpg",
                    LocationID = 5,
                    RatingFood = (float?)4.4
                }
            );

            // Seed data for Transports
            modelBuilder.Entity<TransportsModel>().HasData(
                new TransportsModel
                {
                    TransportID = 1,
                    TransportTypeID = 1,
                    DescriptionTransports = "Rất oke, dễ chịu dễ đi lắm",
                    ContactTransports = "0772962490",
                    CityTransports = "Thành phố 1",
                    ProvinceTransports = "Tỉnh 1",
                    PriceRange = 520000,
                    ImageUrl = "image1.jpg",
                    LocationID = 1
                },
                new TransportsModel
                {
                    TransportID = 2,
                    TransportTypeID = 2,
                    DescriptionTransports = "Rất oke",
                    ContactTransports = "0992568420",
                    CityTransports = "Thành phố 2",
                    ProvinceTransports = "Tỉnh 2",
                    PriceRange = 350000,
                    ImageUrl = "image2.jpg",
                    LocationID = 2
                },
                new TransportsModel
                {
                    TransportID = 3,
                    TransportTypeID = 2,
                    DescriptionTransports = "Rất hợp lí",
                    ContactTransports = "0372777243",
                    CityTransports = "Thành phố 3",
                    ProvinceTransports = "Tỉnh 3",
                    PriceRange = 340000,
                    ImageUrl = "image3.jpg",
                    LocationID = 3
                },
                new TransportsModel
                {
                    TransportID = 4,
                    TransportTypeID = 1,
                    DescriptionTransports = "Thoải mái và dễ chịu",
                    ContactTransports = "0122568480",
                    CityTransports = "Thành phố 4",
                    ProvinceTransports = "Tỉnh 4",
                    PriceRange = 110000,
                    ImageUrl = "image4.jpg",
                    LocationID = 4
                },
                new TransportsModel
                {
                    TransportID = 5,
                    TransportTypeID = 2,
                    DescriptionTransports = "Giá cả hợp lí",
                    ContactTransports = "0772962490",
                    CityTransports = "Thành phố 5",
                    ProvinceTransports = "Tỉnh 5",
                    PriceRange = 800000,
                    ImageUrl = "image5.jpg",
                    LocationID = 5
                }
            );

            // Seed data for Slide
            modelBuilder.Entity<SlideModel>().HasData(
                new SlideModel
                {
                    SlideID = 1,
                    SlideImage = "image1.jpg"
                }
            );

            // Seed data for Transports
            modelBuilder.Entity<TransportTypeModel>().HasData(
                new TransportTypeModel { TransportTypeID = 1, Name = "Xe máy" },
                new TransportTypeModel { TransportTypeID = 2, Name = "Xe hơi" },
                new TransportTypeModel { TransportTypeID = 3, Name = "Xe buýt" },
                new TransportTypeModel { TransportTypeID = 4, Name = "Tàu hỏa" }
            );
        }
    }
}
