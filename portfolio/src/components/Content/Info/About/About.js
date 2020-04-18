import React from 'react';
import '../Info.css';
import constants  from '../../../../consts';
import Button from '@material-ui/core/Button';
import profilePicture from  '../../../../attachments/bio_img.png';

class About extends React.Component {
  
  connectClick() {
    document.location = "mailto:stuthibalaji@gmail.com";
  }

  render() {
    const { showInfo } = this.props;
    return (
      <div className={showInfo ? 'About' : 'hideInfo'}>
        <div className='name'>{constants.name}</div>
        <div className='title'>{constants.title}</div>
        <div className='description'>{constants.description}</div>
        <div className='photo-contact'>
          <Button variant='outlined'
                  className='btn-outline'
                  onClick={() => this.connectClick()} >
            Let's Connect
          </Button>
          <img className='profile-img' src={profilePicture} alt=''/>
        </div>
      </div>
    );
  }
}

export default About;
