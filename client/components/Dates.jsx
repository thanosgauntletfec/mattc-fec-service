import React from 'react';
import moment from 'moment'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: [],
      selectedDate: ''
    }

    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.selectDate = this.selectDate.bind(this)
  }


  selectDate(e) {
    console.log(e.target.id);
    this.setState({
      selectedDate: e.target.id
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
      //newFormat = newFormat.join(' ')
      week[day] = newFormat;
    }
    return week;
  }

  componentDidMount() {
    var thisWeek = this.getCurrentWeek();
    this.setState({
      currentWeek: thisWeek
    })
  }

  render() {

    if (this.state.currentWeek.length > 0) {
      var day1 = this.state.currentWeek[0];
      var day2 = this.state.currentWeek[1];
      var day3 = this.state.currentWeek[2];
      var day4 = this.state.currentWeek[3];
      var day5 = this.state.currentWeek[4];
      var day6 = this.state.currentWeek[5];
      var day7 = this.state.currentWeek[6];

      return (
        <div className="calendar">
          <div onClick={this.selectDate} id="day1" className="day">
            <div id="day1" className="weekday">{day1[0]}</div>
            <div id="day1" className="date">{day1[2]}</div>
            <div id="day1" className="month">{day1[1]}</div>

          </div>
          <div onClick={this.selectDate} id="day2" className="day">
            <div className="weekday">{day2[0]}</div>
            <div className="date">{day2[2]}</div>
            <div className="month">{day2[1]}</div>
          </div>
          <div onClick={this.selectDate} id="day3" className="day">
            <div className="weekday">{day3[0]}</div>
            <div className="date">{day3[2]}</div>
            <div className="month">{day3[1]}</div>
          </div>
          <div onClick={this.selectDate} id="day4" className="day">
            <div className="weekday">{day4[0]}</div>
            <div className="date">{day4[2]}</div>
            <div className="month">{day4[1]}</div>
          </div>
          <div className="day-blank">
            <div className="weekday">---</div>
            <div className="date">---</div>
            <div className="month">----</div>
          </div>
          <div onClick={this.selectDate} id="day4" className="day">
            <div className="weekday">{day4[0]}</div>
            <div className="date">{day4[2]}</div>
            <div className="month">{day4[1]}</div>
          </div>
          <div onClick={this.selectDate} id="day5" className="day">
            <div className="weekday">{day5[0]}</div>
            <div className="date">{day5[2]}</div>
            <div className="month">{day5[1]}</div>
          </div>
          <div onClick={this.selectDate} id="day6" className="day">
            <div className="weekday">{day6[0]}</div>
            <div className="date">{day6[2]}</div>
            <div className="month">{day6[1]}</div>
          </div>
          <div onClick={this.selectDate} id="day7" className="day">
            <div className="weekday">{day7[0]}</div>
            <div className="date">{day7[2]}</div>
            <div className="month">{day7[1]}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div> ..........</div>

      )
    }

  }
}

export default Dates;