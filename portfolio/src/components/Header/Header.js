import React from 'react'
import resume from '../../attachments/resume.pdf'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import stuthi_logo from '../../attachments/logos/stuthi_logo@1x.png'
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.showLogo = this.showLogo.bind(this)
    this.showGitIcon = this.showGitIcon.bind(this)
    this.showLinkedInIcon = this.showLinkedInIcon.bind(this)
    this.showResume = this.showResume.bind(this)

    this.state = {
      displayLogo: false,
      displayGitIcon: false,
      displayLinkedIn: false,
      displayResume: false,
    }
  }

  componentDidMount() {
    this.logoTimer = setTimeout(this.showLogo, 500)
    this.gitIconTimer = setTimeout(this.showGitIcon, 500)
    this.linkedInTimer = setTimeout(this.showLinkedInIcon, 750)
    this.resumeTimer = setTimeout(this.showResume, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.logoTimer)
    clearTimeout(this.gitIconTimer)
    clearTimeout(this.linkedInTimer)
    clearTimeout(this.resumeTimer)
  }

  showLogo() {
    this.setState({ displayLogo: true })
  }

  showGitIcon() {
    this.setState({ displayGitIcon: true })
  }

  showLinkedInIcon() {
    this.setState({ displayLinkedIn: true })
  }

  showResume() {
    this.setState({ displayResume: true })
  }

  gitHubIconClick() {
    window.open('https://github.com/stuthib/React-Apps')
    return false
  }

  linkedInIconClick() {
    window.open('https://www.linkedin.com/in/stuthibalaji/')
    return false
  }

  render() {
    const {
      displayLogo,
      displayGitIcon,
      displayLinkedIn,
      displayResume,
    } = this.state
    const { display } = this.props
    return display ? (
      <div className="Header">
        <header className="App-header">
          <div className="Icon-holder">
            {displayLogo ? <img src={stuthi_logo} alt="logo" /> : ''}
          </div>
          <div className="Links-holder">
            <GitHubIcon
              className={'header-link' + (displayGitIcon ? ' show' : ' hide')}
              onClick={() => this.gitHubIconClick()}
            />
            <LinkedInIcon
              className={'header-link' + (displayLinkedIn ? ' show' : ' hide')}
              onClick={() => this.linkedInIconClick()}
            />
            <a
              className={'resume-link' + (displayResume ? ' show' : ' hide')}
              href={resume}
              download
            >
              resume
            </a>
          </div>
        </header>
      </div>
    ) : (
      ''
    )
  }
}

export default Header
