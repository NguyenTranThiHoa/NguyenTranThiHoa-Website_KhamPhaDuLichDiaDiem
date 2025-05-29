using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LocationsController :ControllerBase
    {
        private readonly ILocationsService _locationsService;

        public LocationsController(ILocationsService locationsService)
        {
            _locationsService = locationsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            return Ok(await _locationsService.GetAllLocationsAsync());
        }

        [HttpGet("{searchName}")]
        public async Task<IActionResult> SearchLocations(string searchName)
        {
            Console.WriteLine($"Searching for: {searchName}");
            return Ok(await _locationsService.SearchLocationsAsync(searchName));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocationsById(int id)
        {
            return Ok(await _locationsService.GetLocationsByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateLocations([FromBody] LocationsDTO locations)
        {
            return Ok(await _locationsService.CreateLocationsAsync(locations));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            return Ok(new { ImagePath = await _locationsService.UploadImageAsync(imageFile) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLocations(int id, [FromBody] LocationsDTO locations)
        {
            return Ok(await _locationsService.UpdateLocationsAsync(id, locations));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLocations(int id)
        {
            return Ok(await _locationsService.DeleteLocationsAsync(id));
        }
    }
}