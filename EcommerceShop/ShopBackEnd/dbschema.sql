CREATE TABLE users(
    user_id int PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(32) NOT NULL,
    pass VARCHAR(200) NOT NULL,
    player_character VARCHAR(32) NOT NULL,
    power int,
    coins int
);

CREATE TABLE products(
    product_id int PRIMARY KEY IDENTITY(1,1),
    product_name VARCHAR(32) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_price int not null,
    product_base_increase int not null
);

CREATE TABLE carts(
    cart_id int PRIMARY KEY IDENTITY(1,1),
    user_id int FOREIGN KEY REFERENCES users(user_id),
    product_id int FOREIGN KEY REFERENCES products(product_id),
    cart_datetime_created DATETIME
);

CREATE TABLE inventories(
    inventory_id int PRIMARY KEY IDENTITY(1,1),
    user_id int FOREIGN KEY REFERENCES users(user_id),
    product_id int FOREIGN KEY REFERENCES products(product_id),
    product_upgrade_count int
);
