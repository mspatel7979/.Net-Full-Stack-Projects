using Models;
using Serilog;
using DataAccess;
namespace Services;
    public class Service
    {
        // Dependency Injection: is a design pattern where the dependency of a class is injected through the constructor instead of the class itself having a specific knowledge of its dependency, or instantiating itself
        // This example here is actually a combination of dependency injection and dependency inversion
        // This allows for more flexible change in implementation, also this pattern makes unit testing much simpler
        private readonly IRepository _repo;
        //private FileStorage file = new FileStorage();
        public Service(IRepository repo) {
            _repo = repo;
        }

        public User getUserinDB(string username)
        {
            return  _repo.getUserinDB(username);
        }
        public List<ERT> GetAllERTTickets()
        {
            List<ERT> ert = new List<ERT>();
            return  _repo.GetAllERTTickets(ert);
        }
        public List<ERT> GetAllTicketsByUsername(string username)
        {
            List<ERT> ert = new List<ERT>();
            return _repo.GetAllTicketsByUsername(username, ert);
        }
        public List<ERT> GetAllPendingERT()
        {
            List<ERT> ert = new List<ERT>();
            return _repo.GetAllPendingERT(ert);
        }
        public User createUserinDB(User user)
        {
            try
            {
                return _repo.createUserinDB(user);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ERT createERTinDB(ERT ert)
        {
            try
            {
                return _repo.createERTinDB(ert);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void updateTicketStatusinDB(string username, DateTime dt, string status)
        {
            try
            {
                _repo.updateTicketStatusinDB(username, dt, status);
            }
            catch (Exception)
            {
                throw;
            }   
        }
        public bool checkForSameUsername(string userName)
        {
            // get the user from database by input of username match then return false to exit out of while true loop
            User user = _repo.getUserinDB(userName);
            if(user.UserName == userName){
                return false;
            }
            return true;
        }
    }
