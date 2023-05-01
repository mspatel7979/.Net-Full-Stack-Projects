namespace Models;
public class User
{
    public int UserID {get; set;}
    public string Username {get; set;}
    public string Password {get; set;}
    public string ZeldaCharacter {get; set;}
    public int CoinBank {get; set;} = 0;
    public int ClickPower {get; set;} = 1;

   /// <summary>
    /// Constructor Class for User Model
    /// </summary>
    /// <param name="id"></param>
    /// User's ID
    /// <param name="username"></param>
    /// User's username
    /// <param name="password"></param>
    /// User's Password
    /// <param name="zelda_character"></param>
    /// User's Legend of Zelda Character of Choice
    /// <param name="coin_bank"></param>
    /// User's Coin Bank
    /// <param name="click_power"></param>
    /// User's Click Power
    public User(int id, string username, string password, string zelda_character, int coin_bank, int click_power)
    {
        UserID = id;
        Username = username;
        Password = password;
        ZeldaCharacter = zelda_character;
        CoinBank = coin_bank;
        ClickPower = click_power;
    }

    public User(int id, string username, string password, string zelda_character)
    {
        UserID = id;
        Username = username;
        Password = password;
        ZeldaCharacter = zelda_character;
    }

    public User(){
        // Empty Constructor
    }
}
