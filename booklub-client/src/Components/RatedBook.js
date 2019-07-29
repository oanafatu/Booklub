import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import doFetch from '../fetch';

const Image = styled.div `
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  height: 180px;
  width: 123px;
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`
const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 20px 0px;
`;

const Text = styled.div`
  margin-top: 20px;
  position: relative;
  border-radius: 8px;
  padding: 30px 20px;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: bold;
  display: block;
`;

const Author = styled.span`
  font-size: 13px;
  color: #666;
  display: block;
  padding-top: 10px;
  padding-bottom: 15px;
`;

const Stars = styled.div`
  position: absolute;
  bottom: 20px;
`;

export default function RatedBooks (props) {

  function changeRating(newRating){
    
    props.rated.setRate(!props.rated.rate);

    doFetch('myratings/update', 'POST', {bookId: props.id, rating: newRating})
      .then(res => console.log(res));
  }

    return (
      <>
        <Container key={props.index} >
          <Image img={props.image}></Image>
          <Text>
            <Title>{props.title}</Title>
            <Author>{props.author}</Author>   
            <Stars>
              <StarRatings
                rating={props.rating}
                starRatedColor="#FF6B03"
                starHoverColor="#FF6B03"
                svgIconPath="M9.99988213,15.727349 L5.78634914,17.8041525 C4.89891228,18.2415602 3.80128649,17.9216808 3.33473332,17.0896818 C3.1489494,16.7583755 3.08483998,16.3788904 3.15232994,16.0099754 L3.95704314,11.6112349 L0.54822334,8.49602962 C-0.169728161,7.83991799 -0.184418742,6.762378 0.515411008,6.08927668 C0.794086886,5.8212442 1.15923604,5.64681406 1.55432915,5.59299008 L6.26520224,4.9512225 L8.37196874,0.94911622 C8.81568717,0.10620918 9.90423368,-0.239867766 10.8033054,0.176131728 C11.1613205,0.341784909 11.4511045,0.613466215 11.6277955,0.94911622 L13.734562,4.9512225 L18.4454351,5.59299008 C19.4376197,5.72815651 20.125069,6.59180919 19.9808961,7.52201234 C19.9234858,7.89242411 19.737433,8.23476253 19.4515409,8.49602962 L16.0427211,11.6112349 L16.8474343,16.0099754 C17.0169197,16.9364199 16.3532402,17.8162635 15.3650647,17.9751612 C14.9715681,18.0384351 14.5667971,17.9783305 14.2134151,17.8041525 L9.99988213,15.727349 Z"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                svgIconViewBox="0 0 20 18"
                starDimension="25px"
                starSpacing="3px"
              />
            </Stars>
        </Text>
        </Container>
      </>
    )
}



