import React from 'react';
import moment from 'moment'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'one',
      nextDown: false,
      prevDown: false
    }
  }

  changeView(view) {
    this.setState({
      view: view
    })
  }

  handleMouseDown(button) {
    button === 'next' ?
    this.setState({
      nextDown: true
    }) :
    this.setState({
      prevDown: true
    })
  }

  handleMouseUp(button) {
    button === 'next' ?
    this.setState({
      nextDown: false
    }) :
    this.setState({
      prevDown: false
    })
  }

  render() {

    if (this.props.data.currentWeek.length > 0) {
      var day1 = this.props.data.currentWeek[0];
      var day2 = this.props.data.currentWeek[1];
      var day3 = this.props.data.currentWeek[2];
      var day4 = this.props.data.currentWeek[3];
      var day5 = this.props.data.currentWeek[4];
      var day6 = this.props.data.currentWeek[5];
      var day7 = this.props.data.currentWeek[6];

      return (

          <div className="calendar-wrapper">
            <div className={this.state.view === 'one' ? 'calendar' : "calendar cal-view-two"}>
              <div id="day1" content={day1} onClick={() => {this.props.data.selectDate(`${day1}`)}} className={this.props.data.date === `${day1}` ? "day day-selected" : "day"}>
                <div className="weekday">{day1[0]}</div>
                <div className="date">{day1[2]}</div>
                <div className="month">{day1[1]}</div>

              </div>
              <div id="day2" content={day2} onClick={() => {this.props.data.selectDate(`${day2}`)}} className={this.props.data.date === `${day2}` ? "day day-selected" : "day"}>
                <div className="weekday">{day2[0]}</div>
                <div className="date">{day2[2]}</div>
                <div className="month">{day2[1]}</div>
              </div>
              <div id="day3" content={day3} onClick={() => {this.props.data.selectDate(`${day3}`)}} className={this.props.data.date === `${day3}` ? "day day-selected" : "day"}>
                <div className="weekday">{day3[0]}</div>
                <div className="date">{day3[2]}</div>
                <div className="month">{day3[1]}</div>
              </div>
              <div id="day4" content={day4} onClick={() => {this.props.data.selectDate(`${day4}`)}} className={this.props.data.date === `${day4}` ? "day day-selected" : "day"}>
                <div className="weekday">{day4[0]}</div>
                <div className="date">{day4[2]}</div>
                <div className="month">{day4[1]}</div>
              </div>
              <button  onClick={() => {this.changeView('two')}} onMouseUp={() => {this.handleMouseUp('next')}} onMouseDown={() => {this.handleMouseDown('next')}} id={this.state.nextDown === true ? 'next-pressed' : 'next'}><svg className={this.state.nextDown === true ? 'next-down' : 'next-up'} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" ></path></svg></button>
              <div className="day-blank">
                <div className="weekday">---</div>
                <div className="date">---</div>
                <div className="month">----</div>
              </div>
              <button onClick={() => {this.changeView('one')}} onMouseUp={() => {this.handleMouseUp('prev')}} onMouseDown={() => {this.handleMouseDown('prev')}} id={this.state.prevDown === true ? 'prev-pressed' : 'prev'}><svg className={this.state.prevDown === true ? 'prev-down' : 'prev-up'} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.292 16.494l7.147 7.056-1.869 1.893-9.067-8.951 9.069-8.927 1.866 1.896z" ></path></svg></button>
              <div id="day4" content={day4} onClick={() => {this.props.data.selectDate(`${day4}`)}} className={this.props.data.date === `${day4}` ? "day day-selected" : "day"}>
                <div className="weekday">{day4[0]}</div>
                <div className="date">{day4[2]}</div>
                <div className="month">{day4[1]}</div>
              </div>
              <div id="day5" content={day5} onClick={() => {this.props.data.selectDate(`${day5}`)}} className={this.props.data.date === `${day5}` ? "day day-selected" : "day"}>
                <div className="weekday">{day5[0]}</div>
                <div className="date">{day5[2]}</div>
                <div className="month">{day5[1]}</div>
              </div>
              <div id="day6" content={day6} onClick={() => {this.props.data.selectDate(`${day6}`)}} className={this.props.data.date === `${day6}` ? "day day-selected" : "day"}>
                <div className="weekday">{day6[0]}</div>
                <div className="date">{day6[2]}</div>
                <div className="month">{day6[1]}</div>
              </div>
              <div id="day7" content={day7} onClick={() => {this.props.data.selectDate(`${day7}`)}} className={this.props.data.date === `${day7}` ? "day day-selected" : "day"}>
                <div className="weekday">{day7[0]}</div>
                <div className="date">{day7[2]}</div>
                <div className="month">{day7[1]}</div>
              </div>
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