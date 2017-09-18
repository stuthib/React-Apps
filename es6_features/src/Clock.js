import React from 'react';

class Clock extends React.Component {

  constructor(props) {
    super(props);
     this.timer = null;
    this.state = {
      date : new Date()
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState(() => {
      return{
        date : new Date()
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return(
      <h2>Current time is {this.state.date.toString()}</h2>
    );
  }
}

export default Clock;
