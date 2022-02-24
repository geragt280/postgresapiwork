CREATE DATABASE productsdb;

CREATE TABLE books(
    book_id SERIAL PRIMARY KEY,
    book_name VARCHAR(255),
    book_author VARCHAR(255)
);

CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(255),
    student_contact VARCHAR(255)
);

ALTER TABLE books 
RENAME COLUMN book_description TO book_name;

UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;