using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WebDoAn2.Model
{
    public class LocationsModel
    {
        [Key]
        public int LocationID { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? City { get; set; }

        public string? Province { get; set; }

        public string? ImageUrl { get; set; }

        public float? Rating { get; set; }

        public DateTime? PublishedDate { get; set; }
    }
}
