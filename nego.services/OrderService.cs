using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using nego.business;
using nego.communs.Global;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;
using System.Security.Claims;

namespace nego.services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICartService _cartService;
        public OrderService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository, ICartService cartService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
            _cartService = cartService;
        }

        
        public Task<List<OrderRessource>> GetAll()
        {

            var orders = _repository.GetAll<Order>()
                .Include(c => c.Articles).ThenInclude(x => x.Article)
                .ToList();
            var ordersRessource = _mapper.Map<List<OrderRessource>>(orders);
            return Task.FromResult(ordersRessource);
        }

        public Task<OrderRessource> GetById(int id)
        {
            var order = _repository.GetAll<Order>()
                .Include(x => x.Articles).ThenInclude(x => x.Article)
                .FirstOrDefault(u => u.Id == id);
            if (order != null)
            {
                var clientRessource = _mapper.Map<OrderRessource>(order);
                return Task.FromResult(clientRessource);
            }
            return Task.FromResult<OrderRessource>(null);
        }

        public async Task<bool> DeleteById(int id)
        {
            var order = _repository.GetAll<Order>()
                .Include(x => x.Articles).ThenInclude(x => x.Article)
                .FirstOrDefault(u => u.Id == id);
            var orderUser = _repository.GetOne<User>(src => src.Id == order.UserId);

            if (order != null)
            {
                orderUser.Orders.Remove(order);
                _repository.Remove(order.Articles);
                _repository.Remove(order);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;
            
        }

        public async Task<OrderRessource> Add(EntityRessource data)
        {
            try
            {
                var orderData = (OrderRessource)data;

                var cart = _cartService.GetCart();
                var order = new Order
                {
                    OrderName = orderData.OrderName,
                    ReferenceName = orderData.ReferenceName,
                    UserId = orderData.UserId,
                    OrderDate = DateTime.Now,
                    OrderTotal = cart.TotalPrice,
                    OrderStatus = "Pending"
                };
                _repository.Add(order);
                await _unitOfWork.SaveIntoDbContextAsync();


                foreach (var item in cart.Articles)
                {
                    var articleOrder = new ArticleOrder
                    {
                        OrderId = order.Id,
                        ArticleId = item.Article.Id,
                        Quantity = item.Quantity
                    };

                    _repository.Add(articleOrder);
                }
                var orderUser = _repository.GetOne<User>(src => src.Id == orderData.UserId);
                orderUser.Orders.Add(order);

                await _unitOfWork.SaveIntoDbContextAsync();
                return orderData;
            }
            catch
            {
                //check if the user already exist by email
                /*if (orderResource.ReferenceName != null)
                {
                    //map from dto to model
                    var newOrder = _mapper.Map<Order>(orderResource);
                    _repository.Add(newOrder);
                    await _unitOfWork.SaveIntoDbContextAsync();
                    return orderResource;
                }*/
                return await Task.FromResult<OrderRessource>(null);
            }
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
            return await Task.FromResult<OrderRessource>(null);
            //map from dto to model

        }
    }
}