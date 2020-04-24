
const { get, has, forEach, keys, find, set } = require('lodash');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { statesData } = require('./states.js');


const PORT = process.env.PORT || 5000;
let respData;

app
  .use(express.static(path.join(__dirname, '/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

function createBaseSet() {
    let baseSet = [{
      id: '0.0',
      parent: '',
      name: 'USA'
    }];
    let states = keys(statesData);
    states.forEach(s => {
      baseSet.push({
        id: statesData[s].toString(),
        parent: '0.0',
        name: s
      });
    });
    return baseSet;
}

function createUniqDiseaseSet(data) {
  //console.log('---- ', data);
  let stateDiseaseMap = {};
  data.forEach(d => {
    let state = d[11];
    let cause = d[10];
    let value = d[12];
    if(has(stateDiseaseMap, state)) {
      let stateMap = stateDiseaseMap[state];
      if(has(stateMap, cause)) {
        let val = Number(value) + Number(stateMap[cause]);
        stateMap[cause] = val;
      } else {
        stateMap[cause] = Number(value);
      }
    } else {
      let disease = {};
      disease[cause] = Number(value);
      stateDiseaseMap[state] = disease;
    }
  })
  return stateDiseaseMap;

}

app.get('/sunburst', (req, res) => {
  let dataSet = createBaseSet();

  let idCounter = Object.assign({}, statesData);
  fs.readFile('data.json', function(err, data) {
    let formattedData = JSON.parse(data).data || [];
    let uniquDiseaseSet = createUniqDiseaseSet(formattedData);
    let states = keys(statesData);
    let stateCauseIdMap = Object.assign({}, statesData);
    states.forEach(s => {

      let diseasesValues = uniquDiseaseSet[s];
      let diseases = keys(diseasesValues);

      diseases.forEach(d => {
        let parentID = statesData[s];
        let childId = Number(stateCauseIdMap[s]) + 0.01;
        stateCauseIdMap[s] = childId;
        let node = {
          id: childId.toString(),
          parent: parentID.toString(),
          name: d,
          value: diseasesValues[d],
        }
        dataSet.push(node);
      })
    });
    res.write(JSON.stringify(dataSet));
    res.end();
  });
});

app.get('/readData', (req, res) => {

  createBaseSet();
  respData = [];
  fs.readFile('data.json', function(err, data) {
    let formattedData = JSON.parse(data).data || [];
    let stateOptions = {}, causeOptions = {};
    formattedData.forEach(d => {
      d = d.slice(8, d.length);
      respData.push(d);
      let state = d[3];
      let cause = d[2];
      if(!has(stateOptions, state)){
        stateOptions[state] = 1;
      }
      if(!has(causeOptions, cause)){
        causeOptions[cause] = 1;
      }
    })
    let response = {
      'data':respData.slice(0,1000),
      'autoCompleteOptions':{'state':keys(stateOptions), 'cause':keys(causeOptions)},
      'pageControls':{'minPage':0, 'maxPage':Math.floor(respData.length/1000)+1},
    }
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('/pageData', (req, res) => {
  let pageNum = req.query.pageNum || 0;
  let startIndex = (pageNum -1) * 1000;
  let endIndex = Math.min(respData.length, startIndex + 1000);
  let response = respData.slice(startIndex, endIndex);
  res.write(JSON.stringify({'data':response}));
  res.end();
});
