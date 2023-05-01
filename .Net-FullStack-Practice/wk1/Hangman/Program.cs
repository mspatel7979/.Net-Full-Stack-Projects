Console.WriteLine("HangMan Game");

String[] wordlist = new String[] {"world", "pizza", "father", "mother", "game", "zebra", "football", "kingdom", "house", "positive"};
var rand = new Random().Next(wordlist.Length);
//Console.WriteLine(wordlist[rand]);
int lives = 7;
string mysterywordfiller = wordlist[rand];
char[] mw = new char[mysterywordfiller.Length];
Console.WriteLine("Here is the letter you must find:");
for(int i = 0; i < mysterywordfiller.Length; i++)
{
    mw[i] = '|';
}
Console.WriteLine(mw);
 while(lives != 0)
{
    Console.WriteLine("Enter a character to guess for the word [a-z]");
    
    char charGuess = char.Parse(Console.ReadLine());
    bool change = false;
    for(int i = 0; i < mysterywordfiller.Length; i++)
    {
        if (charGuess == mysterywordfiller[i])
        {
            mw[i] = charGuess;
            change = true;
        }
    }
    if(change == false)
    {
        Console.WriteLine("You guessed wrong try again!!!!!!");
        lives--;
    }
    Console.WriteLine(mw);
    string wordcompare = new string(mw);
    if(wordcompare == mysterywordfiller){
        break;
    } 
}
if(lives > 0)
{
    Console.WriteLine("VICTORY YOU WON THE HANGMAN GAME!!!!!!");
}
else
{
    Console.WriteLine("GAME OVER INSERT COIN TO PLAY AGAIN");
}
