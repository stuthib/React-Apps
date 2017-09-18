import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock';
import Form from './Form';
import Reservation from './Reservation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myInput : "",
      myText : "",
      myOption : "",
      isGoing : true,
      numOfGuests : 2,
      myTheme : "retro"
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFromSubmit = this.handleFromSubmit.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleReservationInputChange = this.handleReservationInputChange.bind(this);
    this.handleReservationInputSubmit = this.handleReservationInputSubmit.bind(this);
  }
  handleInputChange(e) {
    const myInputVal = e.target.value;
    this.setState(() => {
      return {
        myInput : myInputVal
      }
    });
  }

  handleTextChange(e) {
    const myTextVal = e.target.value;
    this.setState(() => {
      return {
        myText : myTextVal
      }
    });
  }

  handleOptionsChange(e) {
    var myOptionVal = e.target.value;
    this.setState(() => {
      return{
        myOption : myOptionVal
      }
    });
  }

  handleReservationInputChange(e) {
    const target = e.target;
    let value = null;
    let name = null;
    if(target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }
    name = target.name;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }

  handleReservationInputSubmit(e) {
    alert('I am going: ' + this.state.isGoing + " Numbe of guests: " + this.state.numOfGuests + " My theme is: " + this.state.myTheme);
    e.preventDefault();
  }

  handleFromSubmit(e) {
    alert('The input option is: ' + this.state.myOption);
    e.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Clock />
        <div>
          <h4>Array : {this.props.propArray}</h4>
          <h4>Boolean : {this.props.propBool ? "True" : "False"}</h4>
          <h4>Function : {this.props.propFunc(5)}</h4>
        </div>
        <div>
          <Form
            inputValue={this.state.myInput}
            onInputChange={this.handleInputChange}
            onTextChange={this.handleTextChange}
            onFormSubmit={this.handleFromSubmit}
            onOptionsChange={this.handleOptionsChange}
          />
          <h4>Input : {this.state.myInput}</h4>
          <h4>Text : {this.state.myText}</h4>
        </div>
        <hr />
        <div>
          <Reservation
            onInputChange={this.handleReservationInputChange}
            onReservationFormSubmit={this.handleReservationInputSubmit}
            isGoing={this.state.isGoing}
            numOfGuests={this.state.numOfGuests}
            myTheme={this.state.myTheme}
          />
        </div>
      </div>
    );
  }
}



App.propTypes = {
  propArray : React.PropTypes.array.isRequired,
  propBool : React.PropTypes.bool.isRequired,
  propFunc : React.PropTypes.func,
  propNumber : React.PropTypes.number,
  propString : React.PropTypes.string,
  propObject : React.PropTypes.object
}

App.defaultProps = {
  propArray : [1,2,3,4],
  propBool : true,
  propFunc : function(e) {return e},
  propNumber : 1,
  propString : "Prop Validations",
  propObject : {
    key1 : "Val1",
    key2 : "Val2"
  }


}

export default App;
