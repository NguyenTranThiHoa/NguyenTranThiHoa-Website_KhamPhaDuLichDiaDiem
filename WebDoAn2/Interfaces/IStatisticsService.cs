using WebDoAn2.Model;
using WebDoAn2.Model.Statistics;

namespace WebDoAn2.Interfaces
{
    public interface IStatisticsService
    {
        Task<int> GetStatisticsAsync();
        Task<int> GetTotalLocationsAsync();
        Task<int> GetTotalTransportAsync();
        Task<int> GetTotalHotelsAsync();
        Task<int> GetTotalFoodsAsync();
    }
}

