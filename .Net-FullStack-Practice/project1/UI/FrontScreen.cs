//using DataAccess;
using System;
namespace UI;
public class FrontScreen
{
    public void Start()
    {
        while(true)
        {
            Log.Information("Front Screen Interface");
            Console.WriteLine("\n");
            Console.WriteLine("Expense Reimbursement System Application");
            Console.WriteLine("What do you want to do?");
            Console.WriteLine("[1] Login to ERS Account");
            Console.WriteLine("[2] Register a New ERS Account");
            Console.WriteLine("[x] Exit Application\n");

            string input = Console.ReadLine();
            switch(input)
            {
                case "1":
                    Log.Information("Moving Into Login Page");
                    // Launch Login Page
                    new LoginPage();
                break;
                case "2":
                    Log.Information("Moving Into Register Page");
                    // Launch Register Page
                    new RegisterPage();
                break;
                case "x":
                    Log.Information("Exit Application");
                    // Exit and Terminate Code 
                    Environment.Exit(0);
                break;
                default:
                    // anything else then print this message and restart while looping until 1 of 3 is cases is hit
                    Console.WriteLine("I don't understand your input");
                break;
            }
        }
    }
}