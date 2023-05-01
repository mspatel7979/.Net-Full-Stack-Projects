using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly Service _service;
    public UserController(ILogger<UserController> logger, Service service)
    {
        _logger = logger;
        _service = service;
    }
    
    // HTTP GET Request for User
    [HttpGet("Profile")]
    public User GetUserinDB([FromQuery] string username)
    {
        return _service.getUserinDB(username);
    }
    // HTTP POST Request for User Register with Some Validations 
    [HttpPost("Register")]
    public ActionResult<User> Register([FromBody]User user)
    {
        if(string.IsNullOrWhiteSpace(user.Username) == false &&
           string.IsNullOrWhiteSpace(user.Password) == false &&
           string.IsNullOrWhiteSpace(user.ZeldaCharacter) == false){
            // Check to see if the User's provided username gets anything from db and match them together
            // if no match then create user then bad request
            if(user.Username != _service.getUserinDB(user.Username).Username)
            {
                // make sure any entry in coinbank and click power is changed to default new user settings 
                user.CoinBank = 0;
                user.ClickPower = 1;
                PasswordHasher ph = new PasswordHasher();
                user.Password = ph.PasswordHash(user.Password);
                return Created("/Register", _service.createUserinDB(user));
            }
            else{
                return BadRequest("Username is Taken");
            }
        }
        else{
            return BadRequest("Entry must not be null or empty");
        }
    }
    // HTTP POST for Login User with some Validations
    [HttpGet("Login")]
    public ActionResult<User> Login([FromQuery] string? username, [FromQuery] string? password)
    {
        if(string.IsNullOrWhiteSpace(username) == false &&
           string.IsNullOrWhiteSpace(password) == false){
            PasswordHasher ph = new PasswordHasher();
            User gotuser = _service.getUserinDB(username);
            // validation username and password with database username and password for that user
            if(username == gotuser.Username && ph.PasswordValidate(gotuser.Password, password) == true)
            {
                return Ok(_service.getUserinDB(username));
            }
            else{
                return BadRequest("No Match");
            }
        }
        else{
            return BadRequest("Entry must not be null or empty");
        }
    }
    [HttpPut("Update/Coins")]
    public int updateCoinBank([FromBody] User user)
    {
        return _service.updateCoinBank(user);
    }
    [HttpPut("Update/Power")]
    public int updateClickPower([FromBody] User user)
    {
        return _service.updateClickPower(user);
    }

}