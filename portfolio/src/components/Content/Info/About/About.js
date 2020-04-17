import React from 'react';
import '../Info.css';

class About extends React.Component {

  render() {
    const { showInfo } = this.props;
    return (
      <div className={showInfo ? 'About' : 'hideInfo'}>
        About info here!
      </div>
    );
  }
}

export default About;
