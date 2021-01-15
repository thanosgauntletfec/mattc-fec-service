import React from 'react';
import axios from 'axios';
import Tour from './Tour.jsx';
import Info from './Info.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'tour',
      address: null
    };
  }



  getRandomId() {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let id = getRandomArbitrary(540, 640);
    console.log(id)
    return id;
  }

  componentDidMount() {
    let id = this.getRandomId();
    var address;
    axios.get(`/api/homes/${id}`)
      .then(res => {
        console.log(res.data[0].address)
        this.setState({
          address: res.data[0].address
        })
      })
  }

  changeView(view) {
    this.setState({
      view: view
    })
  }

  render() {
    if (this.state.view === 'tour') {
      return (
        <div>
          <div className="options">
            <span onClick={() => {this.changeView('tour')}} className={this.state.view === 'tour' ? "btn btn-active" : "btn"}>Schedule A Tour</span>
            <span onClick={() => {this.changeView('info')}} className={this.state.view === 'info' ? "btn btn-active" : "btn"}>Request Info</span>
          </div>
          <Tour address={this.state.address} />
        </div>
      );
    } else {
         return (
        <div>
          <div className="options">
            <span onClick={() => {this.changeView('tour')}} className={this.state.view === 'tour' ? "btn btn-active" : "btn"}>Schedule A Tour</span>
            <span onClick={() => {this.changeView('info')}} className={this.state.view === 'info' ? "btn btn-active" : "btn"}>Request Info</span>
          </div>
          <Info address={this.state.address} />
        </div>
      );
    }

  }
}

export default App;