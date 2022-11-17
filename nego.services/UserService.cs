using AutoMapper;
using nego.business;
using nego.communs.Global;
using nego.communs.Model;
using nego.communs.Resource;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;

namespace nego.services
{
    public class UserService : IUserService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
        }


        public Task<List<UserRessource>> GetAll()
        {

            var users = _repository.GetAll<User>().ToList();
            var usersRessource = _mapper.Map<List<UserRessource>>(users);
            return Task.FromResult(usersRessource);
        }

        public Task<UserRessource> GetById(int id)
        {
            var user = _repository.GetOne<User>(User => User.Id == id);
            if (user != null)
            {
                var userRessource = _mapper.Map<UserRessource>(user);
                return Task.FromResult(userRessource);
            }
            return null;
        }

        public async Task<bool> DeleteById(int id)
        {
            var user = _repository.GetOne<User>(User => User.Id == id);
            if (user != null)
            {
                _repository.Remove(user);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
            
        }
        
        public async Task<UserRessource> Add(EntityRessource data)
        {
            var userResource = (UserRessource)data;
            //check if the user already exist by email
            if (userResource.Email != null)
            {
                //map from dto to model
                var newUser = _mapper.Map<User>(userResource);
                _repository.Add(newUser);
                await _unitOfWork.SaveIntoDbContextAsync();
                return userResource;
            }
            return null;
        } 
    
        public async Task<UserRessource> Update(EntityRessource data)
        {
            var userResource = (UserRessource)data;
            //get user
            var user = _repository.GetOne<User>(User => User.Id == userResource.Id);
            //check if user exist
            if (user != null)
            {
                var entity = _mapper.Map(userResource, user);
                //add to db
                _repository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var userMapped = _mapper.Map<UserRessource>(entity);
                return userMapped;
            }
            return null;
        }
    }
}