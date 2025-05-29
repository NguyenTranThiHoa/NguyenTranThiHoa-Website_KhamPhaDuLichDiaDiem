using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface IHotelsService
    {
        Task<IEnumerable<HotelsDTO>> GetAllHotelsAsync();
        Task<HotelsDTO> GetHotelsByIdAsync(int id);
        Task<HotelsDTO> CreateHotelsAsync(HotelsDTO hotels);
        Task<HotelsDTO> UpdateHotelsAsync(int id, HotelsDTO hotels);
        Task<object> DeleteHotelsAsync(int id);
        Task<string> UploadImageHotelsAsync(IFormFile imageFile);
    }
}


