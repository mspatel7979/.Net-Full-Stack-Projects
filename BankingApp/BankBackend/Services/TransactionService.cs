using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class TransactionServices
{
    private readonly WizardingBankDbContext _context;


    public TransactionServices(WizardingBankDbContext context)
    {
        _context = context;
    }

    public List<Transaction> GetAllTransactions()
    {
        return _context.Transactions.ToList();
    }
    public List<Transaction> GetTransactionsByUserId(int id)
    {
        return (List<Transaction>)_context.Transactions.Where(w => w.SenderId == id || w.RecipientId == id).OrderByDescending(w => w.CreatedAt).ToList();
    }
    public List<Object> GetLimitedTransactionsByUserId(int id)
    {
        List<Object> transactions = new List<Object>();

        var result = from transaction in _context.Transactions

                     join sender in _context.Users on transaction.SenderId equals sender.Id into senderGroup
                     from sender in senderGroup.DefaultIfEmpty()
                     join recipient in _context.Users on transaction.RecipientId equals recipient.Id into recipientGroup
                     from recipient in recipientGroup.DefaultIfEmpty()
                     where transaction.RecipientId == id || transaction.SenderId == id
                     orderby transaction.CreatedAt descending
                     select new
                     {
                         transaction.Id,
                         transaction.Amount,
                         transaction.CreatedAt,
                         SenderEmail = (transaction.SenderType == true) ?
                                         _context.Businesses.FirstOrDefault(b => b.Id == transaction.SenderId).Email :
                                         _context.Users.FirstOrDefault(u => u.Id == transaction.SenderId).Email,
                         RecipientEmail = (transaction.RecpientType == true) ?
                                         _context.Businesses.FirstOrDefault(b => b.Id == transaction.RecipientId).Email :
                                         _context.Users.FirstOrDefault(u => u.Id == transaction.RecipientId).Email,
                         transaction.Description,
                         transaction.Status
                     };

        var results = result.Take(10).ToList();
        foreach (Object obj in results)
        {
            transactions.Add(obj);
            Console.WriteLine(obj);
        }
        return transactions;
    }
    public List<Object> GetTransactionsWithEmails(int id)
    {

        List<Object> transactions = new List<Object>();

        var result = from transaction in _context.Transactions

                     join sender in _context.Users on transaction.SenderId equals sender.Id into senderGroup
                     from sender in senderGroup.DefaultIfEmpty()
                     join recipient in _context.Users on transaction.RecipientId equals recipient.Id into recipientGroup
                     from recipient in recipientGroup.DefaultIfEmpty()
                     where transaction.RecipientId == id || transaction.SenderId == id
                     orderby transaction.CreatedAt descending
                     select new
                     {
                         transaction.Id,
                         transaction.Amount,
                         transaction.CreatedAt,
                         SenderEmail = (transaction.SenderType == true) ?
                                         _context.Businesses.FirstOrDefault(b => b.Id == transaction.SenderId).Email :
                                         _context.Users.FirstOrDefault(u => u.Id == transaction.SenderId).Email,
                         RecipientEmail = (transaction.RecpientType == true) ?
                                         _context.Businesses.FirstOrDefault(b => b.Id == transaction.RecipientId).Email :
                                         _context.Users.FirstOrDefault(u => u.Id == transaction.RecipientId).Email,
                         transaction.Description,
                         transaction.Status
                     };

        foreach (Object obj in result)
        {
            transactions.Add(obj);
            Console.WriteLine(obj);
        }
        return transactions;
    }


    public Transaction CreateTransaction(Transaction transact)
    {
        //Transaction tempTransac = transact;
        transact.CreatedAt = DateTime.Now;
        _context.Transactions.Add(transact);
        _context.SaveChanges();

        return transact;
    }


    public Transaction UpdateTransaction(Transaction transact)
    {
        _context.Transactions.Update(transact);
        // _context.Transactions.ToList();
        _context.SaveChanges();

        return transact;
    }

    public Transaction DeleteTransaction(Transaction transact)
    {
        _context.Transactions.Remove(transact);
        _context.SaveChanges();

        return transact;
    }


    public Transaction? walletToAccount(Transaction transact)
    {
        Account? account = this.getAccountById((int)transact.AccountId!);
        if (transact.SenderType == true)
        {
            Business busi = this.getBusinessById((int)transact.SenderId!);
            if (busi.Wallet >= transact.Amount && busi != null && account != null)
            {
                this.updateBWallet(busi.Id, -transact.Amount);
                this.updateAccountBalance(account.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();
                return transact;

            }
        }
        else
        {
            User user = this.getUser((int)transact.SenderId!);
            if (user.Wallet >= transact.Amount && account != null && user != null)
            {
                this.updateWallet(user.Id, -transact.Amount);
                this.updateAccountBalance(account.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();
                return transact;
            }
        }

        return null;
    }

    public Transaction? walletToCard(Transaction transact)
    {

        if (transact.SenderType == true)
        {
            Business busi = this.getBusinessById((int)transact.SenderId!);
            if (busi.Wallet >= transact.Amount)
            {
                this.updateBWallet(busi.Id, -transact.Amount);
                Card card = this.GetCard((int)transact.CardId!);
                this.updateCardBalance(card.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();
                return transact;
            }

        }
        else
        {
            User user = this.getUser((int)transact.SenderId!);
            if (user.Wallet >= transact.Amount)
            {
                this.updateWallet(user.Id, -transact.Amount);
                Card card = this.GetCard((int)transact.CardId!);

                this.updateCardBalance(card.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();
                return transact;
            }
        }
        return null;
    }


    public Transaction? acctToWallet(Transaction transact)
    {
        Account? acct = this.getAccountById((int)transact.AccountId!);

        if (acct != null && acct.Balance >= transact.Amount)
        {
            if (transact.RecpientType == true)
            {
                this.updateAccountBalance(acct.Id, -transact.Amount);
                Business busi = this.getBusinessById((int)transact.RecipientId!);
                this.updateBWallet(busi.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();

                return transact;

            }
            else
            {
                this.updateAccountBalance(acct.Id, -transact.Amount);
                User user = this.getUser((int)transact.RecipientId!);
                this.updateWallet(user.Id, transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();

                return transact;
            }
        }
        return null;
    }



    public Transaction? cardToWallet(Transaction transact)
    {
        Card? card = this.GetCard((int)transact.CardId!);

        if (card.Balance >= transact.Amount && transact != null)
        {
            if (transact.RecpientType == true)
            {
                Business busi = this.getBusinessById((int)transact.RecipientId!);
                this.updateBWallet(busi.Id, transact.Amount);
                this.updateCardBalance(card.Id, -transact.Amount);
                _context.Transactions.Add(transact);
                _context.SaveChanges();

                return transact;
            }
            else
            {
                User user = this.getUser((int)transact.RecipientId!);
                this.updateWallet(user.Id, transact.Amount);
                this.updateCardBalance(card.Id, -transact.Amount);

                _context.Transactions.Add(transact);
                _context.SaveChanges();
                return transact;
       }
        }

        return null;
    }


    //User to User transaction
    public Transaction? userToUser(Transaction transact)
    {
        if (transact.RecpientType == true)
        {
            Business busReceiver = this.getBusinessById((int)transact.RecipientId!);
            if (busReceiver != null && transact != null && transact.SenderType == true)
            {
                Business busi = this.getBusinessById((int)transact.SenderId!);
                if (busi != null && busi.Wallet >= transact.Amount)
                {
                    this.updateBWallet(busi.Id, -transact.Amount);
                    this.updateBWallet(busReceiver.Id, transact.Amount);
                    _context.Transactions.Add(transact);
                    _context.SaveChanges();
                    return transact;
                }
            }

            else
            {
                User user = this.getUser((int)transact.SenderId);
                if (user != null && busReceiver != null && transact != null && user.Wallet >= transact.Amount)
                {
                    this.updateWallet(user.Id, -transact.Amount);
                    this.updateBWallet(busReceiver.Id, transact.Amount);
                    _context.Transactions.Add(transact);
                    _context.SaveChanges();
                    return transact;

                }
            }
        }
        else
        {
            User receiver = this.getUser((int)transact.RecipientId!);
            if (receiver != null && transact != null && transact.SenderType == true)
            {
                Business busi = this.getBusinessById((int)transact.SenderId!);
                if (busi != null && busi.Wallet >= transact.Amount)
                {
                    this.updateBWallet(busi.Id, -transact.Amount);
                    this.updateWallet(receiver.Id, transact.Amount);
                    _context.Transactions.Add(transact);
                    _context.SaveChanges();
                    return transact;

                }
            }
            else
            {
                User user = this.getUser((int)transact.SenderId);
                if (user != null && receiver != null && transact != null && user.Wallet >= transact.Amount)
                {
                    this.updateWallet(user.Id, -transact.Amount);
                    this.updateWallet(receiver.Id, transact.Amount);
                    _context.Transactions.Add(transact);
                    _context.SaveChanges();
                    return transact;
                }
            }
        }
        return null;
    }


    public User? updateWallet(int id, decimal? ammount)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);
        if (user != null)
        {
            user.Wallet += ammount;
            return user;
        }
        return null;
    }
    public User getUser(int id)
    {
        return _context.Users.FirstOrDefault(w => w.Id == id)!;
    }

    public Card? updateCardBalance(int cId, decimal? amt)
    {
        var card = _context.Cards.FirstOrDefault(c => c.Id == cId);
        if (card != null)
        {
            card.Balance += amt;
            return card;
        }

        return null;
    }

    public Card GetCard(int cardId)
    {
        return _context.Cards.FirstOrDefault(card => card.Id == cardId)!;
    }


    public Account? updateAccountBalance(int id, decimal? bal)
    {
        var account = _context.Accounts.FirstOrDefault(a => a.Id == id);
        if (account != null)
        {
            account.Balance += bal;
            return account;
        }
        return null;
    }


    //get Account by accountid


    public Account? getAccountById(int id)
    {
        var account = _context.Accounts.FirstOrDefault(a => a.Id == id);

        if (account != null)
        {
            return account;
        }
        return null;
    }

    public List<User> getUserByEmail(string email)
    {
        return (List<User>)_context.Users.Where(w => w.Email == email).ToList();

    }


    public Business? updateBWallet(int id, decimal? amt)
    {
        var user = _context.Businesses.FirstOrDefault(u => u.Id == id);
        if (user != null)
        {
            user.Wallet += amt;
            _context.SaveChanges();
            return user;
        }
        return null;
    }


    public Business getBusinessById(int businessId)
    {
        return _context.Businesses.FirstOrDefault(w => w.Id == businessId)!;
    }
}