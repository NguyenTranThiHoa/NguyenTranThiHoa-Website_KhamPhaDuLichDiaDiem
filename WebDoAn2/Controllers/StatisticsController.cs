using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.Interfaces;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTotalLocations()
        {
            var totalLocations = await _statisticsService.GetTotalLocationsAsync();
            return Ok(totalLocations);
        }

        [HttpGet]
        public async Task<IActionResult> GetTotalTransport()
        {
            var totalTransport = await _statisticsService.GetTotalTransportAsync();
            return Ok(totalTransport);
        }

        [HttpGet]
        public async Task<IActionResult> GetTotalHotels()
        {
            var totalHotels = await _statisticsService.GetTotalHotelsAsync();
            return Ok(totalHotels);
        }

        [HttpGet]
        public async Task<IActionResult> GetTotalFoods()
        {
            var totalFoods = await _statisticsService.GetTotalFoodsAsync();
            return Ok(totalFoods);
        }

        [HttpGet]
        public async Task<IActionResult> GetStatisticsAsync()
        {
            var totalLocations = await _statisticsService.GetTotalLocationsAsync();
            var totalTransport = await _statisticsService.GetTotalTransportAsync();
            var totalHotels = await _statisticsService.GetTotalHotelsAsync();
            var totalFoods = await _statisticsService.GetTotalFoodsAsync();

            var result = new
            {
                totalLocations,
                totalTransport,
                totalHotels,
                totalFoods
            };

            return Ok(result);
        }

    }
}
