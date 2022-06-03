CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE, 
    status VARCHAR
);