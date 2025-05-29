namespace WebDoAn2.DTO
{
    public class TransportsDTO
    {
        public int? TransportID { get; set; }
        public int TransportTypeID { get; set; }
        public string? DescriptionTransports { get; set; }
        public string? ContactTransports { get; set; }
        public string? CityTransports { get; set; }
        public string? ProvinceTransports { get; set; }
        public int? PriceRange { get; set; }
        public string? ImageUrl { get; set; }
        public int? LocationID { get; set; }
    }
}
