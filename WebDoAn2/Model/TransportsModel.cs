using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebDoAn2.Model
{
    public class TransportsModel
    {
        [Key]

        public int TransportID { get; set; }
        public int TransportTypeID { get; set; }

        [ForeignKey("TransportTypeID")]
        public TransportTypeModel TransportType { get; set; }
        public string? DescriptionTransports { get; set; }

        public string? ContactTransports { get; set; }

        public string? CityTransports { get; set; }

        public string? ProvinceTransports { get; set; }

        public int? PriceRange { get; set; }

        public string? ImageUrl { get; set; }

        public int LocationID { get; set; }

        [ForeignKey("LocationID")]
        public LocationsModel Locations { get; set; } 

    }
}
