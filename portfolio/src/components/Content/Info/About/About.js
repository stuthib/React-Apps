import React from 'react';
import '../Info.css';
import constants  from '../../../../consts';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import profilePicture from  '../../../../attachments/bio_img.png';

class About extends React.Component {

  connectClick() {
    document.location = "mailto:stuthibalaji@gmail.com";
  }

  render() {
    const { showInfo } = this.props;
    return (
      <div className={showInfo ? 'about' : 'hideInfo'}>
        <div className='name'>{constants.name}</div>
        <div className='title'>{constants.title}</div>
        <div className='description'>{constants.description}</div>
        <div className='photo-contact-skills'>
          <div className='skills-contact'>
            <span>Technologies I currently work with -</span>
            <div className='skills'>
              {
                  constants.technologies.map((item, index) => {
                    return(
                      <div className='skill-item-container' key={index}>
                        <ChevronRightIcon className='chevron-right'/>
                        <span className='skill-item'>{item}</span>
                      </div>
                    )
                  })

              }
            </div>
            <Button variant='outlined'
                    className='btn-outline'
                    onClick={() => this.connectClick()} >
              Let's Connect
            </Button>
          </div>
          <img className='profile-img' src={profilePicture} alt=''/>
        </div>
      </div>
    );
  }
}

export default About;
