import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import cleanDate from '../helper/date';
import { Link } from 'react-router-dom';

const Circle = styled.div `
  border: none;
  width: 126px;
  height: 126px;
  margin: 20px 20px;
  border-radius: 80px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`
const Container = styled.div`
  position: relative;
  width: 335px;
  height: 210px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  border: none;
  margin: 20px auto;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 160px 1fr;
  
`;

const BtnContainer = styled.div`
  position: absolute; 
  top: 150px;
  left: 40px;
  margin-top: 10px;
`;

const Text = styled.div`
  display: block;
  margin-top: 40px;
  margin-left: 20px;
  
`;

const Name = styled.span`
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
  
const CreateDate = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
`;
  
const Reading = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 10px;
  padding-right: 10px;
  line-height: 15px;
`;
  
const Members = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 20px;

`;

const Avatar = styled.img`
  width: 80px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
`;

export default function ClubCard(props) {
  let createdDate = cleanDate (props.created_date);
  return (
    <>
      <Container >
        <Circle>
          <Avatar src="/icons/bookRow.svg"></Avatar>
        </Circle>
        <Text>
          <Name>{props.name}</Name>
          <CreateDate>Created {createdDate}</CreateDate>
          <Members>{props.noOfMembers} members</Members>
          <Reading>Currently reading: <br/> {props.currentBook}</Reading>
          <BtnContainer>
            <Link style = {{textDecoration: "none"}} to={'/bookclub/' + props.id}>
              <Button text='Go to club page' /> 
            </Link>
          </BtnContainer>
        </Text>
    </Container>
    </>
  )
}