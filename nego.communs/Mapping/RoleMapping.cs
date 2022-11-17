using AutoMapper;
using nego.communs.Model;
using nego.communs.Resource;

namespace nego.communs.Mapping
{
    public class RoleMapping : Profile
    {
        public RoleMapping()
        {

            CreateMap<Role, RoleRessource>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            CreateMap<RoleRessource, Role>();
        }
    }
}
