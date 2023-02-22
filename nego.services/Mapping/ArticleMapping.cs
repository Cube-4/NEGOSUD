using AutoMapper;
using nego.communs.Model;
using nego.communs.Resource;

namespace nego.communs.Mapping
{
    public class ArticleMapping : Profile
    {
        public ArticleMapping()
        {
            CreateMap<Article, ArticleRessource>()
                .ForMember(ressource => ressource.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(ressource => ressource.UserId, opt => opt.MapFrom(src => src.UserId));

            CreateMap<ArticleRessource, Article>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));
        }
    }
}
