import React, {useState} from 'react';
import styled from 'styled-components';
import Button from './Button';
import doFetch from '../fetch';

const Container = styled.div`
  margin: 0 auto;
  width: 313px;
  height: 136px;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

`;

const Div = styled.div`
  display: inline-block;
`;

const Img = styled.img`
  width: 90px;
  height: 90px;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: bold; 
  margin-bottom: 10px;
`;

const Name = styled.p`
  font-size: 13px;
  margin-bottom: 10px; 
`;


export default function MemberCard (props) {

  const [member, setMember] = useState(props.user.isMember);

  const bookclubId = props.bookclubId;
  const userId = props.user.id

  function addMember (e) {
    setMember(true);
    e.preventDefault();
    doFetch('bookclub/addmember', 'POST', {
      bookclubId,
      userId
    })
    .then(data => console.log(data));
  }

return (
  
  <Container>
    <Img src={props.user.avatar}></Img>
    <Div>
      <Username>{props.user.email.split('@')[0]}</Username>
      <Name>{props.user.first_name} {props.user.last_name}</Name>
      {!member 
        ? <Button handleClick={addMember} text='Add to club'/>
        : <Button disabled={true} text='Already added'/>}
    </Div>
  </Container>

)

}