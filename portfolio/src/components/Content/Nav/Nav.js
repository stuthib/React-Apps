import React from 'react';
import './Nav.css';

let timers = [];

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navSelected : 0,
    }
  }

  componentWillUnmount() {
    for(let i = 0; i < 3; i++) {
      clearTimeout(timers[i]);
    }
  }

  onNavItemClick(index) {
    this.props.navItemChange(index);
    this.setState({
      navSelected: index,
    });
  }

  render() {
    const { navItems } = this.props;
    let { navSelected } = this.state;
    return (
      <div className='Nav'>
        <ul>
          {
            navItems.map((item, index) => {
              return(
                <li key={index}
                    id={'navItem_'+index}
                    className={'showNav showNav_' + index + ((index === navSelected) ? ' selected ' : '')}
                    onClick={() => this.onNavItemClick(index)}>
                  {item}
                </li>
              )
            })
          }
        </ul>
        <div className={'vertical-slider vertical-slider-index-'+navSelected}/>
      </div>
    );
  }
}

export default Nav;
