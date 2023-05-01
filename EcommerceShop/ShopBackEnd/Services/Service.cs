using Models;
using DataAccess;

namespace Services;
public class Service
{
    private readonly IRepository _repo;
    public Service(IRepository repo)
    {
        _repo = repo;
    }

    public User getUserinDB(string username)
    {
        return  _repo.getUserinDB(username);
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
    public int updateCoinBank(User user){
        try
        {
            return _repo.updateCoinBank(user); 
        }
        catch (Exception)
        {
            throw;
        }
    }
    public int updateClickPower(User user){
        try
        {
            return _repo.updateClickPower(user); 
        }
        catch (Exception)
        {
            throw;
        }
    }
    public void putProduct(Product product){
        try
        {
            _repo.putProduct(product);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public List<Product> getUserInventory(int u_id){
        try
        {
            return _repo.getUserInventory(u_id);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public void putProductInUserInventory(int uid, int pid)
    {
        try
        {
            _repo.putProductInUserInventory(uid, pid);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public void putProductInUserCart(int uid, int pid)
    {
        try
        {
            _repo.putProductInUserCart(uid, pid);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public void deleteProductFromUserCart(int uid, int pid)
    {
        try
        {
            _repo.deleteProductFromUserCart(uid, pid);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public List<Product> getProductsNotInInventory(int u_id)
    {
        try
        {
            return _repo.getProductsNotInInventory(u_id);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public List<Product> getUserCartofProducts(int u_id)
    {
        try
        {
            return _repo.getUserCartofProducts(u_id);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
