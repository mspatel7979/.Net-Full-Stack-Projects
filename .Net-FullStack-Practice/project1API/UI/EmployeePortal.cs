//using Models;
//using DataAccess;
using Services;
namespace UI;
public class EmployeePortal
{
    private FileStorage file = new FileStorage();
    private Service _service = new Service();
    public EmployeePortal(User user)
    {
        Console.WriteLine();
        Console.WriteLine("User: {0} Has Logged In", user.UserName);
        Console.WriteLine("Welcome {0} {1} To Employee Portal", user.FirstName, user.LastName);
        Console.WriteLine();

        while(true)
        {
            Log.Information("Employee Portal Interface");
            Console.WriteLine("Select One?");
            Console.WriteLine("[1] Submit New Ticket");
            Console.WriteLine("[2] View All Submitted Tickets");
            Console.WriteLine("[x] Logout");
            
            string? input = Console.ReadLine();
            if(input == "1"){
                Log.Information("Employee Moving to Submitting Ticket");
                // // Obtain date time with now to get current
                // DateTime dt = DateTime.Now;
                // // set status ticket to pending variable
                // string status = "Pending";
                // submit the ticket with user's username with datetime and status to insert to database
                submitTicket(user.UserName);
                //break;
            }
            else if(input == "2")
            {
                Log.Information("Getting Employee's All Submitted Tickets");
                    // view all tickets that are submitted by this EMployee User
                    // this is where you find all the tickets updated or not updates status on tickets's approval
                    getAllEmployeeTickets(user.UserName);
                    //break;
            }
            else if(input == "x")
            {
                // Log Out From Employee Portal
                break;
            }
            else {
                Console.WriteLine("I Don't understand your input");
            }
        }    
    }

    private void submitTicket(string username)
    {
        // Obtain date time with now to get current
        DateTime dt = DateTime.Now;
        // set status ticket to pending variable
        string status = "Pending";
        Log.Information("Submit Ticket Interface");
        Console.WriteLine();
        Console.WriteLine("Enter Ticket Title (ex.Plane Travel): ");
        string? title = Console.ReadLine();
        Console.WriteLine("Enter Ticket Description: ");
        string? des = Console.ReadLine();
        Console.WriteLine("Enter Amount: ");
        decimal amount = 0;
        // variable amount will get the output from user's input of amount
        decimal.TryParse(Console.ReadLine(), out amount);
        Console.WriteLine("Submitting Ticket From User...");
        // Insert ert data into database
        file.createERTinDB(new ERT(username, dt, title, des, amount, status));
        Console.WriteLine("Submit Processed");
        Console.WriteLine();
    }

    private void getAllEmployeeTickets(string username)
    {
        Log.Information("Getting All Employee Submitted Tickets List");
        Console.WriteLine("Retrieving Employee {0} Submitted Tickets", username);
        List<ERT> list = new();
        // insert username and list so that the list is updated and gets the new data of ERTs from database
        file.GetAllTicketsByUsername(username, list);
        // Check to see if List was increased from database else employee has no submitted tickets with their username connected to them
        if(list.Count > 0)
        {
            // Print to console each ERT in updated list
            foreach(ERT ert in list){
                Console.WriteLine();
                Console.WriteLine(ert.ToString());
                Console.WriteLine();
                Thread.Sleep(2000);
            }
        }
        else{
            Console.WriteLine();
            Console.WriteLine("Found No Submitted Tickets From Employee");
            Console.WriteLine();
        }
    }
}