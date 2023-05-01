# TeamDBackEnd
    Team D Back End
    Developers : Sonya Wong, Meet Patel, Nick Wentzel

# Database Design Schema:
### Table: User
- User_id : primary key
- Username : unique/not null
- Password : string/not null
- Zelda Character: string not null
- User_base_amount_onClick : integer
- Coins : integer 
### Table: Cart
- Cart_id : primary key
- User_id : foreign key reference User(user_id)
- Product_id : foreign key references Product(Product_id)
- Cart_datetime_created : DateTime
### Table: Product
- Product_id: primary key
- name : string/ not hull
- description : string not null
- price : integer
- base_increase: integer
### Table: inventory
- Inventory_id : primary key
- Inventory_User_id : foreign key reference User(user_id)
- Product_id : foreign key references Product(Product_id)
- P_upgrade_count : int


