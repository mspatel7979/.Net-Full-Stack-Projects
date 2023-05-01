using UI;
using Services;
//using DataAccess;
//using Serilog;

/*
Download appropriate packages for serilog
dotnet add package serilog
dotnet add package serilog.sinks.console (for logging to console)
dotnet add package serilog.sinks.file (for logging to file)
*/
// .WriteTo.Console()

//new FrontScreen().Start();
 Log.Logger = new LoggerConfiguration()
     .WriteTo.File("../logs/logs.txt", rollingInterval: RollingInterval.Day)
     .CreateLogger();

 try {
    Log.Information("Application Starting...");
    new FrontScreen().Start();
//     // How to inject dependencies upon instantiation
//     // new MainMenu(new WorkoutService(new FileStorage())).Start();

//     IRepository repo = new FileStorage();
//     TicketService service = new TicketService(repo);
//     MainMenu menu = new MainMenu(service);
//     menu.Start();
}
catch(Exception ex) {
    Log.Error("Something fatal happened, {0}", ex);
}
finally {
    Log.CloseAndFlush();
}