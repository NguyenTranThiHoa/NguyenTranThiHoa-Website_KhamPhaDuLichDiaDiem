using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface ILocationsService
    {
        Task<IEnumerable<LocationsDTO>> GetAllLocationsAsync();
        Task<LocationsDTO> GetLocationsByIdAsync(int id);
        Task<LocationsDTO> CreateLocationsAsync(LocationsDTO locations);
        Task<LocationsDTO> UpdateLocationsAsync(int id, LocationsDTO locations);
        Task<object> DeleteLocationsAsync(int id);
        Task<string> UploadImageAsync(IFormFile imageFile);
        Task<IEnumerable<LocationsDTO>> SearchLocationsAsync(string searchName);
    }
}
