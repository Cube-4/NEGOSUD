using AutoMapper;
using nego.business;
using nego.communs.Model;
using nego.communs.Resource;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;
using nego.services.Authorization.Helper;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace nego.services
{
    public class UserService : IUserService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private IJwtUtils _jwtUtils;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository, IJwtUtils jwtUtils)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
            _jwtUtils = jwtUtils;
        }


        public Task<List<UserRessource>> GetAll()
        {

            var users = _repository.GetAll<User>().Include(c => c.Roles).ThenInclude(x => x.Role).ToList();
            var usersRessource = _mapper.Map<List<UserRessource>>(users);
            return Task.FromResult(usersRessource);
        }

        public Task<UserRessource> GetById(int id)
        {
            var user = _repository.GetAll<User>().Include(u => u.Roles).ThenInclude(r => r.Role).FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                var userRessource = _mapper.Map<UserRessource>(user);
                return Task.FromResult(userRessource);
            }
            return Task.FromResult<UserRessource>(null);
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
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(userResource.Password);
                _repository.Add(newUser);
                await _unitOfWork.SaveIntoDbContextAsync();
                return userResource;
            }
            return await Task.FromResult<UserRessource>(null);
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
            return await Task.FromResult<UserRessource>(null);
        }

        public async Task<UserRessource> Authenticate(AuthenticateRequest userRequest)
        {            
            var user = _repository.GetOne<User>(x => x.Email == userRequest.Email);

            // validate
            if (user == null || !BCrypt.Net.BCrypt.Verify(userRequest.Password, user.Password))
                throw new AppException("Username or password is incorrect");

            // authentication successful
            var response = _mapper.Map<UserRessource>(user);
            response.Token = _jwtUtils.GenerateToken(user);
            return response;
        }
    }
}