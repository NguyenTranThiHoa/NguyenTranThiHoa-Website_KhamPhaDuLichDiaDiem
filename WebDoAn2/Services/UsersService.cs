using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;
using WebDoAn2.Model.Users;
using WebDoAn2.Services;

namespace WebDoAn2.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UsersService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UsersDTO>> GetAllUsersAsync()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return _mapper.Map<IEnumerable<UsersDTO>>(users);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy danh sách người dùng" + ex.Message, ex);
            }
        }

        public async Task<UsersDTO> GetUsersByIdAsync(int id)
        {
            try
            {
                var users = await _context.Users.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy người dùng");
                return _mapper.Map<UsersDTO>(users);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin người dùng" + ex.Message, ex);
            }
        }

        
        public async Task<UsersDTO> UpdateUsersRoleAsync(int id, UsersRoleModel usersRole)
        {
            try
            {
                var users = await _context.Users.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy người dùng");
                users.Role = usersRole.Role;
                await _context.SaveChangesAsync();
                return _mapper.Map<UsersDTO>(users);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi cập nhật người dùng" + ex.Message, ex);
            }
        }

        public async Task<UsersDTO> UpdateUsersAsync(int id, UpdateUsersModel updateUsers)
        {
            try
            {
                var users = await _context.Users.FirstOrDefaultAsync(c => c.UserID == id)
                        ?? throw new NotFoundException("Không tìm thấy người dùng");

                var existingCustomer = await _context.Users
                    .FirstOrDefaultAsync(c => (c.Phone == updateUsers.Phone || c.ImageUser == updateUsers.ImageUser) && c.UserID != id);

                if (existingCustomer != null)
                {
                    if (existingCustomer.Phone == updateUsers.Phone)
                        throw new BadRequestException("Số điện thoại đã được sử dụng.");
                }

                users.FullName = updateUsers.FullName;
                users.Phone = updateUsers.Phone;
                users.ImageUser = updateUsers.ImageUser;

                await _context.SaveChangesAsync();

                return _mapper.Map<UsersDTO>(users);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi cập nhật người dùng" + ex.Message, ex);
            }
        }

        public async Task<object> UpdatePasswordAsync(UpdatePasswordModel updatePasswordModel)
        {
            try
            {
                var users = await _context.Users.FindAsync(updatePasswordModel.UserID)
                    ?? throw new NotFoundException("Không tìm thấy người dùng");

                if (users.Password != updatePasswordModel.OldPassword) // Kiểm tra mật khẩu cũ không mã hóa
                {
                    throw new BadRequestException("Mật khẩu cũ không chính xác.");
                }

                users.Password = updatePasswordModel.NewPassword; // Không mã hóa mật khẩu
                await _context.SaveChangesAsync();

                return new { message = "Mật khẩu đã được thay đổi thành công!" };
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (BadRequestException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra trong quá trình cập nhật mật khẩu " + ex.Message, ex);
            }
        }

        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            try
            {
                string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }
                var imageName = imageFile.FileName.Replace(" ", "");
                var path = Path.Combine(uploadFolder, imageName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                return imageName;
            }
            catch (Exception ex)
            {

                throw new Exception("Có lỗi xảy ra khi thêm hình ảnh " + ex.Message, ex);
            }

        }
    }
}
