using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebDoAn2.Model
{
    public class HotelsModel
    {
        [Key]
        public int HotelID { get; set; }

        public string? NameHotel { get; set; }

        public string? CityHotel { get; set; }

        public string? ProvinceHotel { get; set; }

        public int? PricePerNight { get; set; }

        public float? RatingHotel { get; set; }

        public string? ImageHotel { get; set; }

        public string? DescriptionHotel { get; set; }

        public int LocationID { get; set; }
        
        [ForeignKey("LocationID")]
        public LocationsModel Locations { get; set; }
    }
}
