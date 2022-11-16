using AutoMapper;
using nego.communs.Model;
using nego.communs.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Mapping
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<User, UserRessource>()
                .ForMember(clientRessources => clientRessources.Id, opt => opt.MapFrom(user => user.Id));
            
            CreateMap<UserRessource, User>();
        }
    }
}
