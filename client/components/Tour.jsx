import React from 'react';
import Dates from './Dates.jsx'
//import image from '../../public/images/questionMark.png'

class Tour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourType: 'inperson',
      date: '',
      currentWeek: []
    }
    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.selectDate = this.selectDate.bind(this)
  }

  componentDidMount() {
    var thisWeek = this.getCurrentWeek();
    this.setState({
      currentWeek: thisWeek
    })
  }

  getCurrentWeek() {
    let curr = new Date
    let week = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }

    for (var day in week ) {
      week[day] = new Date(week[day].split('-').join(' ')).toString();
      week[day] = week[day].split(' ')
      let newFormat = [];
      newFormat.push(week[day][0])
      newFormat.push(week[day][1])
      newFormat.push(week[day][2])
      week[day] = newFormat;
    }
    return week;
  }



  selectDate(date) {
    this.setState({
      date: date
    })
  }



  handleTourType(type) {
    this.setState({
      tourType: type
    })
  }

  render() {
    let props = {
      currentWeek: this.state.currentWeek,
      date: this.state.date,
      selectDate: this.selectDate.bind(this)
    }
    return(
      <div className="container-tour" id="tour">

        <div className="tour-type">
        <div className="type-text">Tour Type <span className="tour-info tooltip">?<span className="tooltiptext"> If you'd like to tour this home without leaving yours, select the video chat tour type and discuss available options with the agent you are connected with.</span></span></div>
          <button onClick={() => {this.handleTourType('inperson')}} className={this.state.tourType === 'inperson' ? "inperson type-active" : "inperson"}>In-Person</button>
          <button onClick={() => {this.handleTourType('video')}} className={this.state.tourType === "video" ? "videochat type-active" : "videochat"}>Video Chat</button>
        </div>
          <Dates props={props}/>
        <div>
          <form>
            <select>
              <option>time</option>
            </select>
          </form>
        </div>
      </div>
    )
  }
}

export default Tour;