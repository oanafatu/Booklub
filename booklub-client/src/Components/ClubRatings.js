import React from 'react';
import BookSlider from './BookSlider';
import TitleRedirect from './TitleRedirect';

export default function ClubRatings (props) {
  return (
    <>
      <TitleRedirect title="Club Ratings" showArrow={false}/>
      <BookSlider showStars={true} {...props} />
    </>
  );
}