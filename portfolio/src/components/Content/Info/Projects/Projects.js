import React from 'react';
import '../Info.css';

class Projects extends React.Component {

  render() {
    const { showInfo } = this.props;
    return (
      <div className={showInfo ? 'experince' : 'hideInfo'}>
        Projects info here!
      </div>
    );
  }
}

export default Projects;
