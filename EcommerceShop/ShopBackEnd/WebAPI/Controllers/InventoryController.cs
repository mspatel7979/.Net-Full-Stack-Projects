using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using WebAPI.DTOs;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly Service _service;
    public InventoryController(ILogger<ProductController> logger, Service service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("Own/List")]
    public List<Product> GetUserInventory([FromQuery] int u_id)
    {
        return _service.getUserInventory(u_id);
    }
    [HttpGet("UnOwn/List")]
    public List<Product> GetUserUnOwnInventory([FromQuery] int u_id)
    {
        return _service.getProductsNotInInventory(u_id);
    }
    [HttpPost("Own/List/Add/Product")]
    public ActionResult PutProducttoInventory([FromBody] UPdtos updtos){
        _service.putProductInUserInventory(updtos.userID, updtos.productID);
        return Ok("Worked");
    } 
}