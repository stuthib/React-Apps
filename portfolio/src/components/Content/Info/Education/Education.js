import React from 'react'

class Education extends React.Component {
  render() {
    const { showInfo } = this.props
    return (
      <div className={showInfo ? 'Education' : 'hideInfo'}>
        Education info here!
      </div>
    )
  }
}

export default Education
