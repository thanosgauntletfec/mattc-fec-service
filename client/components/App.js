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
      email: '',
      tourSubmitted: false,
      infoSubmitted: false
    };

    this.updateFormsTracker = this.updateFormsTracker.bind(this);
    this.submitTourForm = this.submitTourForm.bind(this);
    this.submitInfoForm = this.submitInfoForm.bind(this);
  }

  submitTourForm() {
    this.setState({
      tourSubmitted: true
    })
  }

  submitInfoForm() {
    this.setState({
      infoSubmitted: true
    })
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
    axios.get(`http://ec2-54-183-180-104.us-west-1.compute.amazonaws.com:2080/api/homes/${id}`)
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
      updateFormsTracker: this.updateFormsTracker,
      tourSubmitted: this.state.tourSubmitted,
      infoSubmitted: this.state.infoSubmitted,
      submitTourForm: this.submitTourForm,
      submitInfoForm: this.submitInfoForm
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