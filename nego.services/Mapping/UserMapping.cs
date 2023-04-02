using AutoMapper;
using nego.communs.Model;
using nego.communs.Resource;
using nego.communs.Resource.Other;

namespace nego.communs.Mapping
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<User, UserRessource>()
                .ForMember(clientRessources => clientRessources.Id, opt => opt.MapFrom(user => user.Id))
                .ForMember(clientRessources => clientRessources.Password, opt => opt.Ignore())
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles
                    .Where(ru => ru.UserId == src.Id)
                    .Select(ru => ru.RoleId)
                ));

            CreateMap<UserRessource, User>()
                .ForMember(x => x.Roles, opt => opt.Ignore())
                .AfterMap((userRessource, user) =>
                {
                    var removedRoles = user.Roles
                        .Where(ur => !userRessource.Roles.Contains(ur.Id));
                    foreach (var item in removedRoles)
                    {
                        user.Roles.Remove(item);
                    }
                    var addedRole = userRessource.Roles
                        .Where(roleId => user.Roles.All(ur => ur.RoleId != roleId))
                        .Select(id => new RoleUser { RoleId = id }).ToList();
                    foreach (var item in addedRole)
                    {
                        user.Roles.Add(item);
                    }
                });

            CreateMap<UserCreationDTO, User>()
                .ForMember(x => x.Roles, opt => opt.Ignore())
                .AfterMap((userRessource, user) =>
                {
                    var removedRoles = user.Roles
                        .Where(ur => !userRessource.Roles.Contains(ur.Id));
                    foreach (var item in removedRoles)
                    {
                        user.Roles.Remove(item);
                    }
                    var addedRole = userRessource.Roles
                        .Where(roleId => user.Roles.All(ur => ur.RoleId != roleId))
                        .Select(id => new RoleUser { RoleId = id }).ToList();
                    foreach (var item in addedRole)
                    {
                        user.Roles.Add(item);
                    }
                });
        }
    }
}
