import React from 'react';
import styled from 'styled-components';

export const Btn = styled.button`
  border: none;
  margin-right: 10px;
  color: #ffffff;
  border-radius: 8px;
  height: 32px;
  font-weight: 600;
  font-size: 9px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: ${props => props.disabled ? "light-gray" : props.isGray ? "light-gray" : "#4b74ff"}
`

export default function Button (props){
  return (
    <>
    <Btn disabled={props.disabled} onClick={props.handleClick} isGray={props.isGray}>{props.text}</Btn>
    </>
  )
}