import React from 'react';
import { get, map } from 'lodash';

const gridHeader = ['Year','113 Cause Name','Cause Name','State','Deaths','Death Rate',];


class GridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      colSortType: Array(6).fill(0),
    }
    this.handleSort = this.handleSort.bind(this);
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

  handleSort(index) {
    //let { isFilterSet } = this.state;
    let dataToSort = this.props.data;//isFilterSet ? get(this.state,'dataToShow','data') : get(this.state,'data',[]);
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
      sortOnCol: index,
    })
  }

  render() {
    return (
      <div style={{height:'65vw'}}>
        <div className='grid-container grid-header'>
          <div className='grid-item grid-item-header'>
            {
              map(gridHeader, (item, index) => {
                return <div className='element element-header'
                            key={index}
                            onClick={() => this.handleSort(index)}>
                            <span className='element-text'>
                              {item}
                            </span>
                            {
                              (index === get(this.state,'sortOnCol',-1)) ?
                                <i className={'caret-icon zmdi zmdi-caret-' +
                                ((get(this.state,['colSortType',index],0) === -1) ? 'down'
                                : (get(this.state,['colSortType',index],0) === 1) ? 'up'
                                : '')}>
                                </i>
                               : ''
                            }

                        </div>
              })
            }
          </div>
        </div>
        <div className='grid-container'>
        {
          this.props.data.map((data, i) => {
            return <div className='grid-item' key={i}>
            {
              data.map((item, index) => {
                return <div className='element' key={index}>
                <span className='element-text'>{item}</span>
                </div>
              })
            }
            </div>
          })
        }
        </div>
      </div>
    );
  }
}

export default GridLayout;
