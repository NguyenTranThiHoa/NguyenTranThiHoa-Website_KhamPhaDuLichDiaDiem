using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDoAn2.Model
{
    public class UpdatePasswordModel
    {
        public int UserID { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
