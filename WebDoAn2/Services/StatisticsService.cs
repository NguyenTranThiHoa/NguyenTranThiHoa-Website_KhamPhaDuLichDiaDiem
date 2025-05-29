using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;
using WebDoAn2.Services;

namespace WebDoAn2.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StatisticsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Tính tổng số lượng địa điểm
        public async Task<int> GetTotalLocationsAsync()
        {
            return await _context.Locations.CountAsync();
        }

        // Tính tổng số lượng đánh giá
        public async Task<int> GetTotalTransportAsync()
        {
            return await _context.Transports.CountAsync();
        }

        // Tính tổng số lượng khách sạn
        public async Task<int> GetTotalHotelsAsync()
        {
            return await _context.Hotels.CountAsync();
        }

        // Tính tổng số lượng món ăn
        public async Task<int> GetTotalFoodsAsync()
        {
            return await _context.Specialties.CountAsync();
        }

        // Tính tổng tất cả các số lượng
        public async Task<int> GetStatisticsAsync()
        {
            var totalLocations = await GetTotalLocationsAsync();
            var totalTransport = await GetTotalTransportAsync();
            var totalHotels = await GetTotalHotelsAsync();
            var totalFoods = await GetTotalFoodsAsync();

            // Tổng hợp tất cả các số lượng
            int totalCount = totalLocations + totalTransport + totalHotels + totalFoods;
            return totalCount;
        }

    }
}
