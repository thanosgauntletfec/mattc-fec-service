import React from 'react';
import Dates from './Dates.js';
import axios from 'axios';



class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitted: 'false',
      tourType: 'inperson',
      date: '',
      currentWeek: [],
      financing: false,
      availableTimes: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
                       "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
                       "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
                       "6:00 PM", "6:30 PM", "7:00 PM"]
    }
    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.updateTimeSelection = this.updateTimeSelection.bind(this);
  }

  componentDidMount() {
    var thisWeek = this.getCurrentWeek();
    this.setState({
      currentWeek: thisWeek,
      date: thisWeek[0].join(',')
    })
  }

  formUpdate(e) {
    this.props.info.updateFormsTracker(e.target.name, e.target.value);
  }

  updateTimeSelection(day) {
    axios.get(`http://ec2-54-183-180-104.us-west-1.compute.amazonaws.com:2080/api/tours/${this.props.info.id}/${day}`)
    .then((res) => {
      var bookedTimes = [];
      for (var item in res.data) {
        bookedTimes.push(res.data[item].timeslot)
      }
      var times = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
      "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
      "6:00 PM", "6:30 PM", "7:00 PM"];
      var availableTimes = times.filter(item => !bookedTimes.includes(item))
      if (availableTimes !== this.state.availableTimes) {
        this.setState({
          availableTimes: availableTimes
        })
      }

    })
    .catch((err) => {
      console.log(err)
    });
  }

  formSubmit(e) {
    e.preventDefault()
    let inputs = e.target.children;

    let formInfo = {
      tourType: this.state.tourType,
      house_id: this.props.info.id,
      day: this.state.date.split(',').join(' '),
      time: inputs[0].value,
      name: inputs[1].value,
      phone: inputs[2].value,
      email: inputs.[3].value,
      financing: inputs[4].checked
    };
    axios.post('http://ec2-54-183-180-104.us-west-1.compute.amazonaws.com:2080/api/tours', formInfo)
      .then(res => {
        console.log(res)
        this.updateTimeSelection(this.state.date.split(',').join(' '));
        this.props.info.submitTourForm();
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleCheckBox() {
    this.setState({
      financing: !this.state.financing
    })
  }



  getCurrentWeek() {
    let curr = new Date();
    let week = [curr.toString().slice(0, 10).split(' ')]

    for (var i = 1; i < 7; i++) {
      var tomorrow = new Date(curr.getTime() + (24 * 60 * 60 * 1000));
      week.push(tomorrow.toString().slice(0, 10).split(' '));
      curr = tomorrow;
    }
    return week;
  }



  selectDate(date) {
    this.setState({
      date: date
    })
    this.updateTimeSelection( date.split(',').join(' '));
  }



  handleTourType(type) {
    this.setState({
      tourType: type
    })
  }



  render() {
    const data = {
      currentWeek: this.state.currentWeek,
      date: this.state.date,
      selectDate: this.selectDate.bind(this)
    }

    const { availableTimes }  = this.state;

    let timesList = availableTimes.length > 0
      && availableTimes.map((item, i) => {
        return (
          <option key={i} value={item.id}>{item}</option>
        )
      })

    return(
      <div className="container-tour" id="tour">
        <div className="tour-type">
        <div className="type-text">
          Tour Type
          <span className="tour-info tooltip">
            <svg className="svg attention" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.96 27.93c-6.61 0-11.97-5.36-11.97-11.97S9.35 3.99 15.96 3.99s11.97 5.36 11.97 11.97-5.36 11.97-11.97 11.97zm0-2.66a9.31 9.31 0 1 0 0-18.62 9.31 9.31 0 0 0 0 18.62zm-1.33-4.51h2.66v2.66h-2.66v-2.66zm2.66-2.16h-2.66v-3.97h1.33a1.664 1.664 0 0 0 0-3.325c-.465 0-.897.19-1.21.523l-.912.968-1.936-1.824.912-.968a4.324 4.324 0 1 1 4.476 7.077V18.6z" fill="#869099"></path>
            </svg>
          <span className="tooltiptext"> If you'd like to tour this home without leaving yours, select the video chat tour type and discuss available options with the agent you are connected with.</span>
          <span className="tooltiptext pointer-one"></span>
         </span></div>
          <button onClick={() => {this.handleTourType('inperson')}} className={this.state.tourType === 'inperson' ? "inperson type-active" : "inperson"}>In-Person</button>
          <button onClick={() => {this.handleTourType('video')}} className={this.state.tourType === "video" ? "videochat type-active" : "videochat"}>Video Chat</button>
        </div>
        <Dates data={data}/>
        <div>
          <form onSubmit={this.formSubmit} onChange={this.formUpdate.bind(this)}>
            <select name="timeslot" className="choose-time" required>
              <option  value="">Choose a time</option>
              {timesList}
            </select>
            <input type="text" className="input-left" placeholder="Name" name="name" defaultValue={this.props.info.name}  required></input>
            <input type="text" className="input-right" placeholder="Phone" name="phone" defaultValue={this.props.info.phone}  required></input>
            <input type="email" className="input-whole" placeholder="Email" name="email" defaultValue={this.props.info.email}  required></input>
            <input onClick={this.toggleCheckBox} type="checkbox" id="financing" name="financing" ></input>
            <label className="financing" htmlFor="financing">{this.state.financing === false ? 'I want to talk about financing' : 'A licensed lender will call you soon'}</label>
            <button className={this.props.info.tourSubmitted === false ? "btn-submit" : "btn-submitted"} type="submit">{this.props.info.tourSubmitted === false ? "Schedule a Tour" : "Message Sent"} </button>
          </form>
          <div className="advisory">
            <svg className="svg colored" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.549 26.933H4.371L15.96 3.755l11.589 23.178zM14.63 21.28v2.66h2.66v-2.66h-2.66zm0-8.585v6.643h2.66v-6.643h-2.66z" fill="currentColor"></path>
            </svg>

            <span className="advisory-title tooltip" >Public Health Advisory<span className="tooltiptext">As local public health orders vary by region, please observe your local safety guidence.</span>
          <span className="tooltiptext pointer-two"></span></span>
            <p className="advisory-info">By pressing Schedule A Tour, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our <a className="interactive-info" href="https://www.trulia.com/info/terms/">Terms of Use </a> Trulia does not endorse any <span className="tooltip interactive-info">real estate professional<span className="tooltiptext secondary">Real estate professionals include the real estate agents and brokers, mortgage lenders and loan officers, property managers, and other professionals you interact with through Trulia.</span></span> . </p>
          </div>

        </div>
      </div>
    );
  }
}

export default Tour;