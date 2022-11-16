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
    public class ClientMapping : Profile
    {
        public ClientMapping()
        {
            CreateMap<Client, ClientRessource>()
                .ForMember(clientRessources => clientRessources.Id, opt => opt.MapFrom(client => client.Id));
            
            CreateMap<ClientRessource, Client>();
        }
    }
}
