const express = require('express');
const { searchBook, getDetails, randomAvatar } = require('./service.js');
const google = require('./google');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database');
const app = express();
const port = 4000;



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/api/booksearch/:query', async (req, res) => {
  try {
    let result = await searchBook(req.params.query);
    res.send(result);
  } catch (err){
    console.log(err);
  }
});

app.get('/api/mylibrary', async (req, res) => {
  const userId = req.cookies['userId'];
  try {
    let result = await db.getUserLib(userId);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/mybookclubs', async (req, res) => {
  const userId = req.cookies['userId'];
  try {
    const bookclubs = await db.getUserClubs(userId);
    const userBookclubs = bookclubs.map(bookclub => getDetails(bookclub));
    const result = await Promise.all(userBookclubs);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/book/addtomylibrary', async (req, res) => {
  try {
    const userId = req.cookies['userId'];
    let booksContent = await db.searchForBook(req.body.id);

    if (booksContent.rows.length < 1) {
      
      const bookPrimaryKey = await db.addBookToBooks(req.body);
      await db.addBookToLib(bookPrimaryKey, userId);
      res.send(JSON.stringify({ message : 'Book was added to your library'}));
    } else {
      let libContent = await db.searchForUserBook(booksContent.rows[0].id, userId);
      if(libContent.rows.length < 1) {
        await db.addBookToLib(booksContent.rows[0].id, userId);
        res.send(JSON.stringify({ message : 'Book was added to your library'}));
      } else {
        res.send(JSON.stringify({ message : 'Book is already in your library'}));
      }
    } 
  } catch (err) {
    console.log(err);
  }
});

app.delete('/api/mylibrary/remove/:id', async (req, res) => {
  const userId = req.cookies['userId'];
  try {
    let updatedLib = await db.removeBookFromLib(userId, req.params.id);
    
    res.send(JSON.stringify({ message : 'Book was removed', result: updatedLib}));
  } catch(err){
    console.log(err);
  }
});

app.get('/api/bookclub/:id', async (req, res) => {
  const bookclubId = req.params.id;

  const detail = await db.getBookclub(bookclubId);
  detail.members = await db.getMembersBookclub(bookclubId); 
  detail.books = await db.getBooksBookclub(bookclubId);
  
  res.send(detail);

});

app.post('/api/bookclub/create', async (req, res) => { 
  const userId = req.cookies['userId'];
  try {
    
    let clubId = await db.addNewClub(req.body.clubName, req.body.clubTheme, req.body.clubDesc);
    await db.addMemberToClub(userId, clubId);
    
    res.send(JSON.stringify({ message : 'Your club was created!', clubId}));

  } catch (err) {
    console.log(err);
  }
});

app.get('/api/bookclub/:id/usersearch/:email', async (req, res) => {
  const email = req.params.email;
  const bookclubId=req.params.id;
  try {
    let result = await db.getUserByEmail(email);
    
    if (result.length < 1) {
      return res.send(JSON.stringify({ message : 'No booklub member matching the email', result: null}));
    }

    const userId = result[0].id;
    let response = await db.getClubByUserid(userId, bookclubId);
    result[0].isMember = response.length < 1 ? false : true;

    res.send(JSON.stringify({ message : 'Success', result}));
  } catch(err){
    console.log(err);
  }

});

app.post('/api/bookclub/addmember', async (req, res) => {

  const userId = req.body.userId;
  const bookclubId = req.body.bookclubId;

  try {
    await db.addMemberToClub(userId, bookclubId);

    const currentBook = await db.getCurrentBook(bookclubId);

    if (currentBook.rows.length) {
      const bookId = currentBook.rows[0].id;
      const result = await db.searchForUserBook(bookId, userId);
      if (!result.rows.length) {
        await db.addBookToLib(bookId, userId);
      }
    }

    res.send(JSON.stringify({message: 'User was added to club'}));
  } catch(err){
    console.log(err);
  }
});

app.delete('/api/bookclub/:id/leaveclub/', async (req, res) => {
  const userId = req.cookies['userId'];
  const bookClubId = req.params.id;
  try {
    await db.removeUserFromClub(userId, bookClubId);
    res.send(JSON.stringify({message: 'User was removed from club'}));
  } catch (err) {
    console.log(err);

  }

});

app.post('/api/mylibrary/readstatus', async (req, res) =>{
  const userId = req.cookies['userId'];
  bookId = req.body.targetBook;
  try {
    await db.setReadStatus(userId, bookId);
    res.send(JSON.stringify({message: 'Status was updated'}));
  }catch (err){
    console.log(err);
  }
});

app.get('/api/myprofile', async (req, res) => {
  const userId = req.cookies['userId'];
  
  try {
    const user = await db.getUserById(userId);
    const bookclubs = await db.getUserClubs(userId);
    const books = await db.getUserLib(userId);

    result = {
      user,
      bookclubs,
      books
    };
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/authenticate/', async (req, res) => {
  
  try {
    const idToken = req.body.idToken;
    const userGoogle = await google.verify(idToken).catch(console.error);
    const userData = await db.getUserByGoogleId(userGoogle.id);

    if (userData.rows.length < 1) {
      userGoogle.avatar = randomAvatar();
      const userId = await db.addNewUser(userGoogle);
      res.cookie('userId', userId);
      return res.send(JSON.stringify({message: 'user was added to db', userId: userId}));
    }
    let userId=userData.rows[0].id;
    
    res.cookie('userId', userId);
    res.send(JSON.stringify({message: 'user already exists in db', userId: userId}));
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/bookclub/:id/setcurrentbook', async (req, res) => {
  const bookclubId = req.params.id;
  const bookId = req.body.bookId;

  try {
   
    const bookclubMembers = await db.getMembersBookclub(bookclubId);
    const memberIds = bookclubMembers.map(member => member.id);

    memberIds.forEach(async member => {
      let libContent = await db.searchForUserBook(bookId, member);
      if (!libContent.rows.length) {
        await db.addBookToLib(bookId, member);
      }
    });
    
    const result = await db.isBookInBookclub(bookId, bookclubId);

    if (result.length) {
      await db.updateBookToCurrentBook (bookId, bookclubId);
      return res.send({message: 'Book was updated in table'});
    }
   
    await db.insertCurrentBook(bookId, bookclubId);
    res.send({message: 'Book was inserted in table'});

  } catch (err) {
    console.log(err);
  }
});

app.post('/api/bookclub/:id/changedate', async (req, res) => {
  const bookclubId = req.params.id;
  const bookId = req.body.bookId;
  const dateType = req.body.dateType;
  const date = req.body.date;
  
  try {

    await db.setNewDate (dateType, date, bookId, bookclubId);
    res.send({message: 'Date was updated.'});
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/bookclub/:id/markdone', async (req, res) => {
  const bookclubId = req.params.id;
  const bookId = req.body.bookId;


  const userId = req.cookies['userId'];
  try {
    await db.markCurrentBookDone(bookId, bookclubId);

    const result = await db.getBookclubsRating(bookId, userId);
    if (result.length){
      result.forEach(async bookclub => {
        await db.updateAverageRating(bookclub.bookclub_id, bookId);
      });
    }

    res.send({message: 'Book marked as done.'});
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/myratings/update', async (req, res) => {
  const userId = req.cookies['userId'];
  const { bookId, rating } = req.body;

  try {
    await db.updateRatingForBook(rating, userId, bookId);
    const result = await db.getBookclubsRating(bookId, userId);

    if (result.length){
      result.forEach(async bookclub => {
        await db.updateAverageRating(bookclub.bookclub_id, bookId);
      });
    }

    res.send({message: 'Rating updated'});
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}`));