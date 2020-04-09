
const { has, forEach, keys } = require('lodash');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');


const PORT = process.env.PORT || 5000;
let respData;

app
  .use(express.static(path.join(__dirname, '/build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.get('/readData', (req, res) => {
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
