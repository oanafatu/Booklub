import React from 'react';
import TitleRedirect from './TitleRedirect';
import NoResult from './NoResult';



export default function NoClubRatings (){
  return (
    <>
    <TitleRedirect showArrow={false} title="Club Ratings"/>
    <NoResult src="/icons/speechBubble.svg" text="The books your club has read will be shown here when rated by each user."/>
    </>
  )
}