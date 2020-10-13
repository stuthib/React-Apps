import React, { useEffect } from 'react';
import Profile from './Profile';
import './Header.css';
import logo from '../../assets/logo.png';

function Header(props) {

  const { userDetails } = props;
  
  return (
    <div className="Header">
      <img className='logo' src={logo} alt='logo' />
      <span className='title'>Sync Up</span>
      <Profile userDetails={userDetails}/>
    </div>
  );
}

export default Header;
