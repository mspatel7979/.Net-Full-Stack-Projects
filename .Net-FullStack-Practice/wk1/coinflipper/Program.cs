
using System;

namespace CoinFlipper
{
	public class MainMenu
	{
		public void Start()
		{
			Console.WriteLine("Coin Flipper Starting...");
				
			var rand = new Random();
			int value = rand.Next();
			Console.WriteLine("The Random Number is: " + value);

			bool coin = true;
			
			int remainder = value % 2;
			if(remainder == 0)
			{
				coin = false;
			}

			if(coin)
			{
				 Console.WriteLine("Your coin was flipped, it was tails");

			}
			else
			{
				Console.WriteLine("Your coin was flipped, it was heads");
			}
		}
	}
}
