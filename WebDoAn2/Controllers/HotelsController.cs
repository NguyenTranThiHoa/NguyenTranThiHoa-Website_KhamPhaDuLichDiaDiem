using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelsService _hotelsService;

        public HotelsController(IHotelsService hotelsService)
        {
            _hotelsService = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHotels()
        {
            return Ok(await _hotelsService.GetAllHotelsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelsById(int id)
        {
            return Ok(await _hotelsService.GetHotelsByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateHotels([FromBody] HotelsDTO hotels)
        {
            return Ok(await _hotelsService.CreateHotelsAsync(hotels));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            return Ok(new { ImagePath = await _hotelsService.UploadImageHotelsAsync(imageFile) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateHotels(int id, [FromBody] HotelsDTO  hotels)
        {
            return Ok(await _hotelsService.UpdateHotelsAsync(id, hotels));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteHotels(int id)
        {
            return Ok(await _hotelsService.DeleteHotelsAsync(id));
        }
    }
}
