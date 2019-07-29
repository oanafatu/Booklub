import React, {useState} from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import BookCard from '../Components/BookCard';
import SpinnerBooks from '../Components/SpinnerBooks';
import doFetch from '../fetch';


export default function BookSearch () {
  const [books, setBooks] = useState([])
  const [spinner, setSpinner] = useState(null);
  function onSearchSubmit (e) {
    e.preventDefault();
    let input = document.querySelector('#search-bar');

    if (input.value.trim() === '') return;

    setBooks([]);
    setSpinner(true);

    doFetch('booksearch/' + input.value, 'GET')   
    .then(data => {
      setTimeout(() => {
        setBooks(data.booksArr)
        setSpinner(false);
      }, 1000);
    });
    
  }
    
  return (
    <>
      <Header title="The booklub Library" />
      <SearchBar onSubmit={onSearchSubmit} placeholder="Search for books"/>
      
      {spinner && <SpinnerBooks/>}
      
      {books && books.map( (book, index) => {
        return <BookCard btnText="Add to my library" key={index} {...book} />
      })}
    </>
  )
}
