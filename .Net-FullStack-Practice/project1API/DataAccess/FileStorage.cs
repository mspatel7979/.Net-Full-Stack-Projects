using System.Text.Json;
using Models;
using Serilog;
using System.Data.SqlClient;

namespace DataAccess;
// In this project, all we'll do is getting and persisting data
// Code in this project will not be doing any of the following
// - Input Validation
// - Console I/O
// - Any complex application logic

    public class FileStorage : IRepository
    {
        //private const string _filePath = "../DataAccess/TicketLogs.json";
        //private const string _filePath = "../DataAccess/UserLogs.json";
        public FileStorage() {
            // I want to write my data in JSON format
            // The process of converting data to string/bit for transportation or persistence is called Serialization
            // The process of taking the string/bit/etc and translating back into Objects is called Deserialization

            // When we initialize this class, let's make sure the file we want to modify exists, and if not, let's create it.
            // File is an example of unmanaged resource, aka CLR (common language runtime does not garbage collect it for you. You have to manually close/dispose it)
           // Log.Information("Instantiating File Storage Class");
            // bool fileExists = File.Exists(_filePath);

            // if(!fileExists) {
            //     var fs = File.Create(_filePath);
            //     fs.Close();
            // }
        }
/*
        public List<TicketSession> GetAllTicket() {
           // Log.Information("File Storage: Retrieving all ticket sessions");
            // Open the file, read the content, close the file
            string fileContent = File.ReadAllText(_filePath);

            // The read string, and deserialize it back to List of workout sessions
            return JsonSerializer.Deserialize<List<TicketSession>>(fileContent);
        }

        public void CreateNewSession(TicketSession sessionToCreate) {
           // Log.Information("File Storage: creating a new ticket session");
            // Reading from an existing file and deserializing it as list of ticket
            List<TicketSession> sessions = GetAllTicket();
            // Adding new ticket session
            sessions.Add(sessionToCreate);

            // Serializing the list as string and writing it back to the file
            string content = JsonSerializer.Serialize(sessions);
            File.WriteAllText(_filePath, content);
        }
        public List<User> GetAllUser() {
           // Log.Information("File Storage: Retrieving all ticket sessions");
            // Open the file, read the content, close the file
            string fileContent = File.ReadAllText(_filePath);

            // The read string, and deserialize it back to List of workout sessions
            return JsonSerializer.Deserialize<List<User>>(fileContent);
        }
        public void CreateNewUser(User user) {
           // Log.Information("File Storage: creating a new ticket session");
            // Reading from an existing file and deserializing it as list of ticket
            List<User> sessions = GetAllUser();
            // Adding new ticket session
            sessions.Add(user);

            // Serializing the list as string and writing it back to the file
            string content = JsonSerializer.Serialize(sessions);
            File.WriteAllText(_filePath, content);
        }
*/
        public User createUserinDB(User user)
        {
            Log.Information("Creating New User To DB With SQL Connection And Command With Parameters");
            try{
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                //string cmd = "SELECT UserName, Passwor, FirstName, LastName, Position FROM UserAccount WHERE UserName = @username";
                using SqlCommand cmd = new SqlCommand("INSERT INTO UserAccount(UserName, Passwor, FirstName, LastName, Position) VALUES (@Username, @Password, @firstname, @lastname, @position)", connection);
                cmd.Parameters.AddWithValue("@Username", user.UserName);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@firstname", user.FirstName);
                cmd.Parameters.AddWithValue("@lastname", user.LastName);
                cmd.Parameters.AddWithValue("@position", user.Position);
                cmd.ExecuteNonQuery();
                return user;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Creating New User in DB: {ex}");
                throw;
            }

        }
        public User getUserinDB(string username)
        {
            Log.Information("Getting User To DB With SQL Connection And Command With Parameters");
            try
            {
                User user = new User();
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                using SqlCommand cmd = new SqlCommand("SELECT UserName, Passwor, FirstName, LastName, Position FROM UserAccount WHERE UserName = @username", connection);
                cmd.Parameters.AddWithValue("@username", username);

                using SqlDataReader reader = cmd.ExecuteReader();

                if(reader.Read()) 
                {
                    user = new User(
                        user.UserName = (string) reader["UserName"],
                        user.Password = (string) reader["Passwor"],
                        user.FirstName = (string) reader["FirstName"],
                        user.LastName = (string) reader["LastName"],
                        user.Position = (string) reader["Position"]
                    );
                }
                return user;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Getting User in DB: {ex}");
                throw;
            }
        }
        public ERT createERTinDB(ERT ert)
        {
            Log.Information("Creating New ERT In DB With SQL Connection And Command With Parameters");
            try
            {
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                using SqlCommand cmd = new SqlCommand("INSERT INTO ERT(UserName, DT, Title, Descrip, Amount, CurStatus) VALUES (@username, @datetime, @title, @des, @amount, @status)", connection);
                cmd.Parameters.AddWithValue("@username", ert.UserName);
                cmd.Parameters.AddWithValue("@datetime", ert.TicketDateTime);
                cmd.Parameters.AddWithValue("@title", ert.Title);
                cmd.Parameters.AddWithValue("@des", ert.Description);
                cmd.Parameters.AddWithValue("@amount", ert.Amount);
                cmd.Parameters.AddWithValue("@status", ert.Status);
                cmd.ExecuteNonQuery();
                return ert;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Creating New ERT in DB: {ex}");
                throw;
            }
        }
        public List<ERT> GetAllERTTickets(List<ERT> ert)
        {
            Log.Information("Getting All ERT In DB With SQL Connection And Command With Parameters");
            try
            {
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();
                using SqlCommand cmd = new SqlCommand("SELECT * FROM ERT ORDER BY DT", connection);
                using SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read()) 
                {
                    ert.Add(new ERT {
                        UserName = (string) reader["UserName"],
                        TicketDateTime = (DateTime) reader["DT"],
                        Title = (string) reader["Title"],
                        Description = (string) reader["Descrip"],
                        Amount = (decimal) reader["Amount"],
                        Status = (string) reader["CurStatus"],
                    });
                }
                return ert;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Getting All ERT in DB: {ex}");
                throw;
            }
        }

        public List<ERT> GetAllTicketsByUsername(string username, List<ERT> ert)
        {
            Log.Information("Getting ERT By Username From DB With SQL Connection And Command With Parameters");
            try
            {
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                using SqlCommand cmd = new SqlCommand("SELECT * FROM ERT WHERE UserName = @username", connection);
                cmd.Parameters.AddWithValue("@username", username);

                using SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read()) 
                {
                    ert.Add(new ERT {
                        UserName = (string) reader["UserName"],
                        TicketDateTime = (DateTime) reader["DT"],
                        Title = (string) reader["Title"],
                        Description = (string) reader["Descrip"],
                        Amount = (decimal) reader["Amount"],
                        Status = (string) reader["CurStatus"],
                    });
                }
                return ert;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Getting ERT By Username in DB: {ex}");
                throw;
            }
        }
        public List<ERT> GetAllPendingERT(List<ERT> ert)
        {
            Log.Information("Getting All ERT By Pending Status To DB With SQL Connection And Command With Parameters");
            try
            {
                string stat = "Pending";
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                using SqlCommand cmd = new SqlCommand("SELECT * FROM ERT WHERE CurStatus = @status", connection);
                cmd.Parameters.AddWithValue("@status", stat);

                using SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read()) 
                {
                    ert.Add(new ERT {
                        UserName = (string) reader["UserName"],
                        TicketDateTime = (DateTime) reader["DT"],
                        Title = (string) reader["Title"],
                        Description = (string) reader["Descrip"],
                        Amount = (decimal) reader["Amount"],
                        Status = (string) reader["CurStatus"],
                    });
                }
                return ert;
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Getting All ERT By Pending Status in DB: {ex}");
                throw;
            }
        }

        public void updateTicketStatusinDB(string username, DateTime dt, string status)
        {
            Log.Information("Update ERT Status To DB With SQL Connection And Command With Parameters");
            try
            {
                // Equivalent to opening Azure Data Studio and filling out the new connection form
                using SqlConnection connection = new SqlConnection(hide.getdbConnection()); 
                // Click the "Connect" button
                connection.Open();

                using SqlCommand cmd = new SqlCommand("UPDATE ERT SET CurStatus = @status WHERE DT = @datetime AND UserName = @username", connection);
                cmd.Parameters.AddWithValue("@status", status);
                cmd.Parameters.AddWithValue("@datetime", dt);
                cmd.Parameters.AddWithValue("@username", username);
                cmd.ExecuteNonQuery();
            }
            catch(SqlException ex)
            {
                Log.Warning($"SQL Exception While Updating ERT Status in DB: {ex}");
                throw;
            }
        }
    }

































