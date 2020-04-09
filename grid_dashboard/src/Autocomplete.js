import React, { Component } from 'react';

export class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      showSelectedOption: false,
      activeOption: '',
      filteredOptions: [],
      showSuggestions: false,
      userInput: '',
      activeIndex: -1,
    }
  }

  handleSearchChange(event) {
    this.getSuggestions(event.target.value);
  }

  handleKeyDown(event) {
    let { userInput, activeIndex, filteredOptions } = this.state;
    if(event.keyCode === 8) {
      userInput.substring(0, userInput.length-1);
    } else if(event.keyCode === 38) {
      if(activeIndex === 0) return;
      this.setState({
        activeIndex: activeIndex - 1,
      })
    } else if(event.keyCode === 40) {
      if(activeIndex === filteredOptions.length) return;
      this.setState({
        activeIndex: activeIndex + 1,
      })
    } else if(event.keyCode === 13) {
      userInput = filteredOptions[activeIndex];
      this.onOptionClick(filteredOptions[activeIndex], activeIndex);
      return;
    }
    this.getSuggestions(userInput);
  }

  getSuggestions(userInput) {
    let {searchSuggestions } = this.props;
    const filteredOptions = searchSuggestions.filter(
      (option) => {
        return option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      }
    );
    this.setState({
      filteredOptions,
      userInput,
      showSelectedOption: false,
      showSuggestions: true,
    })
  }



  handleSearchSubmit(event) {
    let { activeOption, userInput } = this.state;
    if(userInput.length === 0) {
        activeOption = userInput;
    }
    this.props.onSearchClick(activeOption);
  }

  onOptionClick(optionName, index) {
    this.setState({
      showSelectedOption: true,
      activeOption: optionName,
      activeIndex: index,
      showSuggestions: false,
      userInput: optionName,
    })
  }

  render() {
    let { enableSearch } = this.props;
    let {
      filteredOptions,
      userInput,
      showSelectedOption,
      activeOption,
      showSuggestions,
      activeIndex
    } = this.state;
    let showSearchList = (filteredOptions.length > 0) && showSuggestions;
    return (
      <div className={!enableSearch ? 'search-container search-container-disable' : 'search-container'}>
        <input type='text' className='search-box'
               value={showSelectedOption ? activeOption : userInput}
               disabled={!enableSearch}
               onChange={this.handleSearchChange}
               onKeyDown={this.handleKeyDown} />
        <i className='zmdi zmdi-search search-button' onClick={this.handleSearchSubmit}></i>
        {

            (userInput && showSearchList) ?
            <div className='options-container'>
              <ul className="options">
                {
                  filteredOptions.map((optionName, index) => {
                  return (
                    <li className={(index===activeIndex) ? 'hoverItem' : ''} key={optionName} onClick={() => this.onOptionClick(optionName, index)}>
                      {optionName}
                    </li>
                  );
                })}
              </ul>
            </div> : ''
        }
      </div>
    );
  }
}
export default Autocomplete;
