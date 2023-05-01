namespace Models;
public class Cart
{
    public int CartID {get; set;}
    public List<Product> ProductCart { get; set; }
    public DateTime CartDateTime { get; set; }

    /// <summary>
    /// Constructor Class for Cart Model That Holds List of Products
    /// </summary>
    /// <param name="id"></param>
    /// Cart's ID
    /// <param name="dt"></param>
    /// Cart's DateTime
    public Cart(int id, DateTime dt) {
        CartID = id;
        CartDateTime = dt;
        ProductCart = new List<Product>();
    }
    public Cart(){
        // Empty Constructor
    }
}