import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Button from '../Components/Button';
import doFetch from '../fetch';
import NoContentLarge from '../Components/NoContentLarge';
import styled from 'styled-components';
import {HistoryContext} from './../App';

const Text = styled.p`
  font-size: 14px;
  margin: 20px 60px;
  text-align: center;
  line-height: 15px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;
  justify-content: center;
  align-content: center;
`;

const Container = styled.div`
  padding: 10px;
  border: none;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const BookImage = styled.img`
  border-radius: 8px;
  width: 98px;
  height: 151px;
`;

export default function SetCurrentBook (props) {
  const {setHistory} = useContext(HistoryContext);
  const [ books, setBooks ] = useState([]);
  const [ myInput, setMyInput ] = useState('');
  const bookclubId = props.match.params.id;
  
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
  }, []);

  function mySearch (e) {
    e.preventDefault();
    setMyInput(e.target.value.toLowerCase());
  }

  function preventSubmit (e) {
    e.preventDefault();
  }

  let list = books
    .filter(book => (myInput === '' || 
      book.title.toLowerCase().includes(myInput) ||
      book.author.toLowerCase().includes(myInput))
  );

  function setCurrent(e, bookId){
    e.preventDefault();
    
    doFetch('bookclub/' + bookclubId + '/setcurrentbook', 'POST', {
      bookId
    })
      .then(() => props.history.push('/bookclub/' + bookclubId));
  }

  return (
    <>
      <Header title="Set current book" />
      <Text>Search for a book in your library to set the current book in your club.</Text>
      <SearchBar onSubmit={preventSubmit} onChange={mySearch} placeholder="Search in your library" />

      {books.length 
        ? <Wrapper> 
          {list.map( (book, index) => {
            return (
              <Container key={index} >
                <BookImage src={book.image}></BookImage>
                <Button handleClick={(event) => setCurrent(event, book.id)} text="Set current book"/>
              </Container>
            )
          })}</Wrapper>
        : <NoContentLarge {...noBooksOptions }/>}
    </>
)

}