import React from 'react';
import About from './About/About';
import Projects from './Projects/Projects';
import Education from './Education/Education';
import Experience from './Experience/Experience';
import './Info.css';

class Info extends React.Component {

  render() {
    let { infoToShow } = this.props;
    return (
      <div className='Info'>
        <About showInfo={infoToShow === 'about'}/>
        <Education showInfo={infoToShow === 'education'}/>
        <Experience showInfo={infoToShow === 'experience'}/>
        <Projects showInfo={infoToShow === 'projects'}/>
      </div>
    );
  }
}

export default Info;
