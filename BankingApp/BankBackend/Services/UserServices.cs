using DataAccess.Entities;

namespace Services;
public class UserServices
{
    private readonly WizardingBankDbContext _context;

    public UserServices(WizardingBankDbContext context)
    {

        _context = context;

    }
    public User CreateUser(User a)
    {
        _context.Add(a);

        _context.SaveChanges();
        // _context.ChangeTracker.Clear();
        return a;
    }

    public List<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public User GetUser(int id)
    {
        return _context.Users.FirstOrDefault(w => w.Id == id)!;

    }

    public User UpdateUser(User u)
    {
        _context.Update(u);
        _context.Users.ToList();
        _context.SaveChanges();
        return u;
    }

    public User DeleteUser(User u)
    {
        _context.Remove(u);
        _context.SaveChanges();
        return u;
    }

    public List<User> GetUser(string email)
    {
        return (List<User>)_context.Users.Where(w => w.Email == email).ToList();

    }

    //   public List<User> GetUser(string username, string password)
    // {
    //     return (List<User>)_context.Users.Where(w => w.Username == username && w.Password == password).ToList();

    // }

    public User? UpdateWallet(int id, decimal? ammount)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);
        if (user != null)
        {
            user.Wallet += ammount;
            _context.SaveChanges();
            return user;
        }
        return null;
    }





}