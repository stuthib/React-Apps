var React = require('react');

var compStyle = {
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto'
}

var btnStyle = {
  height: '25px',
  width: '70px',
  marginTop: '20px',
  marginLeft: '10px',
  marginRight: '5px'
}

class PetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likesCount: 0
    };
    this.handleLikeBtnClick = this.handleLikeBtnClick.bind(this);
    this.handleDislikeBtnClick = this.handleDislikeBtnClick.bind(this);
  }

  handleLikeBtnClick() {
    console.log(this.props.petName + ' like button clicked');
    this.setState(function(prevState) {
      return{
        likesCount: prevState.likesCount + 1
      };
    });
  }

  handleDislikeBtnClick() {
    console.log(this.props.petName + ' dislike button clicked');
    this.setState(function(prevState) {
      return{
        likesCount: prevState.likesCount - 1
      };
    });
  }

  render() {
    return(
      <div style={compStyle}>
        <h3>{this.props.petName} Likes: {this.state.likesCount}</h3>
        <img src={this.props.petImgUrl}  alt={this.props.petName} style={{width: 300, height: 300}} />
        <br />
        <button style={btnStyle} onClick={this.handleLikeBtnClick}>Like</button>
        <button style={btnStyle} onClick={this.handleDislikeBtnClick}>Dislike</button>
      </div>
    );
  }
}

module.exports = PetComponent;
