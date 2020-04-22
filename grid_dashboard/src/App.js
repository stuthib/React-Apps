import React from 'react';
import { get, filter } from 'lodash';
import './App.css';
import Chart from './Chart';
import Controls from './Controls';
import GridLayout from './GridLayout';
import PaginationControls from './PaginationControls';

const axios = require('axios');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colSortType: Array(14).fill(0),
      autoCompleteOptions: {},
      isFilterSet: false,
      data: [],
      dataToShow: [],
    }
  }

  componentDidMount() {
    axios.get('/readData')
      .then((response) => {
        let data = get(response.data,'data',[]);
        let autoCompleteOptions = get(response.data,'autoCompleteOptions',{});
        let pageControls = get(response.data,'pageControls',{});
        this.setState({
          autoCompleteOptions,
          data,
          pageControls,
        })
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  getFormattedData(data) {
    if(typeof data === 'string') {
      if(!isNaN(data)){
        return +data;
      } else {
        return data.replace(/[^a-zA-Z ]/g, "").toLowerCase();
      }
    } else
    return data;
  }

  getFilteredData(searchText, filterBy) {
    let { data, isFilterSet } = this.state;
    let filteredData = [];
    if(searchText.length > 0) {
      let index = (filterBy === 'state') ? 3 : 2;
      filteredData = filter(data, function(d) {
        return (d[index].toLowerCase() === searchText.toLowerCase());
      });
      isFilterSet = true;
    } else {
      isFilterSet = false;
    }
    this.setState({
      isFilterSet,
      dataToShow: isFilterSet ? filteredData : data,
    })
  }

  sortAsc(data, index) {
    return data.sort((a, b) => {
      let aData = this.getFormattedData(a[index]);
      let bData = this.getFormattedData(b[index]);

      if(aData < bData) return -1;
      if(aData > bData) return 1;
      return 0;
    })
  }

  sortDsc(data, index) {
    return data.sort((a, b) => {
      let aData = this.getFormattedData(a[index]);
      let bData = this.getFormattedData(b[index]);

      if(aData > bData) return -1;
      if(aData < bData) return 1;
      return 0;
    })
  }

  sortData(index) {
    let { isFilterSet } = this.state;
    let dataToSort = isFilterSet ? get(this.state,'dataToShow','data') : get(this.state,'data',[]);
    let colSort = get(this.state,'colSortType',[]);
    if(colSort[index] >= 0) {
      dataToSort = this.sortAsc(dataToSort, index);
      colSort.splice(index, 1, -1);
    } else if(colSort[index] < 0) {
      dataToSort = this.sortDsc(dataToSort, index);
      colSort.splice(index, 1, 1);
    } else {
      console.log('No need to sort!');
    }
    this.setState({
      dataToShow: dataToSort,
      colSortType: colSort,
    })
  }

  handleFilterTypeChange(type) {
    this.setState({
      filterBy: type,
    });
  }

  handleSearchSubmit(searchText) {
    this.getFilteredData(searchText, get(this.state,'filterBy',''));
    this.setState({
      isFilterSet: (searchText.length === 0) ? false : true,
    });
  }

  handlePageChange(pageNum) {
    axios.get('/pageData?pageNum='+pageNum)
      .then((response) => {
        this.setState({
          data: get(response.data,'data',[]),
          dataToShow: [],
          isFilterSet: false,
        })
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    let { isFilterSet } = this.state;
    return (
      <div className='App'>
        <div className='spacer'/>
        <header className='App-header'>
          <div>NCHS Data</div>
        </header>
        <Chart />
        <Controls autoCompleteOptions={get(this.state,'autoCompleteOptions',[])}
                  filterTypeChange={this.handleFilterTypeChange.bind(this)}
                  onSearchSubmit={this.handleSearchSubmit.bind(this)}/>
        <GridLayout handleSort={this.sortData.bind(this)}
                    data={isFilterSet ? get(this.state,'dataToShow','data') : get(this.state,'data',[])}/>
        <PaginationControls pageControls={get(this.state,'pageControls',{})}
                            onPageChange={this.handlePageChange.bind(this)}/>
        <div className='spacer'/>
      </div>
    );
  }
}

export default App;
