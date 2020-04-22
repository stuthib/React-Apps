import React from 'react';
import { uniqBy } from 'lodash';
import Highcharts from 'highcharts/highstock.src.js';
import sunburst from 'highcharts/modules/sunburst.js';
sunburst(Highcharts);


const axios = require('axios');

class Chart extends React.Component {

  componentDidMount() {
    let data = [];
    axios.get('/sunburst')
      .then((response) => {
        data = response.data;
        console.log('DATA--- ', JSON.stringify(data));
        uniqBy(data, 'id');
        this.loadChart(data);
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  loadChart(data) {

    Highcharts.getOptions().colors.splice(0, 0, 'transparent');
    Highcharts.chart('container', {

      chart: {
        height: '100%',
        backgroundColor: '#353333',
      },

      title: {
        text: ''
      },
      // subtitle: {
      //   text: 'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
      // },
      series: [{
        type: "sunburst",
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
          format: '{point.name}',
          filter: {
            property: 'innerArcLength',
            operator: '>',
            value: 16
          }
        },
        levels: [{
          level: 1,
          levelIsConstant: false,
          dataLabels: {
            filter: {
              property: 'outerArcLength',
              operator: '>',
              value: 64
            }
          }
        }, {
          level: 2,
          colorByPoint: true
        },
        {
          level: 3,
          colorVariation: {
            key: 'brightness',
            to: -0.5
          }
        }, {
          level: 4,
          colorVariation: {
            key: 'brightness',
            to: 0.5
          }
        }]

      }],
      tooltip: {
        headerFormat: "",
        pointFormat: '<b>{point.name}</b> is <b>{point.value}</b>'
      }
    });
  }


  render() {
    return(

      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
    )
  }
}

export default Chart;
