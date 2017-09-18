import React from 'react';

const buttonStyle = {
  background: 'white',
  float: 'left',
  fontSize: '24em',
  fontWeight: 'bold',
  lineHeight: 34,
  height: 34,
  marginRight: -1,
  marginTop: -1,
  padding: 0,
  textAlign: 'center',
  width: 34,
  font: 'caption'
};

const Square = function(props) {
  return (
    <button style={buttonStyle} onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

export default Square;
