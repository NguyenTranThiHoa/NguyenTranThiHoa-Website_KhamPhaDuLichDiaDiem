using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using WebDoAn2.Data;
using WebDoAn2.Interfaces;

using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using WebDoAn2.Model;

using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace WebDoAn2.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<TokenResponseModel> LoginAsync(LoginModel loginModel)
        {
            try
            {
                var users = await _context.Users
                    .FirstOrDefaultAsync(c => c.Username == loginModel.Username);

                if (users == null || users.Password != loginModel.Password)
                {
                    throw new BadRequestException("Tên đăng nhập hoặc mật khẩu không đúng.");
                }
                var accessToken = GenerateAccessToken(users);
                var refreshToken = GenerateRefreshToken(users);

                users.RefreshToken = refreshToken;
                users.RefreshTokenExpiry = DateTime.UtcNow.AddDays(1);

                await _context.SaveChangesAsync();

                return new TokenResponseModel
                {
                    UserID = users.UserID,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    Role = users.Role
                };
            }
            catch (BadRequestException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra trong quá trình đăng nhập" + ex.Message, ex);
            }
        }

        public async Task<object> RegisterAsync(RegisterModel registerModel)
        {
            try
            {
                var existingUsers = await _context.Users
                    .FirstOrDefaultAsync(c => c.Username == registerModel.Username ||
                                              c.Email == registerModel.Email);

                if (existingUsers != null)
                {
                    if (existingUsers.Username == registerModel.Username)
                        throw new BadRequestException("Tên đăng nhập đã tồn tại.");
                    if (existingUsers.Email == registerModel.Email)
                        throw new BadRequestException("Email đã được sử dụng.");
                }

               // Gán Role mặc định là "User" nếu chưa được chỉ định
               var userRole = string.IsNullOrEmpty(registerModel.Role) ? "User" : registerModel.Role;

                var users = new UsersModel
                {
                    FullName = registerModel.FullName,
                    Email = registerModel.Email,
                    Phone = registerModel.Phone,
                    Username = registerModel.Username,
                    Password = registerModel.Password, // Không mã hóa mật khẩu
                    Role = userRole,
                };

                _context.Users.Add(users);
                await _context.SaveChangesAsync();

                return new { message = "Đăng kí tài khoản thành công!" };
            }
            catch (BadRequestException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra trong quá trình đăng ký " + ex.Message, ex);
            }
        }

        //public async Task<object> RegisterAsync(RegisterModel registerModel)
        //{
        //    try
        //    {
        //        // Kiểm tra dữ liệu đầu vào
        //        if (string.IsNullOrEmpty(registerModel.FullName) ||
        //            string.IsNullOrEmpty(registerModel.Email) ||
        //            string.IsNullOrEmpty(registerModel.Username) ||
        //            string.IsNullOrEmpty(registerModel.Password)) 
        //        {
        //            throw new BadRequestException("Tất cả các trường đều phải được điền.");
        //        }

        //        var existingUsers = await _context.Users
        //            .FirstOrDefaultAsync(c => c.Username == registerModel.Username ||
        //                                      c.Email == registerModel.Email);

        //        if (existingUsers != null)
        //        {
        //            if (existingUsers.Username == registerModel.Username)
        //                throw new BadRequestException("Tên đăng nhập đã tồn tại.");
        //            if (existingUsers.Email == registerModel.Email)
        //                throw new BadRequestException("Email đã được sử dụng.");
        //        }

        //        // Gán Role mặc định là "User" nếu chưa được chỉ định
        //        var userRole = string.IsNullOrEmpty(registerModel.Role) ? "User" : registerModel.Role;

        //        var users = new UsersModel
        //        {
        //            FullName = registerModel.FullName,
        //            Email = registerModel.Email,
        //            Phone = registerModel.Phone,
        //            Username = registerModel.Username,
        //            Password = registerModel.Password, // Không mã hóa mật khẩu
        //            Role = userRole,
        //        };

        //        _context.Users.Add(users);
        //        await _context.SaveChangesAsync();

        //        return new { message = "Đăng kí tài khoản thành công!" };
        //    }
        //    catch (BadRequestException)
        //    {
        //        throw;
        //    }
        //    catch (DbUpdateException dbEx) // Bắt lỗi liên quan đến cơ sở dữ liệu
        //    {
        //        throw new Exception("Có lỗi xảy ra khi lưu người dùng vào cơ sở dữ liệu: " + dbEx.InnerException?.Message, dbEx);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Có lỗi xảy ra trong quá trình đăng ký: " + ex.Message, ex);
        //    }
        //}

        public async Task<object> ForgotPasswordAsync(ForgotPasswordModel forgotPasswordModel)
        {
            try
            {
                var users = await _context.Users.FirstOrDefaultAsync(c => c.Email == forgotPasswordModel.Email)
                    ?? throw new NotFoundException("Không tìm thấy người dùng");

                users.Password = forgotPasswordModel.NewPassword; // Không mã hóa mật khẩu
                await _context.SaveChangesAsync();

                return new { message = "Mật khẩu đã được thay đổi thành công!" };
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra trong quá trình cập nhật mật khẩu " + ex.Message, ex);
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

        public async Task<object> SendEmailAsync(SendMailModel sendMailModel)
        {
            try
            {
                var code = GenerateVerificationCode();

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("bapansaulun2528@gmail.com", "bpfc jhls maeg tnja"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("bapansaulun2528@gmail.com"),
                    Subject = "DU LỊCH THỊ HÒA - Mã xác nhận của bạn",
                    Body = $"<p>Mã xác nhận của bạn là: <strong>{code}</strong><br></p><p>Mã này chỉ tồn tại trong 3 phút.</p>",
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(sendMailModel.Email);

                await smtpClient.SendMailAsync(mailMessage);

                return new { verificationCode = code };
            }
            catch (SmtpException smtpEx)
            {
                throw new Exception("Có lỗi xảy ra khi gửi email: " + smtpEx.Message, smtpEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi gửi email: " + ex.Message, ex);
            }
        }

        public async Task<TokenResponseModel> RefreshTokenAsync(RefreshTokenMolel refreshTokenModel)
        {
            try
            {
                if (string.IsNullOrEmpty(refreshTokenModel.RefreshToken))
                {
                    throw new BadRequestException("Refresh Token không hợp lệ.");
                }
                var users = await _context.Users.FirstOrDefaultAsync(c => c.RefreshToken == refreshTokenModel.RefreshToken);

                if (users == null || users.RefreshTokenExpiry < DateTime.UtcNow)
                {
                    throw new BadRequestException("Refresh Token không hợp lệ hoặc đã hết hạn.");
                }

                var newAccessToken = GenerateAccessToken(users);

                return new TokenResponseModel
                {
                    UserID = users.UserID,
                    AccessToken = newAccessToken,
                    RefreshToken = refreshTokenModel.RefreshToken,
                    Role = users.Role
                };
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

        private string GenerateAccessToken(UsersModel users)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, users.UserID.ToString()),
                new Claim(ClaimTypes.Role, users.Role),
                new Claim(ClaimTypes.DateOfBirth, DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"))
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken(UsersModel users)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, users.UserID.ToString()),
                new Claim(ClaimTypes.Role, users.Role),
                new Claim(ClaimTypes.DateOfBirth, DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"))
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateVerificationCode()
        {
            Random random = new Random();
            return random.Next(1000, 10000).ToString("D4");
        }
    }
}

