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
        }
    }
}
