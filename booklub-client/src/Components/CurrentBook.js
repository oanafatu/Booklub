import React from 'react';
import styled from 'styled-components';
import cleanDate from '../helper/date';
import Datetime from 'react-datetime';
import './../Datetime.css';
import doFetch from '../fetch';
import Button from './Button';


const Image = styled.div `
  position: relative;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  height: 176px;
  width: 120px;
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-bottom: 20px;
`;

const BtnContainer = styled.div`
  position: absolute;
  margin-top: 10px;
`;

const Text = styled.div`
  border-radius: 8px;
  padding: 20px 20px 0px;
  
`;

const Title = styled.span`
  font-size: 13px;
  font-weight: bold;
  display: block;
`;

const Author = styled.span`
  font-size: 13px;
  color: #666;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Header = styled.p`
  font-size: 15px;
  text-align: center;
  margin: 20px auto;
`

const Date = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
  display: inline;
`;


export default function CurrentBook (props) {

  let startDate = cleanDate(props.arr[0].start_date);
  let endDate = cleanDate(props.arr[0].end_date);

  const bookId = props.arr[0].id;
  const bookclubId = props.bookclubId * 1;
  
  
  function markAsDone (e){
    e.preventDefault();
    doFetch('bookclub/' + bookclubId + '/markdone', 'POST', {
      bookId
    })
    .then(res => props.done.setDoneStatus(!props.done.doneStatus));
  }
  
  function changeDate(date, dateType){
    const formatedDate = cleanDate(date._d);
    doFetch('bookclub/' + bookclubId + '/changedate', 'POST', {
      bookId,
      dateType,
      date: formatedDate
    })
    .then(res => console.log(res));
  }
 
  return (
    <>
      <Header>Currently reading</Header>
    
    {props.arr && props.arr.map((book, index) => (
        <Container key={index} >
        <Image img={book.image}></Image>
        <Text>
          <Title>{book.title}</Title>
          <Author>{book.author}</Author>
          <Date>Start date:</Date>
            <Datetime defaultValue={startDate} dateFormat="YYYY/MM/DD" timeFormat={false} onChange={(date) => changeDate(date,'start_date')} />
          <Date>End date:</Date>
          <Datetime defaultValue={endDate} dateFormat="YYYY/MM/DD" timeFormat={false} onChange={(date) => changeDate(date, 'end_date')}/>
          <BtnContainer>
            <Button handleClick={markAsDone} text='Mark as done'/>
          </BtnContainer>
        </Text>
      </Container>
      ))}
     
    </>
  );
}

