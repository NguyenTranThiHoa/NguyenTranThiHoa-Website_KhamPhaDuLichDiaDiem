using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TransportsController : ControllerBase
    {
        private readonly ITransportsService _transportsService;

        public TransportsController(ITransportsService stransportsService)
        {
            _transportsService = stransportsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransports()
        {
            return Ok(await _transportsService.GetAllTransportsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransportsById(int id)
        {
            return Ok(await _transportsService.GetTransportsByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTransports([FromBody] TransportsDTO transports)
        {
            return Ok(await _transportsService.CreateTransportsAsync(transports));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            return Ok(new { ImagePath = await _transportsService.UploadImageTransportsAsync(imageFile) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTransports(int id, [FromBody] TransportsDTO transports)
        {
            return Ok(await _transportsService.UpdateTransportsAsync(id, transports));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTransports(int id)
        {
            return Ok(await _transportsService.DeleteTransportsAsync(id));
        }
    }
}
