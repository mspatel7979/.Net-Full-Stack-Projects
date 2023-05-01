//using Models;
//using DataAccess;
using Services;
namespace UI;
public class RegisterPage
{
      private FileStorage file = new FileStorage();
      private Service _service = new Service();
      private string AccountType;
    public RegisterPage(){
        while(true)
        {
            Log.Information("Register Page Interface");
            Console.WriteLine();
            Console.WriteLine("Account Type");
            Console.WriteLine("[1] Create New Employee Account");
            Console.WriteLine("[2] Create New Manager Account");

            string? input = Console.ReadLine();
            Console.WriteLine(input);
            // check to see if input is matched with making a desired user account 
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

        Console.WriteLine("Enter your First Name");
        string? firstName = Console.ReadLine();
        Console.WriteLine("Enter your Last Name");
        string? lastName = Console.ReadLine();
        Console.WriteLine("Enter your Account Username");
        string? username = Console.ReadLine();
        // check to see if database has the same username or not 
        while(!_service.checkForSameUsername(username)){
            Log.Information("Username is Same Redo Username Input");
            // Execute already taken username if username is matched and continous input until different username then in database
            Console.WriteLine("Username Already Taken: Try Again\n");
            Console.WriteLine("Enter your Account Username");
            username = Console.ReadLine();
        }
        Console.WriteLine("Enter your Account Password");
        string? password = Console.ReadLine();
        Console.WriteLine("Creating New Account....");
        Console.WriteLine();
        //file.CreateNewUser(new User(username, password, firstName, lastName, AccountType));
        file.createUserinDB(new User(username, password, firstName, lastName, AccountType));
        Log.Information("New User Created in DB");
        Console.WriteLine("Account Created Returning to Front Screen\n");
        Console.WriteLine();
    }
    // private bool checkForSameUsername(string userName)
    // {
    //     // get the user from database by input of username match then return false to exit out of while true loop
    //     User user = file.getUserinDB(userName);
    //     if(user.UserName == userName){
    //         return false;
    //     }
    //     return true;
    // }
}