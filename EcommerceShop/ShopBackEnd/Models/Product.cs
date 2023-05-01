namespace Models;
public class Product
{
    public int ProductID {get; set;}
    public string Name {get; set;} 
    public string Description {get; set;}
    public int Price {get; set;}
    public int PowerIncrease {get; set;}
    public int UpgradeTotal {get; set;} = 0;

    /// <summary>
    /// Constructor Class for Product Model
    /// </summary>
    /// <param name="id"></param>
    /// Product's ID
    /// <param name="name"></param>
    /// Product's Name
    /// <param name="description"></param>
    /// Product's Description
    /// <param name="price"></param>
    /// Product's Buy Price
    /// <param name="power_increase"></param>
    /// Product's Power Increase Amount
    public Product(int id, string name, string description, int price, int power_increase)
    {
        ProductID = id;
        Name = name;
        Description = description;
        Price = price;
        PowerIncrease = power_increase;
    }

    public Product(){
        // Empty Constructor
    }
}