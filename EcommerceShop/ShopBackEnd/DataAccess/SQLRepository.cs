using System.Text.Json;
using System.Data.SqlClient;
using Models;

namespace DataAccess;
public class SQLRepository : IRepository
{
    string connectionstring;
    public SQLRepository(string connectionstring)
    {
        this.connectionstring = connectionstring;
    }

    public User getUserinDB(string username)
    {
        try
        {
            User user = new User();
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("SELECT * FROM users WHERE username = @username", connection);
            cmd.Parameters.AddWithValue("@username", username);

            using SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                user = new User(
                    user.UserID = (int)reader["user_id"],
                    user.Username = (string)reader["username"],
                    user.Password = (string)reader["pass"],
                    user.ZeldaCharacter = (string)reader["player_character"],
                    user.CoinBank = (int)reader["coins"],
                    user.ClickPower = (int)reader["power"]
                );
            }
            return user;
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public User createUserinDB(User user)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("INSERT INTO users(username, pass, player_character, power, coins) VALUES (@username, @password, @z_character, @power, @coins)", connection);
            cmd.Parameters.AddWithValue("@username", user.Username);
            cmd.Parameters.AddWithValue("@password", user.Password);
            cmd.Parameters.AddWithValue("@z_character", user.ZeldaCharacter);
            cmd.Parameters.AddWithValue("@power", user.ClickPower);
            cmd.Parameters.AddWithValue("@coins", user.CoinBank);
            cmd.ExecuteNonQuery();
            return user;
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public int updateCoinBank(User user)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);

            connection.Open();

            using SqlCommand cmd = new SqlCommand("UPDATE users SET coins = @coins WHERE user_id = @id;", connection);
            cmd.Parameters.AddWithValue("@id", user.UserID);
            cmd.Parameters.AddWithValue("@coins", user.CoinBank);
            cmd.ExecuteNonQuery();
            return user.CoinBank;
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public int updateClickPower(User user)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("UPDATE users SET power = @power WHERE user_id = @id;", connection);
            cmd.Parameters.AddWithValue("@id", user.UserID);
            cmd.Parameters.AddWithValue("@power", user.ClickPower);
            cmd.ExecuteNonQuery();
            return user.ClickPower;
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public void putProduct(Product product)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("INSERT INTO products(product_name, product_description, product_price, product_base_increase) VALUES (@name,@desc,@price,@base_increase)", connection);
            cmd.Parameters.AddWithValue("@name", product.Name);
            cmd.Parameters.AddWithValue("@desc", product.Description);
            cmd.Parameters.AddWithValue("@price", product.Price);
            cmd.Parameters.AddWithValue("@base_increase", product.PowerIncrease);
            cmd.ExecuteNonQuery();
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public List<Product> getUserInventory(int u_id)
    {
        List<Product> ret = new List<Product>();
        Product p = new Product();
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("SELECT products.product_id, product_name, product_description, product_price, product_base_increase from inventories JOIN products ON products.product_id = inventories.product_id WHERE user_id = @id", connection);
            cmd.Parameters.AddWithValue("@id", u_id);

            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                ret.Add(new Product(
                    p.ProductID = (int)reader["product_id"],
                    p.Name = (string)reader["product_name"],
                    p.Description = (string)reader["product_description"],
                    p.Price = (int)reader["product_price"],
                    p.PowerIncrease = (int)reader["product_base_increase"]
                ));
            }
            return ret;
        }
        catch (SqlException ex)
        {
            throw;
        }
        return ret;
    }


    public void putProductInUserInventory(int uid, int pid)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("INSERT INTO inventories(user_id, product_id) VALUES (@uid,@pid)", connection);
            cmd.Parameters.AddWithValue("@uid", uid);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.ExecuteNonQuery();
        }
        catch (SqlException ex)
        {
            throw;
        }
    }
    public void putProductInUserCart(int uid, int pid)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("INSERT INTO carts(user_id, product_id) VALUES (@uid,@pid)", connection);
            cmd.Parameters.AddWithValue("@uid", uid);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.ExecuteNonQuery();
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public void deleteProductFromUserCart(int uid, int pid)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("DELETE FROM carts WHERE user_id = @uid AND product_id = @pid", connection);
            cmd.Parameters.AddWithValue("@uid", uid);
            cmd.Parameters.AddWithValue("@pid", pid);
            cmd.ExecuteNonQuery();
        }
        catch (SqlException ex)
        {
            throw;
        }
    }

    public List<Product> getProductsNotInInventory(int u_id)
    {
        List<Product> ret = new List<Product>();
        Product p = new Product();
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("select * from products WHERE product_id NOT IN (SELECT product_id from inventories where user_id = @id) AND product_id NOT IN (SELECT product_id FROM carts where user_id = @id)", connection);
            cmd.Parameters.AddWithValue("@id", u_id);

            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                ret.Add(new Product(
                    p.ProductID = (int)reader["product_id"],
                    p.Name = (string)reader["product_name"],
                    p.Description = (string)reader["product_description"],
                    p.Price = (int)reader["product_price"],
                    p.PowerIncrease = (int)reader["product_base_increase"]
                ));
            }
            return ret;
        }
        catch (SqlException ex)
        {
            throw;
        }
        return ret;
    }
    public List<Product> getUserCartofProducts(int u_id)
    {
        List<Product> ret = new List<Product>();
        Product p = new Product();
        try
        {
            using SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            using SqlCommand cmd = new SqlCommand("select * from products WHERE product_id in (select product_id from carts where user_id = @id)", connection);
            cmd.Parameters.AddWithValue("@id", u_id);

            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                ret.Add(new Product(
                    p.ProductID = (int)reader["product_id"],
                    p.Name = (string)reader["product_name"],
                    p.Description = (string)reader["product_description"],
                    p.Price = (int)reader["product_price"],
                    p.PowerIncrease = (int)reader["product_base_increase"]
                ));
            }
            return ret;
        }
        catch (SqlException ex)
        {
            throw;
        }
        return ret;
    }

    
}