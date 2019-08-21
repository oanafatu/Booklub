const { executeQuery } = require('./connectionPool');

const insertBooks = `
  INSERT INTO books (title, author, goodreads_id, goodreads_rating, image, small_image)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id;
`;
const insertUsersBooks = 'INSERT INTO users_books (book_id, user_id) VALUES ($1, $2);';
const selectBooks = 'SELECT * FROM books WHERE goodreads_id = $1;';
const selectUsersBooks = 'SELECT * FROM users_books WHERE book_id = $1 AND user_id = $2;';
const selectUserLibrary = `
  select b.id, b.title, b.author, b.image, ub.is_read, ub.rating from users_books as ub 
  inner join books as b on ub.book_id = b.id
  where ub.user_id = $1 ORDER BY b.added_date DESC;
`;
const removeUsersBooks = `
  DELETE FROM users_books 
  WHERE user_id = $1 AND book_id = $2;
`;
const insertBookclubs = `
  INSERT INTO bookclubs (
  name, theme, description) 
  VALUES ($1, $2, $3)
  RETURNING id;
`;

const insertBookclubsMembers = `
INSERT INTO bookclubs_members (user_id, bookclub_id)
VALUES ($1, $2);
`;

const selectBookclubs = 'SELECT * FROM bookclubs WHERE id = $1;';

const selectBookclubsMembers = `
  SELECT u.id, u.first_name, u.last_name, u.avatar
  FROM bookclubs_members AS bm
  INNER JOIN users AS u ON u.id = bm.user_id
  WHERE bm.bookclub_id = $1;
`;

const selectBookclubsBooks = `
  SELECT b.id, b.title, b.author, b.image, bb.start_date, bb.end_date, bb.is_done, bb.rating 
  FROM bookclubs_books as bb
  INNER JOIN books as b ON bb.book_id = b.id
  WHERE bb.bookclub_id = $1 ORDER BY bb.id DESC;
`;

const selectUsers = 
'SELECT * FROM users WHERE email= $1;';

const searchInBookclubsUsers = 'SELECT * FROM bookclubs_members WHERE user_id=$1 AND bookclub_id=$2;'; 

const selectAllClubsforUser = `
SELECT b.id, b.name, b.created_date FROM bookclubs_members AS bm
INNER JOIN bookclubs AS b ON bm.bookclub_id = b.id
WHERE bm.user_id = $1;
`;

const selectCurrentBook = `
SELECT b.title, b.id FROM bookclubs_books AS bb
INNER JOIN books AS b ON b.id = bb.book_id
WHERE is_done = false AND bookclub_id = $1;
`;

const countMembersInClub = `
SELECT COUNT(*) as no_of_members FROM bookclubs_members WHERE bookclub_id = $1;
`;

const removeBookclubsMembers = `
DELETE FROM bookclubs_members WHERE user_id=$1 AND bookclub_id=$2;`;

const updateUsersBooks = 'UPDATE users_books SET is_read = NOT is_read WHERE user_id = $1 and book_id = $2;';

const selectUsersById = 'SELECT * FROM users WHERE id=$1;';

const selectUserByGoogleId = 'SELECT * FROM users WHERE google_id = $1;';

const insertNewUser = `
  INSERT INTO users (google_id, email, first_name, last_name, avatar) 
  VALUES ($1, $2, $3, $4, $5) 
  RETURNING id;`;

const insertBookclubsBooks = `
  INSERT INTO bookclubs_books (book_id, bookclub_id, start_date, end_date, is_done)
  values ($1, $2, current_date, current_date + interval '1 month' * 1, false)
`;

const updateStartDateCurrentBook = `
  UPDATE bookclubs_books SET start_date = $1 WHERE book_id = $2 AND bookclub_id = $3; 
`;
const updateEndDateCurrentBook = `
  UPDATE bookclubs_books SET end_date = $1 WHERE book_id = $2 AND bookclub_id = $3; 
`;

const updateDoneStateTrue = `
  UPDATE bookclubs_books SET is_done = true WHERE book_id = $1 AND bookclub_id = $2;
`;

const selectBooksInBookclubsBooks = `
  SELECT * FROM bookclubs_books WHERE book_id = $1 and bookclub_id = $2;
`;

const updateDoneStateFalse = `
  UPDATE bookclubs_books SET is_done = false WHERE book_id = $1 and bookclub_id = $2;
`;

const updateBookRating = `
  UPDATE users_books SET rating = $1 WHERE user_id = $2 and book_id = $3;
`;

const innerjoinBookclubsBook = `
  select bb.bookclub_id, bb.book_id, bb.rating from bookclubs_books as bb 
  inner join bookclubs_members as bm 
  on bb.bookclub_id = bm.bookclub_id
  where bb.book_id = $1 and bm.user_id= $2;
` ; 

const calculateAverageRating = `
UPDATE bookclubs_books SET rating = (
	SELECT 
		AVG(bu.rating)
	FROM 
		bookclubs_members as bm
	INNER JOIN
		users_books as bu ON bu.user_id = bm.user_id
	WHERE
		bm.bookclub_id = $1 AND
		bu.book_id = $2 AND
		NOT bu.rating = 0
) WHERE bookclub_id = $1 AND book_id = $2;
`;

async function getBookclubsRating(bookId, userId){
  const result = await executeQuery(innerjoinBookclubsBook, [bookId, userId]);
  return result.rows;
}

async function updateAverageRating (bookclubId, bookId) {
  console.log(bookclubId, bookId);
  await executeQuery(calculateAverageRating, [bookclubId, bookId]);  
}

async function updateRatingForBook (rating, userId, bookId) {
  await executeQuery(updateBookRating, [rating, userId, bookId]);
}

async function updateBookToCurrentBook (bookId, bookclubId) {
  await executeQuery(updateDoneStateFalse, [bookId, bookclubId]);
}


async function isBookInBookclub(bookId, bookclubId){
  const result = await executeQuery(selectBooksInBookclubsBooks, [bookId, bookclubId]);
  return result.rows;
}

async function markCurrentBookDone (bookId, bookclubId) {
  await executeQuery(updateDoneStateTrue, [bookId, bookclubId]);
}

async function getUserById (userId){
  const result = await executeQuery(selectUsersById, [userId]);
  return result.rows[0];
}

async function addNewUser (user) {
  const result = await executeQuery(insertNewUser, [user.id, user.email, user.firstName, user.lastName, user.avatar]);  
  return result.rows[0].id;
}

async function getUserByGoogleId (googleId){
  const result = await executeQuery(selectUserByGoogleId, [googleId]);
  return result;
}

async function setReadStatus (userId, bookId) {
  await executeQuery(updateUsersBooks, [userId, bookId]);
}

async function getUserClubs (userId){
  const result = await executeQuery(selectAllClubsforUser, [userId]);
  return result.rows;
}

async function getCurrentBook (bookclubId){
  const result = await executeQuery(selectCurrentBook, [bookclubId]);
  return result;
}

async function getNoOfMembers (bookclubId) {
  const result = await executeQuery(countMembersInClub, [bookclubId]);
  return result;
}

async function searchForUserBook (bookId, userId) {
  const result = await executeQuery(selectUsersBooks, [bookId, userId]);
  return result;
}

async function searchForBook(goodreadsId){
  const result = await executeQuery(selectBooks, [goodreadsId]);
  return result;
}

async function addBookToBooks(book) {
  const row  = await executeQuery(insertBooks,
    [book.title, book.author, book.id, book.rating, book.image, book.smallImageURL]
  );
  return row.rows[0].id;
};

async function addBookToLib (bookId, userId) {
  await executeQuery(insertUsersBooks, [bookId, userId]);
}

async function getUserLib (userId) {
  const result = await executeQuery(selectUserLibrary, [userId]);
  return result.rows;
}

async function removeBookFromLib (userId, bookId){
  await executeQuery(removeUsersBooks, [userId, bookId]);
  let result = await getUserLib(userId);
  return result;
}

async function addNewClub(name, theme, description) {
  const result = await executeQuery(insertBookclubs, [name, theme, description]);
  return result.rows[0].id;
}

async function addMemberToClub (userId, bookclubId){
  await executeQuery(insertBookclubsMembers, [userId, bookclubId]);
}

async function getBookclub (bookclubId) {
  const result = await executeQuery(selectBookclubs, [bookclubId]);
  return result.rows[0];
}

async function getMembersBookclub (bookclubId) {
  const result = await executeQuery(selectBookclubsMembers, [bookclubId]);
  return result.rows;
}

async function getBooksBookclub (bookclubId) {
  const result = await executeQuery(selectBookclubsBooks, [bookclubId]);
  return result.rows;
}

async function getUserByEmail (email) {
  const result = await executeQuery(selectUsers, [ email ]);
  return result.rows;
}

async function getClubByUserid (userId, bookclubId){
  const result =  await executeQuery(searchInBookclubsUsers, [userId, bookclubId]);
  return result.rows;
}

async function removeUserFromClub(userId, bookclubId){
  await executeQuery(removeBookclubsMembers, [userId, bookclubId]);
}

async function insertCurrentBook (bookId, bookclubId) {
  await executeQuery(insertBookclubsBooks, [bookId, bookclubId]);
}

async function setNewDate (dateType, date, bookId, bookclubId) {
  dateType === 'start_date' ? 
    await executeQuery(updateStartDateCurrentBook, [date, bookId, bookclubId])
    :  await executeQuery(updateEndDateCurrentBook, [date, bookId, bookclubId]);
}

module.exports.addBookToBooks = addBookToBooks;
module.exports.searchForBook = searchForBook;
module.exports.addBookToLib = addBookToLib;
module.exports.searchForUserBook = searchForUserBook;
module.exports.getUserLib = getUserLib;
module.exports.removeBookFromLib = removeBookFromLib;
module.exports.addNewClub = addNewClub;
module.exports.addMemberToClub = addMemberToClub;
module.exports.getBookclub = getBookclub;
module.exports.getMembersBookclub = getMembersBookclub;
module.exports.getBooksBookclub = getBooksBookclub;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getClubByUserid = getClubByUserid;
module.exports.getUserClubs = getUserClubs;
module.exports.getCurrentBook = getCurrentBook;
module.exports.getNoOfMembers = getNoOfMembers;
module.exports.removeUserFromClub = removeUserFromClub;
module.exports.setReadStatus = setReadStatus;
module.exports.getUserById = getUserById;
module.exports.getUserByGoogleId = getUserByGoogleId;
module.exports.addNewUser = addNewUser;
module.exports.insertCurrentBook = insertCurrentBook;
module.exports.setNewDate = setNewDate;
module.exports.markCurrentBookDone = markCurrentBookDone;
module.exports.isBookInBookclub = isBookInBookclub;
module.exports.updateBookToCurrentBook = updateBookToCurrentBook;
module.exports.updateRatingForBook = updateRatingForBook;
module.exports.getBookclubsRating = getBookclubsRating;
module.exports.updateAverageRating = updateAverageRating;
