using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebDoAn2.DTO;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;
using WebDoAn2.Model;
using WebDoAn2.Model.Users;

namespace WebDoAn2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UsersDTO>>> GetUsers()
        {
            return Ok(await _usersService.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<UsersDTO>> GetUsersById(int id)
        {
            return Ok(await _usersService.GetUsersByIdAsync(id));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<UsersDTO>> UpdateUsers(int id, [FromBody] UpdateUsersModel updateUsers)
        {
            return Ok(await _usersService.UpdateUsersAsync(id, updateUsers));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UsersDTO>> UpdateUsersRole(int id, [FromBody] UsersRoleModel usersRole)
        {
            return Ok(await _usersService.UpdateUsersRoleAsync(id, usersRole));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordModel updatePassword)
        {
            if (updatePassword == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            return Ok(await _usersService.UpdatePasswordAsync(updatePassword));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            return Ok(new { ImagePath = await _usersService.UploadImageAsync(imageFile) });
        }

    }
}
