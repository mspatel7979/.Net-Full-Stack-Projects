using Models;

public interface IRepository
{
/*
    /// <summary>
    /// Retrieves all workout sessions
    /// </summary>
    /// <returns>a list of workout sessions</returns>
    List<User> GetAllUser();

    /// <summary>
    /// Persists a new workout session to storage
    /// </summary>
    void CreateNewUser(User sessionToCreate);

    List<TicketSession> GetAllTicket();

    void CreateNewSession(TicketSession sessionToCreate);
*/
    void createUserinDB(User user);
    User getUserinDB(string username);
    void createERTinDB(ERT ert);
    List<ERT> GetAllERTTickets(List<ERT> ert);
    List<ERT> GetAllTicketsByUsername(string username, List<ERT> ert);
    List<ERT> GetAllPendingERT(List<ERT> ert);
    void updateTicketStatusinDB(string username, DateTime dt, string status);
}