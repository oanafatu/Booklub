import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import {Link} from 'react-router-dom';

const Container = styled.div`
  width: 275px;
  height: 240px;
  margin: 0px auto;
  border: none;
  border-radius: 28px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Icon = styled.img`
  width: 171px;
  height: 137px;
`;

const H1 = styled.h1`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 12px;
  margin: 0px 20px 10px;
  line-height: 15px;
`;


export default function NoContentLarge (props) {
  return (
    <>
      <Container>
        <Icon src={props.src}></Icon>
        <H1>{props.h1}</H1>
        <Text>{props.text}</Text>
        
        {props.btnText && props.handleClick && <Button text={props.btnText} handleClick={props.handleClick}/>}
        
        {props.buttonLink && 
          <Link to={props.buttonLink.link}>
            <Button text={props.buttonLink.text} handleClick={() => {}} />
          </Link>}

      </Container>
    </>
  )
}
