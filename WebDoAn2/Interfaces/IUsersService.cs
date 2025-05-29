using WebDoAn2.DTO;
using WebDoAn2.Model;
using WebDoAn2.Model.Users;

namespace WebDoAn2.Interfaces
{
    public interface IUsersService
    {
        Task<IEnumerable<UsersDTO>> GetAllUsersAsync();
        Task<UsersDTO> GetUsersByIdAsync(int id);
        Task<object> UpdatePasswordAsync(UpdatePasswordModel updatePasswordModel);
        Task<UsersDTO> UpdateUsersAsync(int id, UpdateUsersModel updateUsers);
        Task<UsersDTO> UpdateUsersRoleAsync(int id, UsersRoleModel usersRole);
        Task<string> UploadImageAsync(IFormFile imageFile);
    }
}
