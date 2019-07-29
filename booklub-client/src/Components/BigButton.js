import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 327px;
  height: 52px;
  background-color: #4b74ff;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  position: relative;
  display: block;
  margin: 30px auto;
`;

export default function Button (props){
  return (
    <>
    <Btn onClick={props.handleClick}>{props.text}</Btn>
    </>
  )
}