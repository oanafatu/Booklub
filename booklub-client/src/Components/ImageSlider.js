import React from 'react';
import Flickity from 'react-flickity-component';

export default function ImageSlider (props) {
  let dots;
  
  if (props.children) {
    dots = (props.children.length > 3) && (props.children.length < 16)
  };

  return (
    <Flickity options={{prevNextButtons: false, groupCells: true, pageDots: dots}} >

      {props.children}

    </Flickity>
  )
}