const faker = require('faker');
const fs = require('fs');
let query = [];

//query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating) VALUES ('${faker.lorem.words()}', '${faker.name.findName().replace(/'/g, '\'\'')}', 123, '3.4')`);

// 11 books in books table
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('The Forgotten Garden', 'Kate Morton', 3448086, '4.13', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1547843777l/3407877._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Britt-Marie Was Here', 'Fredrik Backman', 41818210, '4.07', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1460442061l/27406704._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('A Man Called Ove', 'Fredrik Backman', 21619954, '4.36', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1405259930l/18774964._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Harry Potter and the Sorcerer''s Stone (Harry Potter, #1)', 'J.K. Rowling', 4640799, '4.47', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Harry Potter and the Chamber of Secrets (Harry Potter, #2)', 'J.K. Rowling', 6231171, '4.41', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474169725l/15881._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Pride and Prejudice', 'Jane Austin', 3060926, '4.23', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Call Me By Your Name (Call Me By Your Name, #1)','André Aciman', 1363157, '4.27', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519203520l/36336078._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('The Shadow of the Wind (The Cemetery of Forgotten Books, #1)', 'Carlos Ruiz Zafón', 3209783, '4.26', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1344545047l/1232._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('The Prisoner of Heaven (The Cemetery of Forgotten Books, #3)', 'Carlos Ruiz Zafón', 18067409, '4.00', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1335994402l/13623012._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('My Brilliant Friend (The Neapolitan Novels, #1)', 'Elena Ferrante', 19174054, '3.93', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1493655783l/35036409._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('The Story of a New Name (The Neapolitan Novels, #2)', 'Elena Ferrante', 26129550, '4.37', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1501012849l/17465515._SX98_.jpg')`);

query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Watch Me', 'Anjelica Huston', 40712984, '4.37', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415677321l/21412240._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('The People in the Trees', 'Hanya Yanagihara', 21950352, '4.37', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1356108388l/16126596._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('A Little Life', 'Hanya Yanagihara', 42375710, '4.37', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1446469353l/22822858._SX98_.jpg')`);

//vampire 15,16,17
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Vampire Academy (Vampire Academy, #1)', 'Richelle Mead', 335933, '4.13', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361098973l/345627._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Frostbite (Vampire Academy, #2)', 'Richelle Mead', 6651004, '4.29', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361098960l/2282133._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Shadow Kiss (Vampire Academy, #3)', 'Richelle Mead', 6651006, '4.36', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361099049l/2802316._SX98_.jpg')`);


// 18,19,20

query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Happiness: Essential Mindfulness Practices', 'Thich Nhat Hanh', 6742950, '4.06', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328698122l/6550421._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Zen and the Art of Faking It', 'Jordan Sonnenblick', 714855, '3.72', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328842996l/728654._SX98_.jpg')`);
query.push(`INSERT INTO books (title, author, goodreads_id, goodreads_rating, image) VALUES ('Romeo och Juliet', 'William Shakespeare', 3349450, '3.74', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1332704181l/13560572._SY160_.jpg')`);

// 4 users in users table
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('114500131793469053014','Oana', 'Fatu', 'oana.fatu@appliedtechnology.se', '/avatars/avatar1.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('115257051944211650687','Andrea', 'Gylling', 'andreagylling@gmail.com', '/avatars/avatar4.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('105374911423642235539','Nils', 'Andersson', 'nils.andersson@appliedtechnology.se', '/avatars/avatar2.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('114256998440541403109','Laszlo', 'Bottlik', 'lazslo.bottlik@appliedtechnology.se', '/avatars/avatar21.svg')`);

// 6 fake users
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('123','Amelia', 'Bob', 'amelia@bob.com', '/avatars/avatar15.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('456','Bob', 'Doe', 'bob@doe.com', '/avatars/avatar16.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('789','John', 'Jam', 'john@jam.com', '/avatars/avatar17.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('101112','Carmen', 'Starts', 'carmen@starts.com', '/avatars/avatar18.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('1314','Vlad', 'Tepes', 'vlad@tepes.com', '/avatars/avatar14.svg')`);
query.push(`INSERT INTO users (google_id, first_name, last_name, email, avatar) VALUES ('1516','Adrian', 'Star', 'adrian@star.com', '/avatars/avatar13.svg')`);


// 4 booksclubs
query.push(`INSERT INTO bookclubs (name, theme, description) VALUES ('Read with Friends', 'Romantic', '${faker.lorem.paragraph()}')`);
query.push(`INSERT INTO bookclubs (name, theme, description) VALUES ('Read SF books', 'SF', '${faker.lorem.paragraph()}')`);
query.push(`INSERT INTO bookclubs (name, theme, description) VALUES ('Kids bookclub', 'Kids', '${faker.lorem.paragraph()}')`);
query.push(`INSERT INTO bookclubs (name, theme, description) VALUES ('Vampire lovers', 'Vampire', '${faker.lorem.paragraph()}')`);

// 4 read books in user1 library
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (1, 1, true, 3)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (2, 1, true, 4)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (3, 1, true, 4)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (4, 1, true, 5)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (13, 1, true, 1)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (10, 1, true, 1)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (18, 1, true, 4)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (19, 1, true, 3)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (20, 1, true, 5)`);

// 4 unread books in user1 library
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (5, 1, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (6, 1, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (7, 1, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (8, 1, false)`);

//vampire books user1
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (15, 1, true, 3)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (16, 1, true, 1)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (17, 1, true, 2)`);

// 4 unread books in user 2 library
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (12, 2, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (13, 2, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (14, 2, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (10, 2, false)`);

// 4 read books in user 2 library
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (5, 2, true, 3)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (6, 2, true, 4)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (13, 2, true, 1)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read, rating) VALUES (7, 2, true, 5)`);


// current book added to members of the bookclub 1
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (2, 2, false)`);
query.push(`INSERT INTO users_books (book_id, user_id, is_read) VALUES (2, 4, false)`);


// insert rated books in bookclub 1
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (1, 1, true, 3.5)`);
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (5, 1, true, 4.2)`);
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (3, 1, true, 4.7)`);
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (4, 1, true, 3.3)`);

// insert rated books in bookclub 4
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (15, 4, true, 3)`);
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, rating) VALUES (16, 4, true, 4)`);

// insert currently reading book in bookclub 4
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, start_date, end_date) VALUES (17, 4, false, '2019-07-16', '2019-07-26')`);

// insert currently reading book in bookclub 1
query.push(`INSERT INTO bookclubs_books (book_id, bookclub_id, is_done, start_date, end_date) VALUES (2, 1, false, '2019-07-01', '2019-07-25')`);

// 6 members in bookclub 1
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 1)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 2)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 4)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 5)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 6)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (1, 7)`);

// 1 member in bookclub 2,3,4
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (2, 1)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (3, 1)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 1)`);

//fake members in bookclub 4
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 5)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 6)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 7)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 8)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 9)`);
query.push(`INSERT INTO bookclubs_members (bookclub_id, user_id) VALUES (4, 10)`);

fs.writeFileSync(__dirname + '/data.sql', query.join("; \n"));

