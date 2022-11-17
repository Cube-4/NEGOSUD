using AutoMapper;
using nego.communs.Model;

namespace nego.communs.Mapping
{
    public class OrderMapping: Profile
    {
        public OrderMapping()
        {
            CreateMap<Order, OrderRessource>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            CreateMap<OrderRessource, Order>();
        }
    }
}