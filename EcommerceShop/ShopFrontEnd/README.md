# TeamDFrontEnd
    Team D Front End
    Developers : Sonya Wong, Meet Patel, Nick Wentzel

# Zelda Bazaar

## Project Overview
This project is an e-commerce site where users can purchase items from the Legend of Zelda series. Money can be used to purchase power ups from the item shop. Bought power ups are displayed to users and help increase the amount of money obtained from each click in a minigame. Users are able to create an account, log in to their registered account, browse items, add items to their cart, and purchase items.

## MVP Goals
### As a user:
- I can login
- Register for an account
- Click on Link/Zelda to generate coins
- Buy power ups from the store to increase base amount of coins generated in profile page
- See the list of available products to buy. If already bought, it will be displayed in a “owned power ups” section
- Power ups can be added/deleted from a cart for checkout. The total will be subtracted from user’s income

### Stretch goals:
- Allow for item upgrades
- Allow users to add friends and view their friend’s character
- Make the game functionally Auto coin generating
- Allow users to dress up Link/Zelda

### Git practices:
- Communication on Teams regularly on daily progress 
- Management of Trello Board can be maintained by all team members
- Separate front end and back end
- Personal branches
- nclude a dev branch(?)
- Code review frequency: every pull (merge) request
    - Code must build and does what it is supposed to
    - Code must have 50% unit test coverage (backend)
    - Complies to SOLID design principle
    - Using C#/ASP.NET/ADO.NET/SQL
- Include Comments on Functions/Classes describing basic summary or purpose and what 
- Merge before submitting PR
    Coding style: C# at Google Style Guide | styleguide
    - Pascal for classes/methods
    - Camel case for variables
    - Pascal plural for DB tables

### External API : Hyrule Compendium API 
- An API serving data on all creatures, monsters, materials, equipment, and treasure in The Legend of Zelda: Breath of the Wild
    - The Hyrule compendium is an encyclopedia of all in-game interactive items. With this brilliant API, you can access this data from code and embed it into your own application. 385 entries and 5 categories of entries make up the compendium.
- URL - https://gadhagod.github.io/Hyrule-Compendium-API/#/
- Uses
    - Creatures/Equipment/Materials/Monsters/Treasure data 
    - Images of all Entries 
    
### Trello Board 
- Team Management 
- URL : https://trello.com/b/V8mD9Sxc/team-d-project-2

### WEB API EndPoint Calls
- User
    - Login/Register
    - Update Coins/Power
- Product
    - Add Products
- Cart
    - Get User’s Cart
    - Add to Cart
    - Remove from Cart
- Inventory
    - Get User’s Owned Inventory
    - Get User’s UnOwned Inventory
    - Add Product to User’s Inventory
	

