using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Đăng nhập
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel authDto)
        {
            if (authDto == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            var response = await _authService.LoginAsync(authDto);
            return Ok(response);
        }

        // Đăng ký
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            if (registerModel == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            var response = await _authService.RegisterAsync(registerModel);
            return Ok(response);
        }

        // Gửi mã OPT
        [HttpPost]
        public async Task<IActionResult> SendVerificationCode([FromBody] SendMailModel sendMailModel)
        {
            try
            {
                return Ok(await _authService.SendEmailAsync(sendMailModel));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Quên mật khẩu
        [HttpPut]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel forgotPasswordModel)
        {
            if (forgotPasswordModel == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            return Ok(await _authService.ForgotPasswordAsync(forgotPasswordModel));
        }

        [HttpPost]
        public async Task<IActionResult> RefreshToken(RefreshTokenMolel refreshTokenModel)
        {
            if (refreshTokenModel == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }
            return Ok(await _authService.RefreshTokenAsync(refreshTokenModel));
        }
    }
}
