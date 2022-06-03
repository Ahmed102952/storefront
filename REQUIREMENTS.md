# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index: 'products/' [GET]
-   Show: 'products/:id' [GET]
-   Create (args: product)[token required]: 'products/' [POST]
-   Delete [token required]: 'products/:id' [DELETE]

#### Users

-   Index [token required]: 'users/' [GET]
-   Show [token required]: 'users/:id' [GET]
-   Create (args: user)[token required]: 'users/' [POST]
-   Delete [token required]: 'users/:id' [DELETE]

#### Orders

-   All orders [token required]: 'orders/' [GET]
-   Current Order by user id[token required]: 'orders/:userID' [GET]
-   Create order (args: order)[token required]: 'orders/' [POST]
-   Delete order by order id[token required]: 'orders/:id' [Delete]
-   Add product to order (args: quantity, product_id) [token required]: 'orders/:orderID/product' [POST]

## Data Shapes

#### Products

-   id
-   name
-   price
-   category

```
Table: Products (id: serialprimary key, name: varchar not null, price: integer not null, category: varchar)
```

#### Users

-   id
-   firstName
-   lastName
-   password

```
Table: users (id: serial primary key, first_name: varchar not null, last_name: varchar not null, password: varchar)
```

#### Orders

-   id
-   user_id
-   status of order (active or complete)

```
Table: orders (id: serial primary key, user_id: integer not null reference id from users table, status: varchar)
```

#### order_product

-   id
-   quantity
-   order_id
-   product_id

```
Table: Product (id: serial primary key, quantity: integer, order_id: integer not null reference id from orders table, product_id: integer not null reference id from products table)
```
