using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebDoAn2.Model
{
    public class SpecialtiesModel
    {
        [Key]

        public int? SpecialtyID { get; set; }

        public string? NameFood { get; set; }

        public string? DescriptionFood { get; set; }

        public string? ImageUrlFood { get; set; }

        public int LocationID { get; set; }

        public float? RatingFood { get; set; }

        public string? ProvinceFood { get; set; }

        public string? CityFood {  get; set; }

        [ForeignKey("LocationID")]
        public LocationsModel Locations { get; set; }

    }
}
