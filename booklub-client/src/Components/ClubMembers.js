import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';

const Title = styled.p`
  font-size: 15px;
  text-align: center;
  margin: 20px 0px 0px;
`;

const MemberContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Member = styled.div`
  text-align: center;
  display: inline-block;
  margin: 0 10px;
  height: 120px; 
`;

const Avatar = styled.img`
  width: 90px;
`;

const Name = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

const Btn = styled.button`
  display: block;
  position: relative;
  top: -20px;
  width: 100%;
  text-align: right;
  `;
  
const Icon = styled.i`
  color: black;
  text-decoration: none;
`

export default function ClubMembers (props) {
  const members = props.arr;
  return (
    <>
      <Title>Members</Title>
      <Btn><Link style = {{textDecoration: "none"}} to={"/bookclub/" + props.bookclubId + "/addmembers"}>
        <Icon className="fas fa-plus"></Icon>
      </Link></Btn>
      
      { members && (
        <MemberContainer>

          <ImageSlider>
            {members.map((member,index) => (
              <Member key={index}>
                <Avatar src={member.avatar}></Avatar>
                <Name>{member.first_name}</Name>
              </Member>
            ))}
          </ImageSlider>
        </MemberContainer>
      )} 
    </>
  );
}

