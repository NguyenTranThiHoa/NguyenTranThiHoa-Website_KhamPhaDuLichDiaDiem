using System;

using WebDoAn2.DTO;

namespace WebDoAn2.DTO
{
    public class ReviewsDTO
    {
        public int? ReviewID { get; set; }
        public string? NoiDung { get; set; }
        public float? RatingReviews { get; set; }
        public DateTime? ReviewDate { get; set; }
        public int? UserID { get; set; }
        public int? LocationID { get; set; }
    }
}
