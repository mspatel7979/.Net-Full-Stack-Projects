namespace Models;
    public class User
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName{get; set;}
        public string LastName{get; set;}
        public string Position {get; set;}

        public User(){
        
        }
        public User(string userName, string password, string firstName, string lastName, string position)
        {
            UserName = userName;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            Position = position;
        }

        public override string ToString()
        {
            string s = string.Format("UserName: {0} \nPassword: {1} \nFirstName: {2} \nLastName: {3} \nPosition: {4}", UserName, Password, FirstName, LastName, Position);
            return s;
        } 
    }