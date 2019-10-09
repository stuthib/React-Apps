var React = require('react');

var headerStyle = {
  textAlign: 'center',
  color: 'rebeccapurple'
}

var Header = function() {
  return(
    <h1 style = {headerStyle}>
      Cuteness Fight!
    </h1>
  );
}

module.exports = Header;
