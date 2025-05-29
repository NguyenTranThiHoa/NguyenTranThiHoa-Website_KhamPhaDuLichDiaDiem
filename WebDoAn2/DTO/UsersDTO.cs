using System.ComponentModel.DataAnnotations;
using WebDoAn2.Model;

namespace WebDoAn2.DTO
{
    public class UsersDTO
    {
        public int? UserID { get; set; }
        public string? Username { get; set; }

        public string? Password { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; }
        public string? ImageUser { get; set; }
    
    }
}
