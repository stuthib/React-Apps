var React = require('react');
var PetComponent = require('./PetComponent')
var axios = require('axios');
var constants = require('../constants');

var style = {
  textAlign: 'center',
  marginTop: 20,
  marginLeft: 20
};

var CAT = constants.CAT;
var DOG = constants.DOG;
var WINNER = constants.WINNER;
var LOSER = constants.LOSER;
var TIE = constants.TIE;
var API_KEY =  constants.API_KEY;

var CAT_URL = 'http://localhost:63000/cat/?api_key=' + API_KEY;
var DOG_URL = 'http://localhost:63000/dog/?api_key=' + API_KEY;

class PetGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cat: { result: '', imageURL: ''},
      dog: { result: '', imageURL: ''}
    };
    this.catLikesCount = 0;
    this.dogLikesCount = 0;
    this.handleLikeBtnClick = this.handleLikeBtnClick.bind(this);
    this.handleDislikeBtnClick = this.handleDislikeBtnClick.bind(this);
    this.handleShowWinnerBtnClick = this.handleShowWinnerBtnClick.bind(this);
    this.handleStartOverBtnClick = this.handleStartOverBtnClick.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchCatImageURL() {
    axios.get(CAT_URL)
      .then(function(resp) {
        var imageURL = resp.data.imageUrl;
        this.setState(function(prevState) {
          return{
            cat: { result: prevState.cat.result, imageURL: imageURL }
          };
        })
      }.bind(this));
  }

  fetchDogImageURL() {
    axios.get(DOG_URL)
      .then(function(resp) {
        var imageURL = resp.data.imageUrl;
        this.setState(function(prevState) {
          return{
            dog: { result: prevState.dog.result, imageURL: imageURL}
          };
        });
      }.bind(this));
  }

  fetPetImage(PET_URL, petName) {
    petName = petName.toLowerCase();
    axios.get(PET_URL)
      .then(function(resp) {
        var imageUrl = resp.data.imageUrl;
        this.setState(function(prevState) {
          var state = {};
          state[petName] = { result: prevState[petName].result, imageURL: imageUrl };
          return state;
        });
      }.bind(this));
  }

  fetchImages() {
    this.fetPetImage(CAT_URL, CAT);
    this.fetPetImage(DOG_URL, DOG);
  }

  handleLikeBtnClick(event) {
    var petName = event.target.value;
    this.handleLikeDislikeBtnClick(petName, 1);
  }

  handleDislikeBtnClick(event) {
    var petName = event.target.value;
    this.handleLikeDislikeBtnClick(petName, -1);
  }

  handleLikeDislikeBtnClick(petName, operation) {
    this.fetchImages();

    if(petName === CAT) {
      this.catLikesCount += operation;
    } else if(petName === DOG) {
      this.dogLikesCount += operation;
    }
  }

  handleShowWinnerBtnClick() {
    var catResult = TIE;
    var dogResult = TIE;
    var catLikesCount = this.catLikesCount;
    var dogLikesCount = this.dogLikesCount;

    if(catLikesCount > dogLikesCount) {
      catResult = WINNER;
      dogResult = LOSER;
    } else if (dogLikesCount > catLikesCount) {
      catResult = LOSER;
      dogResult = WINNER;
    }

    this.setState(function(prevState) {
      return{
        cat: { result: catResult, imageURL: prevState.cat.imageURL},
        dog: { result: dogResult, imageURL: prevState.dog.imageURL}
      }
    });
  }

  handleStartOverBtnClick() {
    this.fetchImages();
    this.catLikesCount = 0;
    this.dogLikesCount = 0;
    this.setState({
      cat: { result: '', imageURL: '' },
      dog: { result: '', imageURL: '' }
    });
  }

  render() {
    return (
      <div>
        <div style={style}>
          <PetComponent
            imgUrl = {this.state.cat.imageURL}
            petName = {CAT}
            likesCount = {this.catLikesCount}
            result = {this.state.cat.result}
            onLikeButtonClick = {this.handleLikeBtnClick}
            onDislikeButtonClick = {this.handleDislikeBtnClick} />
          <PetComponent
            imgUrl = {this.state.dog.imageURL}
            petName = {DOG}
            likesCount = {this.dogLikesCount}
            result = {this.state.dog.result}
            onLikeButtonClick = {this.handleLikeBtnClick}
            onDislikeButtonClick = {this.handleDislikeBtnClick} />
        </div>
        <div style = {style}>
          {!this.state.dog.result && <button style = {style} onClick = {this.handleShowWinnerBtnClick}>Show Winner</button>}
          <button style = {style} onClick = {this.handleStartOverBtnClick}>Start Over</button>
        </div>
      </div>
    );
  }
}

module.exports = PetGame;
