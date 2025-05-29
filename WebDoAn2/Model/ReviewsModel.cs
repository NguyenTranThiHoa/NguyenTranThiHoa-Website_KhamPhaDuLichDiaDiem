using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebDoAn2.Model
{
    public class ReviewsModel
    {
        [Key]
        public int ReviewID { get; set; }

        public string? NoiDung { get; set; }

        public float? RatingReviews { get; set; }

        public DateTime? ReviewDate { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public UsersModel Users { get; set; }

        public int LocationID { get; set; }

        [ForeignKey("LocationID")]
        public LocationsModel Locations { get; set; }
    }
}
