import React from 'react';
import {get} from 'lodash';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from './Autocomplete';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSearch: false,
      searchSuggestions: [],
    };
    this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
  }

  handleFilterTypeChange(event) {
    let type = event.target.value;
    let searchOptions= get(this.props,'autoCompleteOptions',{});
    let searchSuggestions = searchOptions[type] || [];
    this.setState({
      searchSuggestions,
      enableSearch: true,
    });
    this.props.filterTypeChange(type);
  }

  render() {
    return(
      <div>
        <div className='sort-controls'>
          <div className='controls-text'>Filter Data Set: </div>
          <RadioGroup name='data-sort' onChange={this.handleFilterTypeChange}>
            <FormControlLabel value="state" control={<Radio />} label="State" />
            <FormControlLabel value="cause" control={<Radio />} label="Cause" />
          </RadioGroup>
          <Autocomplete searchSuggestions={get(this.state,'searchSuggestions',[])}
                        onSearchClick={this.props.onSearchSubmit}
                        enableSearch={get(this.state,'enableSearch',false)}  />
        </div>
      </div>
    )
  }
}

export default Controls;
