import React from 'react';
import '../Info.css';
import { get, keys } from 'lodash';
import constants  from '../../../../consts';
import DetailsIcon from '@material-ui/icons/Details';
import GitHubIcon from '@material-ui/icons/GitHub';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

import sunburst_main  from '../../../../attachments/nchs_dashboard/sunburst_main.png';
import sunburst_detail_view  from '../../../../attachments/nchs_dashboard/sunburst_detailed.png';
import grid_view  from '../../../../attachments/nchs_dashboard/gridview.png';

class Projects extends React.Component {

  gitHubIconClick(link) {
    window.open(link);
    return false;
  }

  getProjectDeatils(projectName) {
    const projectDetails = constants.projects[projectName];
    let projectImages = {
      'NCHS Dashboard': [sunburst_main, sunburst_detail_view, grid_view],
    }
    let details = projectDetails.projectDetails.map((item, index) => {
      let images = projectImages[projectName];
      return {
        image: images[index],
        description: item,
      }
    })
    console.log(details);

    return details;
  }

  detailViewClick(item) {
    console.log('onclick: ', item);
    this.setState({
      openModal: true,
      projectClicked: item,
    })
  }

  closeModalView() {
    this.setState({
      openModal: false,
    })
  }

  renderModal() {
    const imagesToShow = this.getProjectDeatils(get(this.state,'projectClicked',[]));
    return(
      <div className='modal'>
        <Modal
          open={get(this.state,'openModal', true)}
          onClose={() => this.closeModalView()}
          className='modalContainer'
        >
        {
          <div className='modal-data-holder bounce-4'>
            <CloseIcon className='close-icon' onClick={() => this.closeModalView()}/>
            {
              imagesToShow.map((detail, index) => {
                return(
                  <div className='modalDetail'>
                    <img src={detail.image} alt='img'/>
                    <div>
                    {
                      get(detail,'description','')
                    }
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
        </Modal>
      </div>
    )
  }

  render() {
    const { showInfo } = this.props;
    const projects = keys(constants.projects);
    return (
      <div className={showInfo ? 'projects' : 'hideInfo'}>
        {
          projects.map((item, index) => {
            let cardData = constants.projects[item];
            let showGitHubIcon = !get(cardData,'githubLink') ? ' hideGitIcon' : '';
            console.log(item);
            return(
              <div key={index} className='project-card'>
                <div className='card-links'>
                  <DetailsIcon className='card-icon' onClick={() => this.detailViewClick(item)}/>
                  <GitHubIcon className={'card-icon' + showGitHubIcon}
                              onClick={() => this.gitHubIconClick(cardData.githubLink)}/>
                </div>
                <div className='project-card-title'>{cardData.title}</div>
                <div className='project-card-details'>{cardData.description}</div>
                <div className='project-card-tech'>
                {
                  cardData.technologies.map((tech, i) => {
                    return(
                      <span>{tech}</span>
                    )
                  })
                }
                </div>
              </div>
            )
          })
        }
        <div>
        {
          get(this.state,'openModal', false) ? this.renderModal() : ''
        }
        </div>
      </div>
    );
  }
}

export default Projects;
