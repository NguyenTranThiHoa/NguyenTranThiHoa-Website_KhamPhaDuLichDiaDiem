using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewsService _reviewsService;

        public ReviewsController(IReviewsService reviewsService)
        {
            _reviewsService = reviewsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            return Ok(await _reviewsService.GetAllReviewsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewsById(int id)
        {
            return Ok(await _reviewsService.GetReviewsByIdAsync(id));
        }

        [HttpGet("ByLocation/{locationId}")]
        public async Task<IActionResult> GetReviewsByLocationId(int locationId)
        {
            var reviews = await _reviewsService.GetReviewsByLocationIdAsync(locationId);
            return Ok(reviews);
        }

        [HttpPost]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> CreateReviews([FromBody] ReviewsDTO reviews)
        {
            return Ok(await _reviewsService.CreateReviewsAsync(reviews));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateReviews(int id, [FromBody] ReviewsDTO reviews)
        {
            return Ok(await _reviewsService.UpdateReviewsAsync(id, reviews));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteReviews(int id)
        {
            return Ok(await _reviewsService.DeleteReviewsAsync(id));
        }

        [HttpGet("{year}")]
        public async Task<IActionResult> GetReviewStatsByYear(int year)
        {
            var stats = await _reviewsService.GetReviewStatsByYearAsync(year);
            return Ok(stats);
        }
    }
}
