import React, {useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import ClubMembers from '../Components/ClubMembers';
import BigButton from '../Components/BigButton';
import ClubRatings from '../Components/ClubRatings';
import CurrentBook from './../Components/CurrentBook';
import NoCurrentBook from './../Components/NoCurrentBook';
import doFetch from '../fetch';
import NoClubRatings from '../Components/NoClubRatings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import {HistoryContext} from './../App';

toast.configure({});

const LeaveQuestion = styled.button`
  display: block;
  border: none;
  margin: 0 auto;
  color: #ffffff;
  border-radius: 8px;
  height: 32px;
  font-weight: 600;
  font-size: 9px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #4b74ff;
`;

const Container = styled.div`
  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  margin: 50px 0px 20px;
  padding-top: 30px;
`;

export default function Bookclub (props) {
  const {setHistory} = useContext(HistoryContext);
  const [ bookclub, setBookclub ] = useState({});
  const [ doneStatus, setDoneStatus ] = useState(false);
  const bookClubId = props.match.params.id;
  
  setHistory(props.history);

  useEffect(()=>{
    
    doFetch('bookclub/'+bookClubId, 'GET')
    .then(data => {
      setBookclub(data);
    })
    
  },[doneStatus, bookClubId]);
  
  let currentBook = [];
  let ratedBooks = [];
  if (bookclub.books && bookclub.books.length > 0 ){
    currentBook = bookclub.books.filter(book => book.is_done === false);
    ratedBooks = bookclub.books.filter(book => book.is_done === true);
  }
  
  function leaveClub(){
    doFetch('bookclub/' + bookClubId + '/leaveclub/', 'DELETE')
      .then(() => props.history.push('/mybookclubs'));
  }

  function confirmLeave(e) {
    e.preventDefault();
    
    toast( <LeaveQuestion onClick={leaveClub}> Are you sure? </LeaveQuestion>, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    
  }
  
  return (
    <Container>
      <Header title={bookclub.name} />
      <ClubMembers bookclubId={bookClubId} arr={bookclub.members}/>
      
      {currentBook && currentBook.length > 0 
        ? <CurrentBook arr={currentBook} bookclubId={bookClubId} done={{setDoneStatus, doneStatus}} /> 
        : <NoCurrentBook bookclubId={bookClubId} />}
      
      {ratedBooks && ratedBooks.length > 0 
          ? <ClubRatings books={ratedBooks}/> 
          : <NoClubRatings />}

      <BtnContainer>
       <BigButton text="Leave club" handleClick={confirmLeave}/>
      </BtnContainer>
    </Container>
  )
}