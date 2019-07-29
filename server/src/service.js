const https = require('https');
const convert = require('xml-js');
require('dotenv').config();
const key = process.env.MYAPIKEY;
const db = require('./database');



function searchBook (query, pageId = 1){
  return new Promise ((resolve, reject) => {
    let url = 'https://www.goodreads.com/search/index.xml?q=' + query + '&page=' + pageId + '&key=' + key;

    https.get(url, res   => {
      let body = '';
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        let xml = body;
        let result = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
        let partial = result.GoodreadsResponse.search;

        let arrBooks = partial.results.work; 

        let books = {};
        books.resultsStart = partial['results-start']._text;
        books.resultsEnd = partial['results-end']._text;
        books.totalResults = partial['total-results']._text; 

        if (!arrBooks){
          books.noResult = 'No book found for this search. Try a new one!';
      
          return resolve(books);
        }
        
        books.booksArr = [];
        for (let i = 0; i < arrBooks.length; i++) {
          let obj = {
            id:arrBooks[i].id._text,  
            rating: arrBooks[i].average_rating._text, 
            title: arrBooks[i].best_book.title._text,
            author: arrBooks[i].best_book.author.name._text,
            image: arrBooks[i].best_book.image_url._text,
            smallImageURL: arrBooks[i].best_book.small_image_url._text,
          };

          books.booksArr.push(obj) ;
          obj = {};
        }
        
        resolve(books);

      });

    }).on('error', (err)=>{
      reject(err);
    });
  });
};

async function getDetails (bookClub) {
  
  let currentBook = await db.getCurrentBook(bookClub.id);
  let noOfMembers = await db.getNoOfMembers(bookClub.id);
  
  return {
    ...bookClub,
    currentBook: currentBook.rows.length > 0 ? currentBook.rows[0].title : 'Nothing', 
    noOfMembers: noOfMembers.rows[0].no_of_members
  };
}

function randomAvatar() {
  const randomNumber = Math.floor(Math.random() * (21 - 1) ) + 1;
  return '/avatars/avatar' + randomNumber + '.svg';
}

module.exports = { searchBook, getDetails, randomAvatar };