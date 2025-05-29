using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TransportTypeController : ControllerBase
    {
        private readonly ITransportTypeService _transportTypeService;

        public TransportTypeController(ITransportTypeService transportTypeService)
        {
            _transportTypeService = transportTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransportType()
        {
            return Ok(await _transportTypeService.GetAllTransportTypeAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransportTypeById(int id)
        {
            return Ok(await _transportTypeService.GetTransportTypeByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTransportType([FromBody] TransportTypesDTO transportTypes)
        {
            return Ok(await _transportTypeService.CreateTransportTypeAsync(transportTypes));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTransportType(int id, [FromBody] TransportTypesDTO transportTypes)
        {
            return Ok(await _transportTypeService.UpdateTransportTypeAsync(id, transportTypes));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTransportType(int id)
        {
            return Ok(await _transportTypeService.DeleteTransportTypeAsync(id));
        }
    }
}
