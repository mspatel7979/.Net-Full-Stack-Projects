//using Models;
//using DataAccess;
using Services;
namespace UI;
public class ManagerPortal
{
    private FileStorage file = new FileStorage();
    private Service _service = new Service();
    public ManagerPortal(User user)
    {
        Console.WriteLine();
         Console.WriteLine("User: {0} Has Logged In", user.UserName);
         Console.WriteLine("Welcome {0} {1} To Manager Portal", user.FirstName, user.LastName);
         Console.WriteLine();
        while(true)
        {
            Log.Information("Manager Portal Interface");
            Console.WriteLine("Select One?");
            Console.WriteLine("[1] Approve/Reject Pending Ticket");
            Console.WriteLine("[2] View All Submitted Tickets");
            Console.WriteLine("[x] Logout");
            
            string? input = Console.ReadLine();
            if(input == "1"){
                Log.Information("Moving To Manager Choice");
                // Portal to Manager Interaction with ticket
                ManagerChoice();
            }
            else if(input == "2"){
                Log.Information("Moving To View All Submitted Tickets");
                // View all submitted tickets ordered by date and time
                viewAllTicketsOrderedByDT();
            }
            else if(input == "x")
            {
                break;
            }
            else {
                Console.WriteLine("I Don't understand your input");
            }
        }    
    }
    private void ManagerChoice()
    {
        Log.Information("Get All Submitted Pending Tickets");
        Console.WriteLine("Retrieving All Submitted Pending Approval Tickets");
        Console.WriteLine();
        List<ERT> pendingList = new();
        file.GetAllPendingERT(pendingList);
        if(pendingList.Count > 0){
            foreach(ERT ert in pendingList){
                Console.WriteLine();
                Console.WriteLine(ert.ToString());
                Console.WriteLine();
                Console.WriteLine("Select Decision?");
                Console.WriteLine("[1] Seal of Approve");
                Console.WriteLine("[2] Seal of Reject");
                Console.WriteLine("[x] Do Later");
                string? decide = Console.ReadLine();
                if(decide == "1")
                {
                    string approveStatus = "Approved";
                    file.updateTicketStatusinDB(ert.UserName, ert.TicketDateTime, approveStatus);
                }
                else if(decide == "2")
                {
                    string rejectStatus = "Rejected";
                    file.updateTicketStatusinDB(ert.UserName, ert.TicketDateTime, rejectStatus);
                }
                else if(decide == "x")
                {
                    Console.WriteLine("Tired Today Next Time");
                    break;
                }
                else {
                    Console.WriteLine("I Don't understand your input");
                }
            }
        }
        else{
            Console.WriteLine("THERE ARE NO PENDING TICKETS");
            Console.WriteLine();
        }
    }

    private void viewAllTicketsOrderedByDT()
    {
        Log.Information("Get All Submitted Ticket");
        Console.WriteLine("Retrieving All Submitted Tickets From Employee");
        Console.WriteLine();
        List<ERT> list = new();
        file.GetAllERTTickets(list);
        foreach(ERT ert in list)
        {
            Console.WriteLine();
            Console.WriteLine(ert.ToString());
            Console.WriteLine();
            Thread.Sleep(2000);
        }
    }
}