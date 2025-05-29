using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebDoAn2.Model
{
    public class SlideModel
    {
        [Key]
        public int SlideID { get; set; }

        public string? SlideImage { get; set; }
    }
}
