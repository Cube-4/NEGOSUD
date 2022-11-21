using AutoMapper;
using Azure.Core;
using nego.business;
using nego.communs.Global;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;

namespace nego.services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
        }


        public Task<List<OrderRessource>> GetAll()
        {

            var orders = _repository.GetAll<Order>().ToList();
            var ordersRessource = _mapper.Map<List<OrderRessource>>(orders);
            return Task.FromResult(ordersRessource);
        }

        public Task<OrderRessource> GetById(int id)
        {
            var order = _repository.GetOne<Order>(User => User.Id == id);
            if (order != null)
            {
                var clientRessource = _mapper.Map<OrderRessource>(order);
                return Task.FromResult(clientRessource);
            }
            return Task.FromResult<OrderRessource>(null);
        }

        public async Task<bool> DeleteById(int id)
        {
            var user = _repository.GetOne<Order>(User => User.Id == id);
            if (user != null)
            {
                _repository.Remove(user);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
            
        }

        public async Task<OrderRessource> Add(EntityRessource data)
        {
            var orderResource = (OrderRessource)data;

            //check if the user already exist by email
            if (orderResource.ReferenceName != null)
            {
                //map from dto to model
                var newOrder = _mapper.Map<Order>(orderResource);
                _repository.Add(newOrder);
                await _unitOfWork.SaveIntoDbContextAsync();
                return orderResource;
            }
            return await Task.FromResult<OrderRessource>(null);
        }

        public async Task<OrderRessource> Update(EntityRessource data)
        {
            var orderResource = (OrderRessource)data;

            //get user
            var user = _repository.GetOne<Order>(User => User.Id == orderResource.Id);
            //check if user exist
            if (user != null)
            {
                var entity = _mapper.Map(orderResource, user);
                //add to db
                _repository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var orderMapped = _mapper.Map<OrderRessource>(entity);
                return orderMapped;
            }
            return await Task.FromResult<OrderRessource?>(null);
            //map from dto to model

        }
    }
}