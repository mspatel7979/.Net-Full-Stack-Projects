using Models;

public interface IRepository
{
    User getUserinDB(string username);
    User createUserinDB(User user);
    int updateCoinBank(User user);
    int updateClickPower(User user);
    void putProduct(Product product);
    List<Product> getUserInventory(int u_id);
    void putProductInUserInventory(int uid, int pid);
    void putProductInUserCart(int uid, int pid);
    void deleteProductFromUserCart(int uid, int pid);
    List<Product> getProductsNotInInventory(int u_id);
    List<Product> getUserCartofProducts(int u_id);
}