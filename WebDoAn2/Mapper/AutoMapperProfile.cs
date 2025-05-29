using AutoMapper;
using WebDoAn2.Model;  
using WebDoAn2.DTO;

namespace WebDoAn2.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {

            CreateMap<UsersModel, UsersDTO>();
            CreateMap<LocationsModel, LocationsDTO>().ReverseMap();
            CreateMap<HotelsModel, HotelsDTO>().ReverseMap();
            CreateMap<SpecialtiesModel, SpecialtyDTO>().ReverseMap();
            CreateMap<ReviewsModel, ReviewsDTO>().ReverseMap();
            CreateMap<TransportsModel, TransportsDTO>().ReverseMap();
            CreateMap<SlideModel, SlideDTO>().ReverseMap();
            CreateMap<TransportTypeModel, TransportTypesDTO>().ReverseMap();
        }
    }
}
