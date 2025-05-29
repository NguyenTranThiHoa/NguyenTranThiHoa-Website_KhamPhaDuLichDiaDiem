using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface ITransportTypeService
    {
        Task<IEnumerable<TransportTypesDTO>> GetAllTransportTypeAsync();
        Task<TransportTypesDTO> GetTransportTypeByIdAsync(int id);
        Task<TransportTypesDTO> CreateTransportTypeAsync(TransportTypesDTO transportTypes);
        Task<TransportTypesDTO> UpdateTransportTypeAsync(int id, TransportTypesDTO transportTypes);
        Task<object> DeleteTransportTypeAsync(int id);
    }
}
