import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import BookCard from '../Components/BookCard';
import doFetch from '../fetch';
import BigButton from '../Components/BigButton';
import NoContentLarge from '../Components/NoContentLarge';
import {HistoryContext} from './../App';


export default function MyLibrary (props) {
  
  const [ books, setBooks ] = useState([]);
  const [myInput, setMyInput] = useState('');
  const {setHistory} = useContext(HistoryContext);

  setHistory(props.history);

  function browseBooks(e){
    e.preventDefault();
    props.history.push('/booksearch');
  }

  const noBooksOptions = {
    src: "/icons/search.svg",
    h1: "Your library is empty.",
    text: "Browse the booklub library to add the books you’d like to read!",
    btnText: "Browse books",
    handleClick: browseBooks
  };

  useEffect(()=>{
    doFetch('mylibrary', 'GET')
     .then(data => setBooks(data));
  },[]);

  function mySearch (e) {
    e.preventDefault();
    setMyInput( e.target.value.toLowerCase());
  }

  function preventSubmit (e) {
    e.preventDefault();
  }

  let list = books
    .filter(book => (myInput === '' || 
      book.title.toLowerCase().includes(myInput) ||
      book.author.toLowerCase().includes(myInput))
  );
  return (
    <>
    <Header title="My Library"/>
    
    <SearchBar onSubmit={preventSubmit} onChange = {mySearch} placeholder="Search in your library" />
    <Link style= {{textDecoration:"none"}} to="/booksearch">
        <BigButton text="Add more books"/>
    </Link>
    {books.length ? list.map( (book, index) => {
        return <BookCard btnText="Remove" key={index} {...book} setBooks={setBooks} />
      }): <NoContentLarge {...noBooksOptions}/>}
    </>
  );
}