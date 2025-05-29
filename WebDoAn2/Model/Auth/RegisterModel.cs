using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDoAn2.Model
{
    public class RegisterModel
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Phone {  get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
