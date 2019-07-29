import React, { useEffect, useState } from 'react';
import Header from './../Components/Header';
import NoResult from './../Components/NoResult';
import RatedBook from './../Components/RatedBook';
import doFetch from '../fetch';

export default function MyRatings () {
  const [ ratedBooks, setRatedBooks ] = useState([]);
  const [ rate, setRate ] = useState(false);

  useEffect(()=>{
    doFetch('mylibrary', 'GET')
     .then(books => setRatedBooks(books.filter(book => book.is_read === true)));
  },[rate]);

  return (
    <> 
      <Header title="My Ratings" />
     { ratedBooks.length ? ratedBooks.map( (book, index) => <RatedBook key={index} {...book} rated={{setRate, rate}}/> ) : 
      <NoResult src="/icons/speechBubble.svg" text="Your rated books will appear here" />}  
    </>
  )
}
