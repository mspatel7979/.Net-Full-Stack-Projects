﻿using System;

namespace FlowControl
{
    public class Program
    {
        //create global variables to hold users login data.
        public static string username;
        public static string password;

        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            //Challenge 1. Temperature Advice
            int temp = GetValidTemperature();
            GiveActivityAdvice(temp);

            //Challenge 2. Login system.
            Register();
            if (Login())
            {
                Console.WriteLine("Congratulations, You successfully logged in.");
            }

            //Challenge 3. Ternary Operators
            temp = GetValidTemperature();
            GetTemperatureTernary(temp);
        }

        // This method gets a valid temperaturebetween -40 asnd 135 inclusive 
        // and returns the valid int.
        public static int GetValidTemperature()
        {
            throw new NotImplementedException();
        }

        // This method has one int parameter
        // It gives outdoor activity advice and temperature opinion based on 20 degree
        // increments starting at -20 and ending at 135 
        // n < -20 = hella cold
        // -20 <= n < 0 = pretty cold
        //  0 <= n < 20 = cold
        // 20 <= n < 40 = thawed out
        // 40 <= n < 60 = feels like Autumn
        // 60 <= n < 80 = perfect outdoor workout temperature
        // 80 <= n < 90 = niiice
        // 90 <= n < 100 = hella hot
        // 100 <= n < 135 = hottest
        public static void GiveActivityAdvice(int temp)
        {
            throw new NotImplementedException();
        }

        // This method gets a username and password from the user
        // and stores that data in the global variables of the 
        // names in the method.
        public static void Register()
        {
            throw new NotImplementedException();
        }

        // This method gets username and password from the user and
        // compares them with the username and password global variables
        // or the names provided. If the password and username match,
        // the method returns true. If they do not match, the user is 
        // prompted again for the username and password.
        public static bool Login()
        {
            throw new NotImplementedException();
        }

        // This method as one int parameter.
        // It checks is the int is <=42, between
        // 43 and 78 inclusive, or > 78.
        // For each temperature range, a different 
        // advice is given. 
        public static void GetTemperatureTernary(int temp)
        {
           throw new NotImplementedException();
        }
    }//end of Program()
}
