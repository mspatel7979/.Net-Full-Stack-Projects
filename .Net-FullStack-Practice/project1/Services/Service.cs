using Models;
using Serilog;
using DataAccess;
namespace Services;
    public class Service
    {
        // Dependency Injection: is a design pattern where the dependency of a class is injected through the constructor instead of the class itself having a specific knowledge of its dependency, or instantiating itself
        // This example here is actually a combination of dependency injection and dependency inversion
        // This allows for more flexible change in implementation, also this pattern makes unit testing much simpler
       // private readonly IRepository _repo;
        private FileStorage file = new FileStorage();
        public Service() {
         //   _repo = repo;
        }
        // public void getAllEmployeeTickets(string username)
        // {
        //     Log.Information("Getting All Employee Submitted Tickets List");
        //     Console.WriteLine("Retrieving Employee {0} Submitted Tickets", username);
        //     List<ERT> list = new();
        //     // insert username and list so that the list is updated and gets the new data of ERTs from database
        //     file.GetAllTicketsByUsername(username, list);
        //     // Check to see if List was increased from database else employee has no submitted tickets with their username connected to them
        //     if(list.Count > 0)
        //     {
        //         // Print to console each ERT in updated list
        //         foreach(ERT ert in list){
        //             Console.WriteLine();
        //             Console.WriteLine(ert.ToString());
        //             Console.WriteLine();
        //             Thread.Sleep(2000);
        //         }
        //     }
        //     else{
        //         Console.WriteLine();
        //         Console.WriteLine("Found No Submitted Tickets From Employee");
        //         Console.WriteLine();
        //     }
        // }
        // public void submitTicket(string username)
        // {
        //     // Obtain date time with now to get current
        //     DateTime dt = DateTime.Now;
        //     // set status ticket to pending variable
        //     string status = "Pending";
        //     Log.Information("Submit Ticket Interface");
        //     Console.WriteLine();
        //     Console.WriteLine("Enter Ticket Title (ex.Plane Travel): ");
        //     string? title = Console.ReadLine();
        //     Console.WriteLine("Enter Ticket Description: ");
        //     string? des = Console.ReadLine();
        //     Console.WriteLine("Enter Amount: ");
        //     decimal amount = 0;
        //     // variable amount will get the output from user's input of amount
        //     decimal.TryParse(Console.ReadLine(), out amount);
        //     Console.WriteLine("Submitting Ticket From User...");
        //     // Insert ert data into database
        //     file.createERTinDB(new ERT(username, dt, title, des, amount, status));
        //     Console.WriteLine("Submit Processed");
        //     Console.WriteLine();
        // }
        // public void viewAllTicketsOrderedByDT()
        // {
        //     Log.Information("Get All Submitted Ticket");
        //     Console.WriteLine("Retrieving All Submitted Tickets From Employee");
        //     Console.WriteLine();
        //     List<ERT> list = new();
        //     file.GetAllERTTickets(list);
        //     foreach(ERT ert in list)
        //     {
        //         Console.WriteLine();
        //         Console.WriteLine(ert.ToString());
        //         Console.WriteLine();
        //         Thread.Sleep(2000);
        //     }
        // }
        // public void ManagerChoice()
        // {
        //     Log.Information("Get All Submitted Pending Tickets");
        //     Console.WriteLine("Retrieving All Submitted Pending Approval Tickets");
        //     Console.WriteLine();
        //     List<ERT> pendingList = new();
        //     file.GetAllPendingERT(pendingList);
        //     if(pendingList.Count > 0){
        //         foreach(ERT ert in pendingList){
        //             Console.WriteLine();
        //             Console.WriteLine(ert.ToString());
        //             Console.WriteLine();
        //             Console.WriteLine("Select Decision?");
        //             Console.WriteLine("[1] Seal of Approve");
        //             Console.WriteLine("[2] Seal of Reject");
        //             Console.WriteLine("[x] Do Later");
        //             string? decide = Console.ReadLine();
        //             if(decide == "1")
        //             {
        //                 string approveStatus = "Approved";
        //                 file.updateTicketStatusinDB(ert.UserName, ert.TicketDateTime, approveStatus);
        //             }
        //             else if(decide == "2")
        //             {
        //                 string rejectStatus = "Rejected";
        //                 file.updateTicketStatusinDB(ert.UserName, ert.TicketDateTime, rejectStatus);
        //             }
        //             else if(decide == "x")
        //             {
        //                 Console.WriteLine("Tired Today Next Time");
        //                 break;
        //             }
        //             else {
        //                 Console.WriteLine("I Don't understand your input");
        //             }
        //         }
        //     }
        //     else{
        //         Console.WriteLine("THERE ARE NO PENDING TICKETS");
        //         Console.WriteLine();
        //     }
        // }
        public bool checkForSameUsername(string userName)
        {
            // get the user from database by input of username match then return false to exit out of while true loop
            User user = file.getUserinDB(userName);
            if(user.UserName == userName){
                return false;
            }
            return true;
        }
    }
