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
    public class TransportTypeService : ITransportTypeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TransportTypeService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TransportTypesDTO>> GetAllTransportTypeAsync()
        {
            try
            {
                var services = await _context.TransportTypes.ToListAsync();
                return _mapper.Map<IEnumerable<TransportTypesDTO>>(services);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy tất cả tên phân loại phương tiện", ex);
            }
        }

        public async Task<TransportTypesDTO> GetTransportTypeByIdAsync(int id)
        {
            try
            {
                var transportType = await _context.TransportTypes.FirstOrDefaultAsync(b => b.TransportTypeID == id);
                return transportType == null ? throw new NotFoundException("Không tìm thấy phương tiện") : _mapper.Map<TransportTypesDTO>(transportType);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi lấy thông tin tên phân loại di chuyển", ex);
            }
        }

        public async Task<TransportTypesDTO> CreateTransportTypeAsync(TransportTypesDTO transportType)
        {
            try
            {
                var transportType1 = _mapper.Map<TransportTypeModel>(transportType);

                _context.TransportTypes.Add(transportType1);
                await _context.SaveChangesAsync();

                transportType1.TransportTypeID = transportType1.TransportTypeID;

                return _mapper.Map<TransportTypesDTO>(transportType1);
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

        public async Task<TransportTypesDTO> UpdateTransportTypeAsync(int id, TransportTypesDTO transportTypeDTO)
        {
            try
            {
                var model = await _context.TransportTypes.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy phương tiện");

                if (string.IsNullOrWhiteSpace(transportTypeDTO.Name))
                {
                    throw new BadRequestException("Tên địa điểm không được để trống.");
                }

                model.Name = transportTypeDTO.Name;

                await _context.SaveChangesAsync();

                return _mapper.Map<TransportTypesDTO>(model);
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
                throw new Exception("Có lỗi xảy ra khi cập nhật tên phương tiện: " + ex.Message, ex);
            }
        }

        public async Task<object> DeleteTransportTypeAsync(int id)
        {
            try
            {
                var models = await _context.TransportTypes.FindAsync(id)
                    ?? throw new NotFoundException("Không tìm thấy tên phương tiện");

                _context.TransportTypes.Remove(models);
                await _context.SaveChangesAsync();

                return new { message = "Xóa tên phương tiện thành công!" };
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

    }
}
