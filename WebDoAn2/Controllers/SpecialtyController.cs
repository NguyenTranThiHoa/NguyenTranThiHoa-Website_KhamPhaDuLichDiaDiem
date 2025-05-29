using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SpecialtyController : ControllerBase
    {
        private readonly ISpecialtyService _specialtyService;
        private readonly ApplicationDbContext _context;  // Thêm DbContext

        public SpecialtyController(ISpecialtyService specialtyService, ApplicationDbContext context)
        {
            _specialtyService = specialtyService;
            _context = context;  // Khởi tạo DbContext
        }

        [HttpGet]
        public async Task<IActionResult> GetSpecialty()
        {
            var result = await _specialtyService.GetAllSpecialtyAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialtyById(int id)
        {
            return Ok(await _specialtyService.GetSpecialtyByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSpecialty([FromBody] SpecialtyDTO specialty)
        {
            return Ok(await _specialtyService.CreateSpecialtyAsync(specialty));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            return Ok(new { ImagePath = await _specialtyService.UploadImageSpecialtyAsync(imageFile) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSpecialty(int id, [FromBody] SpecialtyDTO specialty)
        {
            return Ok(await _specialtyService.UpdateSpecialtyAsync(id, specialty));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSpecialty(int id)
        {
            return Ok(await _specialtyService.DeleteSpecialtyAsync(id));
        }
    }
}
