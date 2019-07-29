import React from 'react';
import styled from 'styled-components';



const Form = styled.form `
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 274px;
  height: 35px;
  margin: 30px auto;
  position: relative;
`;

const Input = styled.input `
  width: 80%;
  padding-top: 10px;
  font-family: inherit;
  padding-left: 10px;
  border: none;
  outline: none;
`

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: white;
`

export default function SearchBar (props) {
  
  return (
    <Form onSubmit={props.onSubmit}>
      <Input onChange={props.onChange} id="search-bar" placeholder={props.placeholder}></Input>
      <Button><i className="fas fa-search"></i></Button>
    </Form>
  ) 
}