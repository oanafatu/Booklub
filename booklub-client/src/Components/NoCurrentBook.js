import React from 'react';
import styled from 'styled-components';
import NoContentLarge from './NoContentLarge';

const Header = styled.p`
  font-size: 15px;
  text-align: center;
  margin: 20px auto;
`



export default function NoCurrentBook (props){
  return (
    <>
      <Header>Currently reading</Header>
      <NoContentLarge 
        src="/icons/sleepCloud.svg" 
        h1="No current book selected" 
        text="You can set the current book by choosing from the books you have in your library."
        buttonLink={{
          text: "Add a book",
          link: "/bookclubs/" + props.bookclubId + "/setcurrentbook"
        }}
      />
    </>
  )
}