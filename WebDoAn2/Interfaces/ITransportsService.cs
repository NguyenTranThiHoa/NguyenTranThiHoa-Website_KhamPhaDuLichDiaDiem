using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface ITransportsService
    {
        Task<IEnumerable<TransportsDTO>> GetAllTransportsAsync();
        Task<TransportsDTO> GetTransportsByIdAsync(int id);
        Task<TransportsDTO> CreateTransportsAsync(TransportsDTO transports);
        Task<TransportsDTO> UpdateTransportsAsync(int id, TransportsDTO transports);
        Task<object> DeleteTransportsAsync(int id);
        Task<string> UploadImageTransportsAsync(IFormFile imageFile);
    }
}
