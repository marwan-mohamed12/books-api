CREATE SCHEMA books_mangement_system ;

-- DROP SCHEMA books_mangement_system;


-- books_mangement_system.book definition

-- Drop table

-- DROP TABLE books_mangement_system.book;

CREATE TABLE books_mangement_system.book (
	book_id serial4 NOT NULL,
	book_title varchar(50) NOT NULL,
	book_description varchar(1000) NULL,
	book_author varchar(50) NOT NULL,
	book_puplisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(12) NOT NULL,
	created_on date NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

-- books_mangement_system.store definition

-- Drop table

-- DROP TABLE books_mangement_system.store;

CREATE TABLE books_mangement_system.store (
	store_id serial4 NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(20) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(50) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);