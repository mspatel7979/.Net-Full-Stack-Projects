using DotNetFirst;
using CoinFlipper;
using HotorCold;
using FizzBuzz;
using ToDoApp;
using BudgetApp;
using TicTacToe;

while(true) {
    Console.WriteLine("Week One Portfolio:");
    Console.WriteLine("Pick which app you would like to run: ");
    Console.WriteLine("[1]: First DotNet");
    Console.WriteLine("[2]: Coin Flipper");
    Console.WriteLine("[3]: Hot or Cold");
    Console.WriteLine("[4]: FizzBuzz");
    Console.WriteLine("[5]: ToDo App");
    Console.WriteLine("[6]: Budget App");
    Console.WriteLine("[7]: TicTacToe Game");
    Console.WriteLine("[x]: Exit");
    string? input = Console.ReadLine();

    if(input != null) {

        switch(input) {
            case "1":
                new DotNetFirst.MainMenu().Start();
            break;
            case "2":
                new CoinFlipper.MainMenu().Start();
            break;
            case "3":
                new HotorCold.MainMenu().Start();
            break;
            case "4":
                new FizzBuzz.MainMenu().Start();
            break;
            case "5":
                new ToDoApp.MainMenu().Start();
            break;
            case "6":
                new BudgetApp.MainMenu().Start();
            break;
            case "7":
                Console.WriteLine("Going to run TicTacToe Game");
                new TicTacToe.MainMenu().Start();
            break;
            case "x":
                Console.WriteLine("Goodbye!");
                Environment.Exit(0);
            break;
            default:
                Console.WriteLine("Unrecognized input, please try again.");
            break;
        }
    }
}
