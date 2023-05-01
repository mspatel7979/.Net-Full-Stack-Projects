using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly Service _service;
    public ProductController(ILogger<ProductController> logger, Service service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost("Add/Product")]
    public void PutProduct([FromBody] Product product)
    {
        _service.putProduct(product);
        Ok("Worked");
    }
}