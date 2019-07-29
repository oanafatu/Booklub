import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import BigButton from '../Components/BigButton';
import styled from 'styled-components';
import doFetch from '../fetch';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

const Input = styled.input`
  width: 80%;
  box-shadow: 0px 3px 5px #a6a6a6;
  border-radius: 5px;
  height: 35px;
  border: none;
  margin: 10px auto 0px auto;
  text-align: center;
  font-family: inherit;
`;

const Form = styled.form `
  margin: 10px auto;
  position: relative;
  text-align: center;
`;

const Label = styled.label`
  display: block;  
  text-align: center;
  font-size: 13px;
  margin: 30px auto 0px;
  font-weight: 600;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 80%;
  height: 95px;
  box-shadow: 0px 3px 5px #a6a6a6;
  border-radius: 5px;
  border: none;
  margin: 10px auto 0px auto;
  font-family: inherit;
  padding: 10px;
  font-size: 13px;
`;

export default function CreateClub (){


  const [toBookclub, setToBookclub] = useState({status: false, id: null});

  function handleSubmit (e) {
    e.preventDefault();
    const clubName = e.target.querySelector('input[name=clubName]').value.trim();
    const clubTheme = e.target.querySelector('input[name=clubTheme]').value.trim();
    const clubDesc = e.target.querySelector('textarea[name=clubDesc]').value;
  
    const data = {clubName, clubTheme, clubDesc};

    if (!clubName || !clubTheme){
      return toast('📘 Name and Theme are required', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }

    doFetch('bookclub/create', 'POST', data)
      .then(res => {
        setToBookclub({status:true, id: res.clubId });
      })  
  }


  return (
    <>
    <Header title="Create a new club" />
    <Form onSubmit={ handleSubmit }>
      <Label>Club Name</Label>
      <Input name="clubName" ></Input>
      <Label>Theme / Genre</Label>
      <Input name="clubTheme" ></Input>
      <Label>Description</Label>
      <Textarea name="clubDesc"></Textarea>
      <BigButton text="Done!"/>
    </Form>
    {toBookclub.status ? <Redirect to={"/bookclub/"+toBookclub.id}/> : null}
    </>
  )
}
