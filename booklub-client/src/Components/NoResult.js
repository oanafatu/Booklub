import React from 'react';
import styled from 'styled-components';


const Icon = styled.img`
  width: 91px;
  height: 73px;
`;

const Text = styled.p`
  font-size: 12px;
  text-align: center;
  margin: 0px 10px;
  line-height: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin: 0px auto;
  width: 275px;
  height: 100px;
  border: none;
  border-radius: 28px;
  box-shadow: 0px 11px 23px rgba(0, 0, 0, 0.5);
`;

export default function NoResult (props) {
  return (
    <Container>
      <Icon src={props.src}></Icon>
      <Text>{props.text}</Text>
    </Container>
  );
}