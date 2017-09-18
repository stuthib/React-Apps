import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/* const friends = [
// 		{name:'Chandler', img: 'https://www.missmalini.com/wp-content/uploads/2014/09/Chandler-Bing1.jpg'},
// 		{name: 'Joey', img: 'https://s-media-cache-ak0.pinimg.com/236x/e2/ec/89/e2ec892e4ea3611027d5a9b545624005.jpg'},
// 		{name: 'Ross', img: 'http://cdn01.ts.infobae.com/adjuntos/164/imagenes/011/068/0011068055.jpg'}
// 	];
//
//   var friendsUI = friends.map(function(friend) {
//     return (
//       `<h1>${friend.name}</h1>
//       <img src=${friend.img} alt=${friend.name} style="width:300px; height:300px;"" />`
//     );
//   });
//
//   document.getElementById('root').innerHTML = friendsUI;

 import * as mathUtils from './math';
 import mathAbs as abs from './math';

 console.log(mathUtils.add(3, 4));
 console.log(mathUtils.sub(3, 4));
 console.log(abs(3, 4));

 class Content extends React.Component {
   this.state = {
     data = [
       {
         id : 1,
         name : 'Stuthi',
         age : '26'
       },
       {
         id : 2,
         name : 'Ranajeet',
         age : '29'
       }
     ];
   };

   render() {
     return (
       <h4>Table with persons data:</h4>
       <table>
        <thead>
          <th>
            <td>ID</td>
            <td>Name</td>
            <td>Age</td>
          </th>
        </thead>

        <tbody>
          {this.state.data.map((person, i) => <TableRow key={i} data={person}/> )}
        </tbody>
       </table>
     );
   }
 }

 class TableRow extends React.Component {
   render() {
     return (
       <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.age}</td>
       </tr>
     );
   }
 }

class Clock extends React.Component {
  constructor(props) {
    super(props) {
      date : new Date()
    }
  }

  componentDidMount() {
    const timer = setInterval(
      () => {
        tick()
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  tick() {
    this.setState((prevState) => {
      return{
        date : new Date();
      }
    });
  }

  render() {
    return(
      <h1>The current time is: </h1>
    );
  }
}
*/
