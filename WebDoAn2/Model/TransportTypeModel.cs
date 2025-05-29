using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebDoAn2.Model
{
    public class TransportTypeModel
    {
        [Key]
        public int TransportTypeID { get; set; }
        public string? Name { get; set; }
    }

}
