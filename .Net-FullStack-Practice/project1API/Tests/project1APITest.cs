using Models;
using Services;

namespace project1API;

public class project1APITest
{
    [Fact]
    public void MatchingEmployeeUserTest()
    {
        string firstname = "first";
        string lastname = "last";
        string username = "UsernameTest";
        string password = "PasswordTest";
        string position = "Employee";
        User user = new User(username, password, firstname, lastname, position);
        Assert.Equal(user.FirstName, firstname);
        Assert.Equal(user.LastName, lastname);
        Assert.Equal(user.UserName, username);
        Assert.Equal(user.Password, password);
        Assert.Equal(user.Position, position);
    }
    [Fact]
    public void MatchingERTTest()
    {
        string username = "UsernameTest";
        DateTime dt = DateTime.Now;
        string title = "Plane Travel";
        string description = "Flew from dsm to nyw";
        decimal amount = 100;
        string status = "Pending";
        ERT ert = new ERT(username, dt, title, description, amount, status);
        Assert.Equal(ert.UserName, username);
        Assert.Equal(ert.TicketDateTime, dt);
        Assert.Equal(ert.Title, title);
        Assert.Equal(ert.Description, description);
        Assert.Equal(ert.Amount, amount);
        Assert.Equal(ert.Status, status);
    }
}