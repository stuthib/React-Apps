import React from 'react';
import '../Info.css';
import { get, keys } from 'lodash';
import constants  from '../../../../consts';
import balbix_logo from  '../../../../attachments/logos/balbix_logo.png';
import egain_logo from  '../../../../attachments/logos/egain_logo.png';
import kareo_logo from  '../../../../attachments/logos/kareo_logo.png';
import borqs_logo from  '../../../../attachments/logos/borqs_logo.jpeg';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class Experience extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      companySelectedIndex: 0,
    }
  }

  experienceClick(index) {
    this.setState({
      companySelectedIndex: index,
    })
  }

  getCompanyInfo(companyName) {
    const companyDetails = constants['experince'][companyName];
    return companyDetails;
  }

  getImage(companyName) {
    const nameImgMap = {
      balbix: balbix_logo,
      egain: egain_logo,
      kareo: kareo_logo,
      borqs: borqs_logo,
    }
    return nameImgMap[companyName];
  }

  render() {
    const { showInfo } = this.props;
    const selectedIndex = get(this.state,'companySelectedIndex',0);
    const companies = keys(constants.experince);
    let companyDetails = this.getCompanyInfo(companies[selectedIndex]);
    return (
      <div className={showInfo ? 'experince' : 'hideInfo'}>
        <span className='title experince-title'>I have worked at,</span>
        <div className='experince-list'>
          {
            companies.map((item, index) => {
              return(
                <div className='experince-item'
                      onClick={() => this.experienceClick(index)}>
                  {item}
                </div>
              )
            })
          }
        </div>
        <hr className={'hr-margin-'+selectedIndex}/>
        <div className='experince-details'>
          <div className='logo-title'>
            <img src={this.getImage(companies[selectedIndex])}/>
            <span>{companyDetails.title}</span>
          </div>
          <span className='timeframe'>{companyDetails.time}</span>
          <div className='experince-projects'>
            {
              companyDetails.projects.map((item, index) => {
                return(
                  <div className='project-details'>
                    <ChevronRightIcon className='chevron-right'/>
                    <div>
                    {item}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;