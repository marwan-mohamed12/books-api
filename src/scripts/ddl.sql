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
	store_code varchar(10) NOT NULL,
	created_on date NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

-- app-audit

CREATE TABLE books_mangement_system.app_audit (
    audit_id serial4 NOT NULL,
    audit_action varchar(100) NOT NULL,
    audit_data json NOT NULL,
    audit_status varchar(50) NULL,
    audit_error json NULL,
    audit_by varchar(50) NOT NULL,
    audit_on date NOT NULL,
    CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

-- User mangemet tables

CREATE TABLE books_mangement_system.app_user (
	user_id serial4 NOT NULL,
	username varchar(100) NOT NULL,
	secretword varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	full_name varchar(500) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on date NULL,
	created_by varchar(100) NULL,
	updated_on date NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);

CREATE TABLE books_mangement_system.app_group (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);

CREATE TABLE books_mangement_system.app_role (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);

CREATE TABLE books_mangement_system.user_group (
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE books_mangement_system.group_role (
	group_role_id serial NOT NULL,
	group_id int4 NULL,
    role_id int4 null,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE books_mangement_system.user_type (
	user_type_id serial NOT NULL,
	user_type_name varchar(500) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);