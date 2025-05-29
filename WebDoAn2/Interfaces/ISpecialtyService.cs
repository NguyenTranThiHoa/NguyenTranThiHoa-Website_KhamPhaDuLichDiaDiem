using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface ISpecialtyService
    {
        Task<IEnumerable<SpecialtyDTO>> GetAllSpecialtyAsync();
        Task<SpecialtyDTO> GetSpecialtyByIdAsync(int id);
        Task<SpecialtyDTO> CreateSpecialtyAsync(SpecialtyDTO specialty);
        Task<SpecialtyDTO> UpdateSpecialtyAsync(int id, SpecialtyDTO specialty);
        Task<object> DeleteSpecialtyAsync(int id);
        Task<string> UploadImageSpecialtyAsync(IFormFile imageFile);
    }
}
