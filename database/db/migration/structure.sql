DROP TABLE IF EXISTS bookclubs_members;
DROP TABLE IF EXISTS bookclubs_books;
DROP TABLE IF EXISTS users_books;
DROP TABLE IF EXISTS bookclubs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;

CREATE TABLE users (
	id serial not null PRIMARY KEY,
	google_id varchar not null,
	first_name varchar not null,
	last_name varchar not null,
	email varchar not null unique,
	avatar varchar,
	created_date timestamp default current_timestamp
);

CREATE TABLE books (
	id serial not null PRIMARY KEY,
	goodreads_id integer,
	title varchar not null,
	author varchar not null,
	goodreads_rating varchar,
	image text,
	small_image text,
	added_date timestamp default current_timestamp
);

CREATE TABLE bookclubs (
	id serial not null PRIMARY KEY,
	name varchar not null,
	theme varchar not null,
	description text,
	created_date timestamp default current_timestamp
);

CREATE TABLE users_books (
	id serial not null PRIMARY KEY,
	book_id integer not null,
	FOREIGN KEY (book_id) REFERENCES books (id),
	user_id integer not null,
	FOREIGN KEY (user_id) REFERENCES users (id),
	added_date timestamp default current_timestamp,
	is_read boolean default false,
	rating integer not null default 0
);

CREATE TABLE bookclubs_books (
	id serial not null PRIMARY KEY,
	book_id integer not null,
	FOREIGN KEY (book_id) REFERENCES books (id),
	bookclub_id integer not null,
	FOREIGN KEY (bookclub_id) REFERENCES bookclubs (id),
	start_date date,
	end_date date,
	is_done boolean default false,
	rating real not null default 0
);

CREATE TABLE bookclubs_members (
	id serial not null PRIMARY KEY,
	user_id integer not null,
	FOREIGN KEY (user_id) REFERENCES users (id),
	bookclub_id integer not null,
	FOREIGN KEY (bookclub_id) REFERENCES bookclubs (id),
	joined_date timestamp default current_timestamp
)




























