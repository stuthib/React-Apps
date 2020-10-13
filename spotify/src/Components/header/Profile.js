import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './Header.css';

function Profile(props) {

  const [profileTabState, setProfileTabState] = useState(false);
  const { userDetails } = props;

  const getProfileImage = () => {
    return userDetails.images.length > 0 ?
            <img src={userDetails.images[0]} alt='profile-img'/> :
              <AccountCircleIcon className='profile-icon'/>;
  }

  const onProfileClick = () => {
    console.log('Clicked');
    let isProfileOpen = profileTabState;
    setProfileTabState(!isProfileOpen);
  }

  const logout = () => {
    const url = 'https://www.spotify.com/logout/'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() =>
    {
      spotifyLogoutWindow.close();
      window.location = 'http://localhost:5000';
    },
    2000);
  }

  console.log('PROPS --- ', props);
  console.log(getProfileImage());
  return (
    <div className='Profile'>
      <div className='profile-name-icon' onClick={() => onProfileClick()}>
        <div>{getProfileImage()}</div>
        <div className='profile-arrow-up'>
          {
            profileTabState ? <ExpandMoreIcon /> : <NavigateNextIcon />
          }
        </div>
      </div>
      <div className='profile-container'>
        <div className={'profile-slider' + (profileTabState ? ' profile-slider-opened' : ' profile-slider-closed')}>
          <div className='slider-section'>{userDetails.id}</div>
          <div className='slider-section'>{userDetails.email}</div>
          <div className='slider-section btn-section' onClick={() => this.logout()}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
