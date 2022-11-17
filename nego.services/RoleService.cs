using AutoMapper;
using nego.business;
using nego.communs.Global;
using nego.communs.Resource;
using nego.DataAccess.dbContexte;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.unitOfWork;
using nego.communs.Model;

namespace nego.services
{
    public class RoleService : IRoleService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public RoleService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public async Task<bool> DeleteById(int id)
        {
            var role = _repository.GetOne<User>(Role => Role.Id == id);
            if (role != null)
            {
                _repository.Remove(role);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
        }

        public Task<List<RoleRessource>> GetAll()
        {
            var roles = _repository.GetAll<Role>().ToList();
            var roleRessource = _mapper.Map<List<RoleRessource>>(roles);
            return Task.FromResult(roleRessource);
        }

        public Task<RoleRessource> GetById(int id)
        {
            var role = _repository.GetOne<User>(Role => Role.Id == id);
            if (role != null)
            {
                var roleRessource = _mapper.Map<RoleRessource>(role);
                return Task.FromResult(roleRessource);
            }
            return null;
        }

        public async Task<RoleRessource> Add(EntityRessource data)
        {
            var roleRessource = (RoleRessource)data;
            if (roleRessource.Name != null)
            {
                //map from dto to model
                var newRole = _mapper.Map<User>(roleRessource);
                _repository.Add(newRole);
                await _unitOfWork.SaveIntoDbContextAsync();
                return roleRessource;
            }
            return null;
        }

        public async Task<RoleRessource> Update(EntityRessource data)
        {
            var roleRessource = (RoleRessource)data;
            var role = _repository.GetOne<Role>(Role => Role.Id == roleRessource.Id);
            //check if user exist
            if (role != null)
            {
                var entity = _mapper.Map(roleRessource, role);
                //add to db
                _repository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var roleMapped = _mapper.Map<RoleRessource>(entity);
                return roleMapped;
            }
            return null;
        }
    }
}
