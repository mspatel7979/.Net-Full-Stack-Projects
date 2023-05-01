using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using WebAPI.DTOs;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    private readonly Service _service;
    public CartController(ILogger<CartController> logger, Service service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("User")]
    public List<Product> GetUserCart([FromQuery] int u_id){
        return _service.getUserCartofProducts(u_id);
    }
    [HttpPost("Product/Add")]
    public ActionResult InsertProductToCart([FromBody] UPdtos updtos){
        _service.putProductInUserCart(updtos.userID, updtos.productID);
        return Ok("Worked");
    }
    [HttpDelete("Product/Delete")]
    public ActionResult DeleteProductFromCart([FromBody] UPdtos updtos){
        _service.deleteProductFromUserCart(updtos.userID, updtos.productID);
        return Ok("Worked");
    }
}