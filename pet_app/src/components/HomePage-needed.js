var React = require('react');
var PetComponent = require('./PetComponent');

var style = {
  textAlign : 'center',
  fontSize : '2em',
  color : 'rebeccapurple'
};

var btnStyle = {
  marginTop: 20,
  marginRight: 5,
  height: 25
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.catCompInstRef = null;
    this.dogCompInstRef = null;
    this.setCatCompInst = this.setCatCompInst.bind(this);
    this.setDogCompInst = this.setDogCompInst.bind(this);
    this.handleShowWinnerBtnClick = this.handleShowWinnerBtnClick.bind(this);
    this.handleStartOverBtnClick = this.handleStartOverBtnClick.bind(this);
  }

  setCatCompInst(compInst) {
    this.catCompInstRef = compInst;
  }

  setDogCompInst(compInst) {
    this.dogCompInstRef = compInst;
  }

  handleShowWinnerBtnClick() {
    var catLikesCount = this.catCompInstRef.state.likesCount;
    var dogLikesCount = this.dogCompInstRef.state.likesCount;

    if (catLikesCount > dogLikesCount) {
      console.log('cat is the winner');
    } else if (dogLikesCount > catLikesCount) {
      console.log('dog is the winner');
    } else {
      console.log('it is a tie');
    }
  }

  handleStartOverBtnClick() {
    console.console.log('Clicked Start Over');
  }

  render() {
    return(
      <div>
        <h1 style={style}>
          Welcome to Cuteness Fight Game!
        </h1>
        <div style={{marginTop: 60, textAlign:'center'}}>
          <PetComponent
            petName='Cat'
            ref = {this.setCatCompInst}
            petImgUrl='http://www.cutestpaw.com/wp-content/uploads/2011/11/Henke.jpg'/>
          <PetComponent
            petName='Dog'
            ref = {this.setDogCompInst}
            petImgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RybGWjFumtT-oOElXe_Gv9z3-Q0J0ePPJa2wUhtdW3fs2mP76A'/>
        </div>
        <div style={{textAlign: 'center'}}>
          <button style={btnStyle} onClick={this.handleShowWinnerBtnClick}>Show Winner</button>
          <button style={btnStyle} onClick={this.handleStartOverBtnClick}>Start Over</button>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;
