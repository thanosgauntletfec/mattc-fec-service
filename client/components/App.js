import React from 'react';
import axios from 'axios';
import Tour from './Tour.js';
import Info from './Info.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'tour',
      address: null,
      id: null,
      name: '',
      phone: '',
      email: ''
    };

    this.updateFormsTracker = this.updateFormsTracker.bind(this);
  }

  updateFormsTracker(name, value) {
    let obj = {}
    obj[name] = value
    this.setState(obj)
  }


  getRandomId() {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let id = getRandomArbitrary(1, 100);
    return id;
  }

  componentDidMount() {
    let id = this.getRandomId();
    var address;
    axios.get(`/api/homes/${id}`)
      .then(res => {
        this.setState({
          id: id,
          address: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeView(view) {
    this.setState({
      view: view
    })
  }

  render() {
    let info = {
      id: this.state.id,
      address: this.state.address,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      updateFormsTracker: this.updateFormsTracker
    }

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
          <Tour info={info} />
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
          <Info info={info} />
        </div>
      );
    }

  }
}

export default App;