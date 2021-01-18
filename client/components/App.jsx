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
        this.setState({
          address: res.data
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
            <span className="btn-tour-top tour-active-top"></span>
            <span className="btn-tour-bottom tour-active-bottom"></span>
            <span onClick={() => {this.changeView('tour')}} className="btn-tour tour-active">Schedule A Tour</span>
            <span className={this.state.view === 'tour' ? "btn-info-bottom tour-info-bottom" : "btn-info-bottom"}></span>
            <span onClick={() => {this.changeView('info')}} className= "btn-info">Request Info</span>
          </div>
          <Tour address={this.state.address} />
        </div>
      );
    } else {
         return (
        <div>
          <div className="options">
            <span className="btn-tour-top"></span>
            <span className="btn-tour-bottom"></span>
            <span onClick={() => {this.changeView('tour')}} className="btn-tour">Schedule A Tour</span>
            <span className="btn-info-top info-active-top"></span>
            <span className="btn-info-bottom info-active-bottom"></span>
            <span onClick={() => {this.changeView('info')}} className="btn-info info-active">Request Info</span>
          </div>
          <Info address={this.state.address} />
        </div>
      );
    }

  }
}

export default App;