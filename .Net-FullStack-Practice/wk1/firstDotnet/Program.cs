namespace DotNetFirst
{
	public class MainMenu
	{
		public void Start()
		{
			Console.WriteLine("Starting Program...");

			string userInput = Console.ReadLine();

			Console.WriteLine(userInput);

			if (5>4)
			{
				Console.WriteLine("Five is greater than Four!");
			}
			if (4>5)
			{
				Console.WriteLine("Four is greater than Five!");
			}

			int balance = 100;

			if (balance <= 0)
			{
				Console.WriteLine("Accpunt Balance Must not have a negative balance!");
			}
			else 
			{
				Console.WriteLine(balance);
			}

			Console.WriteLine("Ending Program");
		}
	}
}
