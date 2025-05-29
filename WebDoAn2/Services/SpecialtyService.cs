using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;
using WebDoAn2.Services;

namespace WebDoAn2.Services
{
    public class SpecialtyService : ISpecialtyService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SpecialtyService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SpecialtyDTO>> GetAllSpecialtyAsync()
        {
            try
            {
                var services = await _context.Specialties.ToListAsync();
                return _mapper.Map<IEnumerable<SpecialtyDTO>>(services);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy tất cả món ăn", ex);
            }
        }

        public async Task<SpecialtyDTO> GetSpecialtyByIdAsync(int id)
        {
            try
            {
                var specialties = await _context.Specialties.FirstOrDefaultAsync(b => b.SpecialtyID == id);
                return specialties == null ? throw new NotFoundException("Không tìm thấy món ăn") : _mapper.Map<SpecialtyDTO>(specialties);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin món ăn", ex);
            }
        }

        public async Task<SpecialtyDTO> CreateSpecialtyAsync(SpecialtyDTO specialties)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(specialties.NameFood))
                {
                    throw new BadRequestException("Tên món ăn không được để trống.");
                }

                var specialties1 = _mapper.Map<SpecialtiesModel>(specialties);

                _context.Specialties.Add(specialties1);
                await _context.SaveChangesAsync();

                specialties.SpecialtyID = specialties1.SpecialtyID;

                return _mapper.Map<SpecialtyDTO>(specialties1);
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
                throw new Exception("Có lỗi xảy ra khi tạo món ăn mới" + ex.Message, ex);
            }
        }

        public async Task<SpecialtyDTO> UpdateSpecialtyAsync(int id, SpecialtyDTO specialtyDTO)
        {
            try
            {
                var specialties = await _context.Specialties.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy món ăn");

                if (string.IsNullOrWhiteSpace(specialtyDTO.NameFood))
                {
                    throw new BadRequestException("Tên món ăn không được để trống.");
                }

                specialties.NameFood = specialtyDTO.NameFood;
                specialties.DescriptionFood = specialtyDTO.DescriptionFood;
                specialties.ImageUrlFood = specialtyDTO.ImageUrlFood;
                specialties.RatingFood = specialtyDTO.RatingFood;  // Sửa đúng trường

                await _context.SaveChangesAsync();

                return _mapper.Map<SpecialtyDTO>(specialties);
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
                throw new Exception("Có lỗi xảy ra khi cập nhật món ăn: " + ex.Message, ex);
            }
        }


        public async Task<object> DeleteSpecialtyAsync(int id)
        {
            try
            {
                var specialties = await _context.Specialties.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy món ăn");

                _context.Specialties.Remove(specialties);
                await _context.SaveChangesAsync();

                return new { message = "Xóa món ăn thành công!" };
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi xóa món ăn " + ex.Message, ex);
            }
        }


        public async Task<string> UploadImageSpecialtyAsync(IFormFile imageFile)
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
