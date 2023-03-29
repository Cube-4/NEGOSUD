using AutoMapper;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;

namespace nego.communs.Mapping
{
    public class ArticleMapping : Profile
    {
        public ArticleMapping()
        {
            CreateMap<Article, ArticleRessource>()
                .ForMember(ressource => ressource.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(ressource => ressource.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(ressource => ressource.Orders, opt => opt.MapFrom(src => src.Orders
                .Where(dest => dest.ArticleId == src.Id)
                .Select( a => new OrderRessource
                {
                    Id = a.OrderId,
                    OrderName = a.Order.OrderName,
                    OrderDate = a.Order.OrderDate,
                    ReferenceName = a.Order.ReferenceName,
                    OrderStatus = a.Order.OrderStatus,
                    UserId = a.Order.UserId,
                })));

            CreateMap<ArticleRessource, Article>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));
        }
    }
}
