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
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ClientService(IClientRepository clientRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public Task<List<ClientRessource>> GetAll()
        {
            var clients = _clientRepository.GetAll();
            var clientsRessource = _mapper.Map<List<ClientRessource>>(clients);
            return Task.FromResult(clientsRessource);
        }

        public Task<ClientRessource> GetById(int id)
        {
            var client = _clientRepository.GetOne(id);
            if (client != null)
            {
                var clientRessource = _mapper.Map<ClientRessource>(client);
                return Task.FromResult(clientRessource);
            }
            return null;
        }

        public async Task<bool> DeleteById(int id)
        {
            var client = _clientRepository.GetOne(id);
            if (client != null)
            {
                _clientRepository.Delete(client);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
            
        }

        public async Task<bool> Create(ClientRessource data)
        {
            //check if the client already exist by email
            if (data.Email != null)
            {
                //map from dto to model
                var newClient = _mapper.Map<Client>(data);
                _clientRepository.Add(newClient);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
        }
    
        public async Task<bool> Update(ClientRessource data)
        {
            //get user
            var client = _clientRepository.GetOne(data.Id);
            //check if user exist
            if (client != null)
            {
                var entity = _mapper.Map(data, client);
                //add to db
                _clientRepository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var userMapped = _mapper.Map<ClientRessource>(entity);
                return true;
            }
            return false;
            //map from dto to model
            
        }
    }
}