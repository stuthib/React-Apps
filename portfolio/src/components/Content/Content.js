import React from 'react';
import { get, values } from 'lodash';
import './Content.css';
import Nav from './Nav/Nav';
import Info from './Info/Info';

const navInfoMap = {
  0: 'about',
//  1: 'education',
  1: 'experince',
  2: 'projects',
}

class Content extends React.Component {

  onNavChange = (index) => {
    this.setState({
      infoToShow: navInfoMap[index],
    })
  }

  render() {
    return (
      <div className='Content'>
        <Nav navItems={values(navInfoMap)}
             navItemChange={this.onNavChange}/>
        <div className='divider' />
        {
          this.props.display ?
          <Info infoToShow={get(this.state,'infoToShow','about')}/> :''
        }
      </div>
    );
  }
}

export default Content;
