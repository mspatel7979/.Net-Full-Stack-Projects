//using Models;
//using DataAccess;
using Services;
namespace UI;
public class LoginPage
{
    private FileStorage file = new FileStorage();
    private string AccountType;

    public List<User> currentuser = new();
    public LoginPage(){
        while(true)
        {
            Log.Information("Login Page Interface");
            Console.WriteLine();
            Console.WriteLine("Account Type");
            Console.WriteLine("[1] Login For Employee Account");
            Console.WriteLine("[2] Login For Manager Account");

            string? input = Console.ReadLine();
            //Console.WriteLine(input);
            if(input == "1")
            {
                    AccountType = "Employee";
                    break;
            }
            else if(input == "2")
            {
                    AccountType = "Manager";
                    break;
            }
            else{
                Console.WriteLine("I don't understand your input");
            }
        }

        Console.WriteLine();
        Console.WriteLine("Enter your Username: ");
        string? username = Console.ReadLine();
        Console.WriteLine("Enter your Password: ");
        string? password = Console.ReadLine();
        Console.WriteLine("Matching Login Information....");
        Console.WriteLine();
        bool userin = UserCredSame(username, password, AccountType);
        if(userin == true) 
        {
            Console.WriteLine();
            Console.WriteLine("Login and Test Worked");
        }
        if(userin == false)
        {
            Console.WriteLine();
            Console.WriteLine("No Account Found Matching Username/Password");
        }
    }

    private bool UserCredSame(string usname, string pass, string postitiontype)
    {
        bool status = false;
        User user = file.getUserinDB(usname);
        if((usname == user.UserName) && (pass == user.Password) && (postitiontype == user.Position) && (postitiontype == "Employee"))
        {
            Log.Information("Moving Into Employee Portal");
            status = true;
            //User user = file.getUserinDB(usname);
            Console.WriteLine("Employee Logged In");
            Console.WriteLine();
            // move to employee portal
            new EmployeePortal(user);
            Console.WriteLine();
            Console.WriteLine("Employee Logged Out");
            Log.Information("Log Out Of Employee Portal");
            //break;
        } 
        else if((usname == user.UserName) && (pass == user.Password) && (postitiontype == user.Position) && (postitiontype == "Manager"))
        {
            Log.Information("Moving Into Manager Portal");
            status = true;
            //User user = file.getUserinDB(usname);
            Console.WriteLine("Manager Logged In");
            Console.WriteLine();
            // move ot manager portal
            new ManagerPortal(user);
            Console.WriteLine();
            Console.WriteLine("Manager Logged Out");
            Log.Information("Log Out Of Manager Portal");
            //break;
        }    
        return status;
    }
}