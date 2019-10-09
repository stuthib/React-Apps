import './styles/header.css';
var React = require('react');

var Header = () => {
  const mainHeader = 'tic-tac toe';
  const subHeader = 'start your game now!'
  return(
    <div className='headerContainer'>
      <span className='mainHeader'>{mainHeader}</span>
      <span className='subHeader'>{subHeader}</span>
    </div>
  )
}

export default Header;
