import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import TitleRedirect from '../Components/TitleRedirect';
import BookSlider from '../Components/BookSlider';
import ImageSlider from '../Components/ImageSlider';
import doFetch from '../fetch';
import gauth from './../helper/googleAuth';
import styled from 'styled-components';
import NoContentLarge from './../Components/NoContentLarge';
import NoResult from './../Components/NoResult';
import BigButton from './../Components/BigButton';
import {HistoryContext} from './../App';

const MainContainer = styled.div`
  display: block;
`;

const PhoneBar = styled.div`
  display: block;
  position: absolute;
  top: -0.5px;
  right: 1px;
  margin: 0px auto;
`;

const Club = styled.div`
  text-align: center;
  display: inline-block;
  margin: 0 10px;
  height: 120px; 
`;

const Avatar = styled.img`
  width: 90px;
`;

const UserImage = styled.img`
  width: 110px;
  display: block;
  margin: 60px auto 20px;
`

const UserName = styled.h1`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const Name = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

const Container = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export default function UserProfile (props) {
  const [oneState, setOneState] = useState({
    books: [],
    bookclubs: [],
    userData: false
  })
  let {books, bookclubs, userData} = oneState;
  const {setHistory} = useContext(HistoryContext);
  
  setHistory(props.history);
  
  useEffect(() => {

    gauth.startApp();

    doFetch('myprofile/', 'GET')
      .then(data => {
        setOneState({
          books: data.books,
          bookclubs: data.bookclubs,
          userData: data.user
        })
      });
  }, [])

  const ratedBooks = books.filter(book => book.is_read === true);
  books = books.sort((a, b) => a.is_read - b.is_read)

  const noClubOptions = {
    src: "/icons/speechBubble.svg",
    h1: "You haven't joined any bookclubs yet...!",
    text: "Ask your friends to add you or create your own bookclub here.",
    btnText: "Create new club",
    handleClick: () => props.history.push('/createclub')
  };
  
  const noBooksOptions = {
    src: "/icons/search.svg",
    h1: "Your library is empty.",
    text: "Browse the booklub library to add the books you’d like to read!",
    btnText: "Browse books",
    handleClick: () => props.history.push('/booksearch')
  };
  
  return (
    <>
      <PhoneBar>
        <img src="/icons/phoneBar.svg" alt="phonebar"></img>
      </PhoneBar>
      
      <MainContainer>
        <UserImage src={userData.avatar}></UserImage>
        <UserName>{userData.first_name} {userData.last_name}</UserName>
        <TitleRedirect title = 'My Clubs' followArrow="/mybookclubs" />

        {bookclubs.length 
          ? (<Container>
              <ImageSlider>
                {bookclubs.map((club, index) =>(
                  <Club key={index}>
                    <Link to={"/bookclub/" + club.id + "/"}> <Avatar src="/icons/bookRow.svg"></Avatar></Link>
                    <Name>{club.name}</Name>
                  </Club>
                ))}
              </ImageSlider>
            </Container>)
          : <NoContentLarge {...noClubOptions} />}

        <TitleRedirect title = 'My Library' followArrow="/mylibrary"/>
        {books.length 
          ? <BookSlider showStars = {false} books = {books} /> 
          : <NoContentLarge {...noBooksOptions}/>}
    
        <TitleRedirect title = 'My Ratings' followArrow="/myratings" />
        {ratedBooks.length 
          ? <BookSlider showStars = {true} rating={ratedBooks.rating} books={ratedBooks}/> 
          : <NoResult src="/icons/speechBubble.svg" text="Your rated books will appear here" />}
    
        <BigButton text="Sign Out" handleClick={gauth.signOut}/>
      </MainContainer>
    </>
  )
}
