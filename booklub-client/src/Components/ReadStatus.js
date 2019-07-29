import React, { useState, useContext } from 'react';
import Button from '../Components/Button';
import doFetch from '../fetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import {HistoryContext} from './../App';

toast.configure({});

const Test = styled.button`
  display: block;
  border: none;
  margin: 0 auto;
  color: #ffffff;
  border-radius: 8px;
  height: 32px;
  font-weight: 600;
  font-size: 9px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #4b74ff;
`;

export default function ReadStatus (props) {
  const [readStatus, setReadStatus] = useState(props.isRead);
  const {history} = useContext(HistoryContext);
  let btnText = readStatus ? "Mark as unread" : "Mark as read";
  let targetBook = props.bookId;
  

  function statusChange (e) {
    e.preventDefault();

    doFetch('mylibrary/readstatus', 'POST', {
     targetBook
    }).then(res => {
      setReadStatus(!readStatus);
      if (!readStatus){
        toast( <Test onClick={() => history.push('/myratings')}> Rate the book now! </Test>, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });}
      console.log(res.message);
      })
    };

  return (
    <Button isGray = {readStatus} text={btnText} handleClick={statusChange} />
  )
}