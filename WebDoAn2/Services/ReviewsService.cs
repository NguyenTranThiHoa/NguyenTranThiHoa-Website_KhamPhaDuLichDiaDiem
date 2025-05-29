using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;

namespace WebDoAn2.Services
{
    public class ReviewsService : IReviewsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ReviewsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReviewsDTO>> GetAllReviewsAsync()
        {
            try
            {
                var services = await _context.Reviews.ToListAsync();
                return _mapper.Map<IEnumerable<ReviewsDTO>>(services);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy tất cả đánh giá", ex);
            }
        }

        public async Task<ReviewsDTO> GetReviewsByIdAsync(int id)
        {
            try
            {
                var reviews = await _context.Reviews.FirstOrDefaultAsync(b => b.ReviewID == id);
                return reviews == null ? throw new NotFoundException("Không tìm thấy đánh giá nào") : _mapper.Map<ReviewsDTO>(reviews);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin đánh giá", ex);
            }
        }

        public async Task<IEnumerable<ReviewsDTO>> GetReviewsByLocationIdAsync(int locationId)
        {
            try
            {
                var reviews = await _context.Reviews
                    .Where(r => r.LocationID == locationId)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<ReviewsDTO>>(reviews);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy đánh giá theo LocationID", ex);
            }
        }

        public async Task<ReviewsDTO> CreateReviewsAsync(ReviewsDTO reviews)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(reviews.NoiDung))
                {
                    throw new BadRequestException("Nội dung đánh giá không được để trống.");
                }

                var reviewsEntity = _mapper.Map<ReviewsModel>(reviews);
                reviewsEntity.ReviewDate = DateTime.UtcNow;

                _context.Reviews.Add(reviewsEntity);
                await _context.SaveChangesAsync();

                reviews.ReviewID = reviewsEntity.ReviewID;

                return _mapper.Map<ReviewsDTO>(reviewsEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi tạo đánh giá mới: " + ex.Message, ex);
            }
        }

        public async Task<ReviewsDTO> UpdateReviewsAsync(int id, ReviewsDTO reviewsDTO)
        {
            try
            {
                var reviews = await _context.Reviews.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy đánh giá");

                if (string.IsNullOrWhiteSpace(reviewsDTO.NoiDung))
                {
                    throw new BadRequestException("Nội dung đánh giá không được để trống.");
                }

                reviews.NoiDung = reviewsDTO.NoiDung;
                reviews.RatingReviews = reviewsDTO.RatingReviews;
                reviews.ReviewDate = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return _mapper.Map<ReviewsDTO>(reviews);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi cập nhật đánh giá: " + ex.Message, ex);
            }
        }

        public async Task<object> DeleteReviewsAsync(int id)
        {
            try
            {
                var reviews = await _context.Reviews.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy đánh giá");

                _context.Reviews.Remove(reviews);
                await _context.SaveChangesAsync();

                return new { message = "Xóa đánh giá thành công!" };
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi xóa đánh giá: " + ex.Message, ex);
            }
        }

        public async Task<IEnumerable<DailyReviewStatsDTO>> GetReviewStatsByYearAsync(int year)
        {
            try
            {
                var stats = await _context.Reviews
                    .Where(r => r.ReviewDate.HasValue && r.ReviewDate.Value.Year == year)
                    .GroupBy(r => r.ReviewDate.Value.Date)
                    .Select(g => new DailyReviewStatsDTO
                    {
                        Date = g.Key,
                        TotalReviews = g.Count()
                    })
                    .OrderBy(s => s.Date)
                    .ToListAsync();

                return stats;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thống kê đánh giá", ex);
            }
        }

    }
}
