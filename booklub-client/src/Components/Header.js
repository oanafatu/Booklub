import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: block; 
  position: relative;
`;



const NavLinks = styled.nav`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  margin-top: 20px;
  justify-content: center;
`;

const Icon = styled.i`
  color: black;
  display: inline-block;
  text-align: center;
  text-decoration: none;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  padding-top: 40px;
`;

export default function Header (props) {
  return (
    <>

    <Container>
      <NavLinks>
        <Icon className="fas fa-chevron-left" onClick={() => window.history.back()}></Icon>
        <Title>{props.title}</Title>
        <Link to="">
          <Icon className="far fa-user"></Icon>
        </Link>
      </NavLinks>
      <hr></hr>
    </Container>
    </>
  )
}
