namespace Models;
public class Inventory
{
    public int InventoryID {get; set;}
    public int UpgradeCount {get; set;}
    public List<Product> ProductInventory { get; set; }

    /// <summary>
    /// Constructor CLass for Inventory Model
    /// </summary>
    /// <param name="id"></param>
    /// Inventory's ID
    /// <param name="upgrade_count"></param>
    /// Inventory's Upgrade Count 
    public Inventory(int id, int upgrade_count){
        InventoryID = id;
        UpgradeCount = upgrade_count;
        ProductInventory = new List<Product>();
    }
}