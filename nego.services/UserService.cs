using AutoMapper;
using nego.business;
using nego.communs.Model;
using nego.communs.Resource;
using nego.DataAccess.unitOfWork;
using nego.DataAccess.unitOfWork.Repository;
using System.Collections.Generic;
using System.Linq;

namespace nego.services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUserRepository clientRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public Task<List<UserRessource>> GetAll()
        {
            var clients = _clientRepository.GetAll();
            var clientsRessource = _mapper.Map<List<UserRessource>>(clients);
            return Task.FromResult(clientsRessource);
        }

        public Task<UserRessource> GetById(int id)
        {
            var user = _clientRepository.GetOne(id);
            if (user != null)
            {
                var clientRessource = _mapper.Map<UserRessource>(user);
                return Task.FromResult(clientRessource);
            }
            return null;
        }

        public async Task<bool> DeleteById(int id)
        {
            var user = _clientRepository.GetOne(id);
            if (user != null)
            {
                _clientRepository.Delete(user);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
            
        }

        public async Task<bool> Create(UserRessource data)
        {
            //check if the user already exist by email
            if (data.Email != null)
            {
                //map from dto to model
                var newClient = _mapper.Map<User>(data);
                _clientRepository.Add(newClient);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
        }
    
        public async Task<bool> Update(UserRessource data)
        {
            //get user
            var user = _clientRepository.GetOne(data.Id);
            //check if user exist
            if (user != null)
            {
                var entity = _mapper.Map(data, user);
                //add to db
                _clientRepository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var userMapped = _mapper.Map<UserRessource>(entity);
                return true;
            }
            return false;
            //map from dto to model
            
        }
    }
}