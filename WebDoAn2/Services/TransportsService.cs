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
    public class TransportsService : ITransportsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TransportsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TransportsDTO>> GetAllTransportsAsync()
        {
            try
            {
                var services = await _context.Transports
                              .Include(h => h.Locations)
                              .Include(h => h.TransportType) // Thêm Include cho TransportType
                              .ToListAsync();
                return _mapper.Map<IEnumerable<TransportsDTO>>(services);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy tất cả phương tiện", ex);
            }
        }

        public async Task<TransportsDTO> GetTransportsByIdAsync(int id)
        {
            try
            {
                var transports = await _context.Transports.FirstOrDefaultAsync(b => b.TransportID == id);
                return transports == null ? throw new NotFoundException("Không tìm thấy phương tiện") : _mapper.Map<TransportsDTO>(transports);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin phương tiện", ex);
            }
        }

        public async Task<TransportsDTO> CreateTransportsAsync(TransportsDTO transports)
        {
            try
            {
                var transports1 = _mapper.Map<TransportsModel>(transports);

                _context.Transports.Add(transports1);
                await _context.SaveChangesAsync();

                transports1.TransportID = transports1.TransportID;

                return _mapper.Map<TransportsDTO>(transports1);
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
                throw new Exception("Có lỗi xảy ra khi tạo phương tiện mới" + ex.Message, ex);
            }
        }

        public async Task<TransportsDTO> UpdateTransportsAsync(int id, TransportsDTO transportsDTO)
        {
            try
            {
                var transports = await _context.Transports.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy phương tiện");

                transports.TransportTypeID = transportsDTO.TransportTypeID;
                transports.DescriptionTransports = transportsDTO.DescriptionTransports;
                transports.ContactTransports = transportsDTO.ContactTransports;
                transports.PriceRange = transportsDTO.PriceRange;
                transports.ImageUrl = transportsDTO.ImageUrl;

                await _context.SaveChangesAsync();

                return _mapper.Map<TransportsDTO>(transports);
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
                throw new Exception("Có lỗi xảy ra khi cập nhật phương tiện: " + ex.Message, ex);
            }
        }

        public async Task<object> DeleteTransportsAsync(int id)
        {
            try
            {
                var transports = await _context.Transports.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy phương tiện");

                _context.Transports.Remove(transports);
                await _context.SaveChangesAsync();

                return new { message = "Xóa phương tiện thành công!" };
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi xóa phương tiện " + ex.Message, ex);
            }
        }


        public async Task<string> UploadImageTransportsAsync(IFormFile imageFile)
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
