import React from 'react';
import styled from 'styled-components';

const Gif = styled.img`
  width: 300px;
  margin: 0px auto;
  display: block;
`

export default function Spinner () {
  return (
    <Gif src="https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=2&w=970&source=post_page---------------------------"/>
  )
}