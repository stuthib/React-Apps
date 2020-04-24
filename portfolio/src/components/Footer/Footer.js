import React from 'react';
import './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';


const gitHubIconClick = () => {
  window.open('https://github.com/stuthib/React-Apps/tree/master/portfolio');
  return false;
}

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-text'>
        Designed & Developed by Stuthi Balaji
      </div>
      <GitHubIcon className='footer-link' onClick={gitHubIconClick}/>
    </div>
  );
}

export default Footer;
