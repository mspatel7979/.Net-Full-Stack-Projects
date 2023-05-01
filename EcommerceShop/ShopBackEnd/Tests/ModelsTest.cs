using Models;

namespace Tests;

public class ModelsTest
{
    [Fact]
    public void TestUserModel()
    {
        int user_id = 1;
        string username = "TestPlayer1";
        string password = "TestPlayer1";
        string zelda_character = "Link";
        int coin_bank = 0;
        int click_power = 1;
        User user = new User(user_id, username, password, zelda_character, coin_bank, click_power);
        Assert.Equal(user.UserID, user_id);
        Assert.Equal(user.Username, username);
        Assert.Equal(user.Password, password);
        Assert.Equal(user.ZeldaCharacter, zelda_character);
        Assert.Equal(user.CoinBank, coin_bank);
        Assert.Equal(user.ClickPower, click_power);
    }

    [Fact]
    public void TestUserModel2()
    {
        int user_id = 2;
        string username = "TestPlayer1";
        string password = "TestPlayer1";
        string zelda_character = "Zelda";
        User user = new User(user_id, username, password, zelda_character);
        Assert.Equal(user.UserID, user_id);
        Assert.Equal(user.Username, username);
        Assert.Equal(user.Password, password);
        Assert.Equal(user.ZeldaCharacter, zelda_character);
        Assert.Equal(user.CoinBank, 0);
        Assert.Equal(user.ClickPower, 1);
    }

    [Fact]
    public void TestProductModel()
    {
        int product_id = 1;
        string name = "productname";
        string des = "productdes";
        int price = 300;
        int power_increase = 2;
        Product product = new Product(product_id, name, des, price, power_increase);
        Assert.Equal(product.ProductID, product_id);
        Assert.Equal(product.Name, name);
        Assert.Equal(product.Description, des);
        Assert.Equal(product.Price, price);
        Assert.Equal(product.PowerIncrease, power_increase);
    }
    [Fact]
    public void TestProductModelUpgradeTotalChange()
    {
        Product product = new Product();
        Assert.Equal(product.UpgradeTotal, 0);
        product.UpgradeTotal++;
        Assert.Equal(product.UpgradeTotal, 1);
    }

    [Fact]
    public void TestCartModel()
    {
        int cart_id = 1;
        DateTime dt = DateTime.Now;
        Cart cart = new Cart(cart_id, dt);
        Assert.Equal(cart.CartID, cart_id);
        Assert.Equal(cart.CartDateTime, dt);
    }

    [Fact]
    public void TestInventoryModel()
    {
        int invent_id = 1;
        int upgrade_count = 5;
        Inventory invent = new Inventory(invent_id, upgrade_count);
        Assert.Equal(invent.InventoryID, invent_id);
        Assert.Equal(invent.UpgradeCount, upgrade_count);
    }
}