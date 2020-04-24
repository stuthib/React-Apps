import React from 'react';
import resume from  '../../attachments/resume.pdf';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import stuthi_logo from  '../../attachments/logos/stuthi_logo@1x.png';
import './Header.css';

class Header extends React.Component {

  gitHubIconClick() {
    window.open('https://github.com/stuthib/React-Apps');
    return false;
  }

  linkedInIconClick() {
    window.open('https://www.linkedin.com/in/stuthibalaji/');
    return false;
  }

  render() {
    return (
      <div className='Header'>
        <header className='App-header'>
          <div className='Icon-holder'>
            <img src={stuthi_logo} alt='logo'/>
          </div>
          <div className='Links-holder'>
            <GitHubIcon className='header-link' onClick={() => this.gitHubIconClick()}/>
            <LinkedInIcon className='header-link' onClick={() => this.linkedInIconClick()}/>
            <a className='resume-link' href={resume} download>resume</a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
