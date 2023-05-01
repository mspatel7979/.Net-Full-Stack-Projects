namespace Models;
    public class ERT
    {
        public string UserName{ get; set; }
        public DateTime TicketDateTime{ get; set; }
        public string Title{get; set;}
        public string Description{get; set;}
        public decimal Amount {get; set;}
        public string Status {get; set;}

        public ERT(){

        }

        public ERT(string username, DateTime ticketdatetime, string title, string des, decimal amount, string status)
        {
            UserName = username;
            TicketDateTime = ticketdatetime;
            Title = title;
            Description = des;
            Amount = amount;
            Status = status;
        }
        public override string ToString()
        {
            string s = string.Format("UserName: {0} \nDateTime: {1} \nTitle: {2} \nDescription: {3} \nAmount: {4} \nStatus: {5}", UserName, TicketDateTime, Title, Description, Amount, Status);
            return s;
        } 
    }