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
    public class LocationsService : ILocationsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LocationsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LocationsDTO>> GetAllLocationsAsync()
        {
            try
            {
                var services = await _context.Locations.ToListAsync();
                return _mapper.Map<IEnumerable<LocationsDTO>>(services);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy tất cả địa điểm", ex);
            }
        }

        public async Task<LocationsDTO> GetLocationsByIdAsync(int id)
        {
            try
            {
                var book = await _context.Locations.FirstOrDefaultAsync(b => b.LocationID == id);
                return book == null ? throw new NotFoundException("Không tìm thấy địa điểm") : _mapper.Map<LocationsDTO>(book);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin địa điểm", ex);
            }
        }

        public async Task<LocationsDTO> CreateLocationsAsync(LocationsDTO locations)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(locations.Name))
                {
                    throw new BadRequestException("Tên địa điểm không được để trống.");
                }

                var locations1 = _mapper.Map<LocationsModel>(locations);

                _context.Locations.Add(locations1);
                await _context.SaveChangesAsync();

                locations.LocationID = locations1.LocationID;

                return _mapper.Map<LocationsDTO>(locations1);
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
                throw new Exception("Có lỗi xảy ra khi tạo địa điểm mới" + ex.Message, ex);
            }
        }

        public async Task<LocationsDTO> UpdateLocationsAsync(int id, LocationsDTO locationsDTO)
        {
            try
            {
                var location = await _context.Locations.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy địa điểm");

                if (string.IsNullOrWhiteSpace(locationsDTO.Name))
                {
                    throw new BadRequestException("Tên địa điểm không được để trống.");
                }

                location.Name = locationsDTO.Name;
                location.Description = locationsDTO.Description;
                location.City = locationsDTO.City;
                location.Province = locationsDTO.Province;  // Sửa đúng trường
                location.ImageUrl = locationsDTO.ImageUrl; // Đúng tên trường
                location.Rating = locationsDTO.Rating;
                location.PublishedDate = locationsDTO.PublishedDate;

                await _context.SaveChangesAsync();

                return _mapper.Map<LocationsDTO>(location);
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
                throw new Exception("Có lỗi xảy ra khi cập nhật địa điểm: " + ex.Message, ex);
            }
        }


        public async Task<object> DeleteLocationsAsync(int id)
        {
            try
            {
                var locations = await _context.Locations.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy địa điểm");

                _context.Locations.Remove(locations);
                await _context.SaveChangesAsync();

                return new { message = "Xóa địa điểm thành công!" };
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi xóa địa điểm " + ex.Message, ex);
            }
        }


        public async Task<string> UploadImageAsync(IFormFile imageFile)
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

        public async Task<IEnumerable<LocationsDTO>> SearchLocationsAsync(string searchName)
        {
            try
            {
                var resultLocations = await _context.Locations
                                         .Where(b => b.Name.Contains(searchName) || b.Province.Contains(searchName) || b.City.Contains(searchName))
                                         .AsNoTracking()
                                         .ToListAsync();
                return _mapper.Map<IEnumerable<LocationsDTO>>(resultLocations);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi khi lấy địa điểm liên quan", ex);
            }
        }

    }
}
