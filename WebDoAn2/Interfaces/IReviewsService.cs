using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface IReviewsService
    {
        Task<IEnumerable<ReviewsDTO>> GetAllReviewsAsync();
        Task<ReviewsDTO> GetReviewsByIdAsync(int id);
        Task<IEnumerable<ReviewsDTO>> GetReviewsByLocationIdAsync(int locationId); // Thêm phương thức mới
        Task<ReviewsDTO> CreateReviewsAsync(ReviewsDTO reviews);
        Task<ReviewsDTO> UpdateReviewsAsync(int id, ReviewsDTO reviews);
        Task<object> DeleteReviewsAsync(int id);
        Task<IEnumerable<DailyReviewStatsDTO>> GetReviewStatsByYearAsync(int year);
    }
}
