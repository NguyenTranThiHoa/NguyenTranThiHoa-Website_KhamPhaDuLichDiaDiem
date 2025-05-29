using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebDoAn2.Data;
using WebDoAn2.DTO;
using WebDoAn2.Exceptions;
using WebDoAn2.Interfaces;
using WebDoAn2.Model;

namespace WebDoAn2.Services
{
    public class HotelsService : IHotelsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public HotelsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelsDTO>> GetAllHotelsAsync()
        {
            try
            {
                //var hotels = await _context.Hotels.ToListAsync();
                //return _mapper.Map<IEnumerable<HotelsDTO>>(hotels);
                var hotels = await _context.Hotels
                           .Include(h => h.Locations)  // Thêm dòng này để lấy thông tin Location
                           .ToListAsync();
                return _mapper.Map<IEnumerable<HotelsDTO>>(hotels);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách khách sạn", ex);
            }
        }

        public async Task<HotelsDTO> GetHotelsByIdAsync(int id)
        {
            try
            {
                var hotel = await _context.Hotels.FirstOrDefaultAsync(h => h.HotelID == id);
                return hotel == null ? throw new NotFoundException("Không tìm thấy khách sạn") : _mapper.Map<HotelsDTO>(hotel);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thông tin khách sạn", ex);
            }
        }

        public async Task<HotelsDTO> CreateHotelsAsync(HotelsDTO hotels)
        {
            try { 
            
                if (string.IsNullOrWhiteSpace(hotels.NameHotel))
                throw new BadRequestException("Tên khách sạn không được để trống.");

                var locations1 = _mapper.Map<HotelsModel>(hotels);

                _context.Hotels.Add(locations1);
                await _context.SaveChangesAsync();

                hotels.HotelID = locations1.HotelID;

                return _mapper.Map<HotelsDTO>(locations1);
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
                throw new Exception("Có lỗi xảy ra khi tạo khách sạn mới" + ex.Message, ex);
            }
        }

        public async Task<HotelsDTO> UpdateHotelsAsync(int id, HotelsDTO hotels)
        {
            try
            {
                var hotel = await _context.Hotels.FindAsync(id)
                           ?? throw new NotFoundException("Không tìm thấy khách sạn");

                if (string.IsNullOrWhiteSpace(hotels.NameHotel))
                    throw new BadRequestException("Tên khách sạn không được để trống.");

                // Chỉ cập nhật các trường cần thiết
                hotel.NameHotel = hotels.NameHotel;
                hotel.PricePerNight = hotels.PricePerNight;
                hotel.RatingHotel = hotels.RatingHotel;
                hotel.DescriptionHotel = hotels.DescriptionHotel;
                hotel.ImageHotel = hotels.ImageHotel;

                await _context.SaveChangesAsync();
                return _mapper.Map<HotelsDTO>(hotel);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi cập nhật khách sạn", ex);
            }
        }

        //public async Task<HotelsDTO> UpdateHotelsAsync(int id, HotelsDTO hotels)
        //{
        //    if (string.IsNullOrWhiteSpace(hotels.NameHotel))
        //        throw new BadRequestException("Tên khách sạn không được để trống.");

        //    try
        //    {
        //        var hotel = await _context.Hotels.Include(h => h.Locations)
        //                                         .FirstOrDefaultAsync(h => h.HotelID == id)
        //                     ?? throw new NotFoundException("Không tìm thấy khách sạn");

        //        _mapper.Map(hotels, hotel);
        //        await _context.SaveChangesAsync();
        //        return _mapper.Map<HotelsDTO>(hotel);
        //    }
        //    catch (DbUpdateException dbEx)
        //    {
        //        throw new Exception("Lỗi cơ sở dữ liệu khi cập nhật khách sạn", dbEx);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Lỗi khi cập nhật khách sạn", ex);
        //    }
        //}

        public async Task<object> DeleteHotelsAsync(int id)
        {
            try
            {
                var hotel = await _context.Hotels.FindAsync(id)
                            ?? throw new NotFoundException("Không tìm thấy khách sạn");
                _context.Hotels.Remove(hotel);
                await _context.SaveChangesAsync();
                return new { message = "Xóa khách sạn thành công" };
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xóa khách sạn", ex);
            }
        }

        public async Task<string> UploadImageHotelsAsync(IFormFile imageFile)
        {
            if (imageFile.Length == 0 || !imageFile.ContentType.StartsWith("image"))
                throw new BadRequestException("File không hợp lệ hoặc không phải định dạng hình ảnh.");

            try
            {
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }
                var imageName = Path.GetRandomFileName() + Path.GetExtension(imageFile.FileName);
                var path = Path.Combine(uploadFolder, imageName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                return imageName;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tải lên ảnh", ex);
            }
        }
    }
}
