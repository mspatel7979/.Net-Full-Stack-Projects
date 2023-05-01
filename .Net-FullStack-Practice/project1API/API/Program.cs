
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.OpenApi;
using DataAccess;
using Services;
using Models;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.File("../logs/logs.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddScoped<IRepository, FileStorage>();
    builder.Services.AddScoped<Service>();


    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();


    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.MapGet("/", () => "Welcome To Expense Reimbursement System Application API\n\n\n\nAuthor:    Meet Patel");

    app.MapGet("/user/employee/ert/", ([FromQuery] string? username, [FromServices] Service service) => {
        if(string.IsNullOrWhiteSpace(username) == false){
            User user = service.getUserinDB(username);
            if(user.UserName == username && user.Position == "Employee"){
                return Results.Ok(service.GetAllTicketsByUsername(username));
            }
            return Results.BadRequest("Employee Account Invalid");
        }
        return Results.BadRequest("Username must not be blank/null");
    });

    app.MapGet("/user/manager/ert/", ([FromQuery] string? managerusername, [FromServices] Service service) => {
            if(string.IsNullOrWhiteSpace(managerusername) == false){
                User user = service.getUserinDB(managerusername);
                if(user.UserName == managerusername && user.Position == "Manager"){
                    return Results.Ok(service.GetAllERTTickets());
                }
                else{
                    return Results.BadRequest("No Manager Account Found: Access Denied");
                }
            }
            return Results.BadRequest("managerusername must not be blank/null");
            
    });

    app.MapGet("/user/manager/pendingert/", ([FromQuery] string? managerusername, [FromServices] Service service) => {
        if(string.IsNullOrWhiteSpace(managerusername) == false){
            User user = service.getUserinDB(managerusername);
            if(user.UserName == managerusername && user.Position == "Manager"){
                List<ERT> ert = service.GetAllPendingERT();
                if(ert.Count > 0){
                    return Results.Ok(service.GetAllPendingERT());
                }
                return Results.Ok("There Are No Pending Tickets");
            }
            return Results.BadRequest("No Manager Account Found: Access Denied");
        }
        return Results.BadRequest("managerusername must not be blank/null");
    });

    app.MapGet("/user/", ([FromQuery] string? username, [FromServices] Service service) => {
        if(string.IsNullOrWhiteSpace(username) == false){
            User user = service.getUserinDB(username);
            if(user.UserName == username){
                return Results.Ok(service.getUserinDB(username));
            }
            return Results.BadRequest("No Matching Username Found in User Accounts");
        }
        return Results.BadRequest("Username must not be blank/null");
    });

    app.MapGet("/user/login/", ([FromQuery] string? username, [FromQuery] string? password, [FromServices] Service service) => {
            if(string.IsNullOrWhiteSpace(username) == false && string.IsNullOrWhiteSpace(password) == false){
                User user = service.getUserinDB(username);
                if(user.UserName == username && user.Password == password)
                {
                    if(user.Position == "Manager"){
                        return Results.Ok($"Welcome {username} Into Manager Portal");
                    }
                    else{
                        return Results.Ok($"Welcome {username} Into Employee Portal");
                    }
                }
                else{
                    return Results.BadRequest("No ERS Account Matched With UserName/Password: Try Again");
                }
            }
            return Results.BadRequest("Username/Password must not be blank/null");
    });

    app.MapPost("/user/create/user/", ([FromQuery] string? firstname, [FromQuery] string? lastname, [FromQuery] string? username, [FromQuery] string? password, [FromBody] User user, Service service) => {
        if(string.IsNullOrWhiteSpace(firstname) == false && 
        string.IsNullOrWhiteSpace(lastname) == false &&
        string.IsNullOrWhiteSpace(username) == false && 
        string.IsNullOrWhiteSpace(password) == false)
        {
            if(service.checkForSameUsername(username) == true)
            {
                return Results.Created("/user/create/user/", service.createUserinDB(user = new User(username, password, firstname, lastname, "Employee")));
            }
            return Results.BadRequest("UserName Already Taken: Try Again");
        }
        return Results.BadRequest("Firstname/Lastname/Username/Password must not be null/blank");
    });

    app.MapPost("/user/employee/create/ert/", ([FromQuery] string? username, [FromQuery] string? title, [FromQuery] string? description, [FromQuery] decimal amount, [FromBody] ERT ert, Service service) => {
        if(string.IsNullOrWhiteSpace(username) == false && 
        string.IsNullOrWhiteSpace(title) == false &&
        string.IsNullOrWhiteSpace(description) == false && 
        decimal.IsInteger(amount) == true)
        {
            User user = service.getUserinDB(username);
            if(username == user.UserName && user.Position == "Employee")
            {
                return Results.Created("/user/employee/create/ert/", service.createERTinDB(ert = new ERT(username, DateTime.Now, title, description, amount, "Pending")));
            }
            return Results.BadRequest("No Account Match For Employee To Submit Ticket: Try Again");
        }
        return Results.BadRequest("Username/Title/Description/Amount must not be null/blank");

    });

    app.MapPost("/user/manager/choice/", ([FromQuery] string? managerusername, [FromQuery] string? username, [FromQuery] DateTime dt, [FromQuery] string? status, Service service) => {
        if(string.IsNullOrWhiteSpace(managerusername) == false &&
        string.IsNullOrWhiteSpace(username) == false && 
        string.IsNullOrWhiteSpace(status) == false)
        { 
            if(status == "Approved" || status == "Rejected")
            {
                User manageruser = service.getUserinDB(managerusername);
                if(manageruser.UserName == managerusername && manageruser.Position == "Manager")
                {
                    User user = service.getUserinDB(username);
                    if(username == user.UserName)
                    {
                        List<ERT> ertlist = new List<ERT>();
                        ertlist = service.GetAllPendingERT();
                        foreach(ERT er in ertlist)
                        {
                            if(er.UserName == username && er.TicketDateTime == dt)
                            {
                                service.updateTicketStatusinDB(username, er.TicketDateTime, status);
                                return Results.Ok("Ticket Updated");
                            }
                        }
                        return Results.BadRequest("No Submitted Pending Tickets By Employee Matched: Try Again");
                    }
                    return Results.BadRequest("No Account Match For Employee Ticket: Try Again");
                }
                return Results.BadRequest("Need Manager Account To Approve/Reject Tickets: Try Again");
            }
            return Results.BadRequest("Status format is no Approved/Rejected");
        }
        return Results.BadRequest("ManagerUsername/Username/Status must not be null/blank");

    });


    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
