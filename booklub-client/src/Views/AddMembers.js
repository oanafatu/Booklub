import React, {useState} from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import MemberCard from '../Components/MemberCard';
import NoResult from '../Components/NoResult';
import styled from 'styled-components';
import doFetch from '../fetch';

const Text = styled.p`
  font-size: 14px;
  margin: 20px 0px;
  text-align: center;
  line-height: 15px;
`;

export default function AddMembers (props) {
  const bookclubId = props.match.params.id
  const [ userData, setUserData ] = useState({
      message: null,
      result: null
    });

  function handleSearch (e) {
    setUserData({
      message: null,
      result: null
    });
    e.preventDefault();
    let input = document.querySelector('#search-bar');
    doFetch('bookclub/' + bookclubId + '/usersearch/' + input.value, 'GET')
      .then(data => setUserData(data));
  }

  if (!userData.message) {
    return (
    <>
    <Header title="Add members"/>
      <Text>Invite other booklub users to your club by entering their email in the search field below.</Text>
      <SearchBar onSubmit={handleSearch}/>
    </>
    )} else {
    return (
      <>
        <Header title="Add members"/>
        <Text>Invite other booklub users to your club by entering their email in the search field below.</Text>
        <SearchBar onSubmit={handleSearch}/>
        { userData.result ? userData.result.map((user, index) => <MemberCard bookclubId={bookclubId} key={index} user={user}/>) : <NoResult src="/icons/errorCloud.svg" text={userData.message}/>}
      </>
    )
  }
}
