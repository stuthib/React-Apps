import React from 'react';
import '../Info.css';

class Experience extends React.Component {

  render() {
    const { showInfo } = this.props;
    return (
      <div className={showInfo ? 'experince' : 'hideInfo'}>
        Experience info here!
      </div>
    );
  }
}

export default Experience;
