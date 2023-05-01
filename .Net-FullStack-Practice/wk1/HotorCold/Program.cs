using System;

namespace HotorCold
{
	public class MainMenu
	{
		public void Start()
		{
			Console.WriteLine("Hello");

			var rand = new Random();
			int target = rand.Next(21);
			
			bool loop = true;
			while(loop)
			{
				Console.WriteLine("Please quess a number between 0 and 20: ");
				int guess = Int32.Parse(Console.ReadLine());
			
				if(guess == target)
				{
					Console.WriteLine("Congratulations, you guessed it!");
					loop = false;
				}
				else if(guess > target)
				{
					Console.WriteLine("OOPS! That was too high!");
				}
				else
				{
					Console.WriteLine("OOPS! That was too low!");
				}
			}
		}
	}
}

