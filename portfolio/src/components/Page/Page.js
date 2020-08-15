import React from 'react'
import anime from 'animejs/lib/anime.es'
import './Page.css'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.enableContent = this.enableContent.bind(this)
    this.enableHeader = this.enableHeader.bind(this)
    this.state = {
      displayPage: false,
    }
  }

  componentDidMount() {
    this.loadLogo()
  }

  componentWillUnmount() {
    clearTimeout(this.contentTimer)
    clearTimeout(this.headerTimer)
  }

  loadLogo() {
    var pathEls = document.querySelectorAll('path')
    for (var i = 0; i < pathEls.length; i++) {
      var pathEl = pathEls[i]
      anime({
        targets: pathEl,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 3000,
        easing: 'cubicBezier(.1, .1, .1, .1)',
        autoplay: true,
        direction: 'normal',
        complete: (anim) => {
          this.contentTimer = setTimeout(this.enableContent, 2750)
          this.headerTimer = setTimeout(this.enableHeader, 1000)
        },
      })
    }
  }

  enableContent() {
    this.setState({ displayContent: true })
  }

  enableHeader() {
    this.setState({
      displayPage: true,
      displayHeader: true,
    })
  }

  render() {
    const { displayContent, displayPage, displayHeader } = this.state
    return (
      <div className="Page">
        {displayPage ? (
          <div>
            <Header display={displayHeader} />
            <Content display={displayContent} />
            <Footer />
          </div>
        ) : (
          <div className="logo-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="181.232"
              height="132.813"
              viewBox="0 0 181.232 132.813"
            >
              <path
                id="Path_2"
                data-name="Path 2"
                d="M681.807-6.638,607.563-53.816,523.9,6.453l83.664,51.978"
                transform="translate(-505.938 65.888)"
                fill="none"
                stroke="#09fbd3"
                strokeWidth="20"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="181.232"
              height="132.813"
              viewBox="0 -90 181.232 132.813"
            >
              <path
                id="Path_3"
                data-name="Path 3"
                d="M540.343,206.951l73.182,42.333,89.51-58.63L613.525,138.9"
                transform="translate(-535.336 -130.242)"
                fill="none"
                stroke="#09fbd3"
                strokeWidth="20"
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
}

export default Page
