import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.p`
  font-size: 15px;
  text-align: left;
  display: inline-block;
`;

const Arrow = styled.button`
  display: inline-block;
  text-align: right;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 2px 0px;
`;

const Line = styled.hr`
  margin-bottom: 15px;
`;
export default function TitleRedirect (props ) {
  return (
    <>
    <Div>
      <Title>{props.title}</Title>
      {props.showArrow === false ? '' : 
      <Link to={props.followArrow}>
        <Arrow>
          <i className="fas fa-chevron-right"></i>
        </Arrow>
      </Link> }
    </Div>
    <Line/>
    </>
  )
}