import React from 'react';
import constants from '../constants';

const { ALL, ACTIVE, COMPLETED } = constants;

const Links = ({ filterName, currentFilter, onFilterChangeClick, children }) => {

  let linkStyle = { marginLeft: '3px', marginRight: '3px' };
  if(filterName === currentFilter) {
    linkStyle = {
                  marginLeft: '3px',
                  marginRight: '3px',
                  backgroundColor: '#e6e6e6',
                  textColor: '#adadad'
                };
  }

  return(
    <a
      href='#'
      className='btn btn-default btn-sm'
      style={linkStyle}
      onClick={evt => onFilterChangeClick(evt, filterName)}
    >
    <strong>{children}</strong>
    </a>
  );
}

const FilterLinks = (props) => {
  return(
    <div style={{marginBottom: '30px'}}>
      <Links { ...props } filterName={ALL}>{ALL}</Links>
      <Links { ...props } filterName={ACTIVE}>{ACTIVE}</Links>
      <Links { ...props } filterName={COMPLETED}>{COMPLETED}</Links>
    </div>
  );
}

export default FilterLinks;
