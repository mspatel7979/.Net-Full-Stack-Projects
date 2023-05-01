using Microsoft.AspNetCore.Mvc;
using DataAccess.Entities;
using DataAccess;
using Services;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]

    public class BusinessController : ControllerBase
    {

        private readonly BusinessServices _busService;
        public BusinessController(BusinessServices busService)
        {
            _busService = busService;
        }

        [HttpGet]
        public List<Business> GetAll()
        {
            return _busService.GetAllBusinesses();
        }

        [HttpGet("bus/{businessId:int}")]
        public List<Business> getBusinessById(int businessId)
        {
            return _busService.getBusinessById(businessId);
        }

        [HttpPost]
        public List<Business> Create(Business bus)
        {
            _busService.CreateBusiness(bus);
            return _busService.GetAllBusinesses();
        }

        [HttpPut("Update")]
        public Business Update(Business bus)
        {
            return _busService.UpdateBusiness(bus);
        }

        [HttpDelete]
        public Business Delete(Business bus)
        {
            return _busService.DeleteBusiness(bus);
        }

        [HttpGet]
        [Route("busId/{email}")]
        public int? GetBusinessByEmail(string email)
        {
            try
            {
                return _busService.GetBusiness(email).Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("busType/{email}")]
        public IActionResult GetBusinessTypeByEmail(string email)
        {
            return Ok(_busService.GetBusiness(email).BusinessType);
        }

        [HttpGet]
        [Route("wallet/update/{id:int}/{amt:int}")]
        public Business? updateWallet(int id, int amt)
        {

            return _busService.updateBWallet(id, amt);

        }

    }
}