var React = require('react');
var constants = require('../constants');

var LOSER = constants.LOSER;

var style = {
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

var btnStyle = {
  width: 75,
  height: 30,
  marginTop: 10,
  marginLeft: 10
};

var PetComponent = function(props) {
  var result = null;
  var disabled = false;

  if(props.result !== '') {
    var resultStyle = {};
    if(props.result === LOSER) {
      resultStyle = { color: 'red' };
    } else {
      resultStyle = {color: 'green'};
    }
    result = <h2 style={resultStyle}>{props.result}</h2>
    disabled = true;
  }

  return (
    <div style = {style}>
      {result}
      {(props.result) ? (<h3>{props.petName} Likes: {props.likesCount}</h3>) : (<h3>{props.petName}</h3>)}
      <img src={props.imgUrl} alt={props.petName} style={{height: 300, width: 300}}/>
      <br />
      <button style = {btnStyle} value = {props.petName} disabled = {disabled} onClick={props.onLikeButtonClick}>Like</button>
      <button style={btnStyle} value = {props.petName} disabled = {disabled} onClick={props.onDislikeButtonClick}>Dislike</button>
    </div>
  );
};

module.exports = PetComponent;
