CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer,
    product_id integer,
    CONSTRAINT FK_order_id FOREIGN KEY(order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,
    CONSTRAINT FK_product_id FOREIGN KEY(product_id)   
    REFERENCES products(id)
    ON DELETE CASCADE
);