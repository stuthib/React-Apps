import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { get } from 'lodash';

class PaginationControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curPage: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt, val) {
    this.props.onPageChange(val);
    this.setState({
      curPage: val,
    })
  }
  render(){
    return(
      <div className='pagination-holder'>
        <Pagination count={get(this.props,'pageControls.maxPage',0)}
        variant='outlined'
        size='large'
        color='primary'
        showFirstButton showLastButton
        defaultPage={1} siblingCount={0}
        onChange={this.handleChange} />
      </div>
    )
  }
}

export default PaginationControls;
