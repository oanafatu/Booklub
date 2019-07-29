import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from '../Components/Header';
import ClubCard from '../Components/ClubCard';
import BigButton from '../Components/BigButton';
import doFetch from '../fetch';
import NoContentLarge from '../Components/NoContentLarge';


export default function MyBookclubs(){
  const [bookClubs, setBookClubs] = useState([]);

  const noClubOptions = {
    src: "/icons/speechBubble.svg",
    h1: "You haven't joined any bookclubs yet...!",
    text: "Ask your friends to add you or create your own bookclub here.",
    buttonLink: {
      text: "Create new club",
      link: "/createclub"
    }
  };

  useEffect(()=> {
    doFetch('mybookclubs/', 'GET')
      .then(data => setBookClubs(data));
  },[]);

  return (
    <>
      <Header title="My Bookclubs"/>
      
   
      <Link style = {{textDecoration: "none"}} to="/createclub">
        <BigButton text="Create new club" />
      </Link>
  

      { bookClubs.length 
        ? bookClubs.map((club, index) => <ClubCard key={index} {...club}/>) 
        : <NoContentLarge {...noClubOptions} />}
    </>
  )
}