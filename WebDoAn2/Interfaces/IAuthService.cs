using WebDoAn2.Model;
using WebDoAn2.DTO;

namespace WebDoAn2.Interfaces
{
    public interface IAuthService
    {
        Task<TokenResponseModel> LoginAsync(LoginModel loginModel);
        Task<object> RegisterAsync(RegisterModel registerModel);
        Task<object> SendEmailAsync(SendMailModel sendMailModel);
        Task<object> ForgotPasswordAsync(ForgotPasswordModel forgotPasswordModel);
        Task<TokenResponseModel> RefreshTokenAsync(RefreshTokenMolel refreshTokenModel);

    }
}
