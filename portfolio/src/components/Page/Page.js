import React from 'react';
import './Page.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.enableContent = this.enableContent.bind(this);
    this.state = {
      displayMessage: false,
    };
  }

  componentDidMount() {
    this.contentTimer = setTimeout(this.enableContent, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.contentTimer);
  }

  enableContent() {
    this.setState({displayContent: true});
  }

  render() {

    const {displayContent} = this.state;
    return(
      <div className="Page">
        <Header />
        <Content display={displayContent}/>
        <Footer />
      </div>
    );
  }
}

export default Page;
