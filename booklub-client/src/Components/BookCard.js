import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ReadStatus from './ReadStatus';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import doFetch from '../fetch';

toast.configure({});

const Image = styled.div `
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  height: 180px;
  width: 123px;
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`
const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 130px;
  right: 10px;
`;

const Text = styled.div`
  border-radius: 8px;
  padding: 30px 20px;
  
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: bold;
  display: block;
`;

const Author = styled.span`
  font-size: 13px;
  color: #666;
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
`;

function handleClick(e, data) {
  e.preventDefault();
  if (e.target.innerHTML === 'Add to my library'){

    doFetch('book/addtomylibrary', 'POST', data)
      .then(res => {
        toast('📘 ' + res.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  } else {
    doFetch('mylibrary/remove/' + data.id, 'DELETE')
      .then(library => {
        toast('📘 ' + library.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        data.setBooks(library.result);
      });
  }
};

export default function BookCard (props) {
  return (
    <Container key={props.index} >
      <Image img={props.image}></Image>
      <Text>
        <Title>{props.title}</Title>
        <Author>{props.author}</Author>
        <BtnContainer>
          <Button text={props.btnText} handleClick={(e)=>handleClick(e, props)} />
          {props.is_read !== undefined && <ReadStatus bookId={props.id} isRead={props.is_read} />}  
        </BtnContainer>
      </Text>
    </Container>
  );
}