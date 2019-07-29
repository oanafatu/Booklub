import React, {useEffect} from 'react';
import styled from 'styled-components';
import auth from './../helper/googleAuth';


const Logo = styled.h1`
  font-size: 40px;
  margin-top: 250px;
`;
  
const Container = styled.div`
  height: 667px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const Slogan = styled.span`
  display: block;
  font-size: 18px;
  margin-top: 10px;
`;

const SigninButton = styled.button`
  width: 327px;
  height: 52px;
  background-color: #4b74ff;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  position: relative;
  margin-top: 100px;
`

const Google = styled.i`
  position: absolute;
  top: 20px;
  left: 10px;
  width: 24px;
  height: 24px;
`;

const BtnText = styled.p`
  display: inline;
`;

export default function Login(){
  
  useEffect(() => {
    auth.startApp();
  }, []);

  return (
      <>
        <Container>
          <Logo>booklub</Logo>
          <Slogan>read with friends</Slogan>
          <SigninButton id="signin" > 
          <Google className="fab fa-google"></Google>
          <BtnText>Login with Google</BtnText>
          </SigninButton>
        </Container>
      </>
  )
}


