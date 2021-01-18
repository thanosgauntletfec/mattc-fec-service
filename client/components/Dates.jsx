import React from 'react';
import moment from 'moment'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'one'
    }

  }

  changeView(view) {
    this.setState({
      view: view
    })
  }



  render() {

    if (this.props.props.currentWeek.length > 0) {
      var day1 = this.props.props.currentWeek[0];
      var day2 = this.props.props.currentWeek[1];
      var day3 = this.props.props.currentWeek[2];
      var day4 = this.props.props.currentWeek[3];
      var day5 = this.props.props.currentWeek[4];
      var day6 = this.props.props.currentWeek[5];
      var day7 = this.props.props.currentWeek[6];

      return (


          <div className={this.state.view === 'one' ? 'calendar' : "calendar cal-view-two"}>
            <div onClick={() => {this.props.props.selectDate('day1')}} className={this.props.props.date === "day1" ? "day day-selected" : "day"}>
              <div id="day1" className="weekday">{day1[0]}</div>
              <div id="day1" className="date">{day1[2]}</div>
              <div id="day1" className="month">{day1[1]}</div>

            </div>
            <div onClick={() => {this.props.props.selectDate('day2')}} className={this.props.props.date === "day2" ? "day day-selected" : "day"}>
              <div className="weekday">{day2[0]}</div>
              <div className="date">{day2[2]}</div>
              <div className="month">{day2[1]}</div>
            </div>
            <div onClick={() => {this.props.props.selectDate('day3')}} className={this.props.props.date === "day3" ? "day day-selected" : "day"}>
              <div className="weekday">{day3[0]}</div>
              <div className="date">{day3[2]}</div>
              <div className="month">{day3[1]}</div>
            </div>
            <div onClick={() => {this.props.props.selectDate('day4')}} className={this.props.props.date === "day4" ? "day day-selected" : "day"}>
              <div className="weekday">{day4[0]}</div>
              <div className="date">{day4[2]}</div>
              <div className="month">{day4[1]}</div>
            </div>
            <button onClick={() => {this.changeView('two')}} id="next"><i className="fas fa-chevron-right"></i></button>
            <div className="day-blank">
              <div className="weekday">---</div>
              <div className="date">---</div>
              <div className="month">----</div>
            </div>
            <button onClick={() => {this.changeView('one')}} id="prev"><i className="fas fa-chevron-left"></i></button>
            <div onClick={() => {this.props.props.selectDate('day4')}} className={this.props.props.date === "day4" ? "day day-selected" : "day"}>
              <div className="weekday">{day4[0]}</div>
              <div className="date">{day4[2]}</div>
              <div className="month">{day4[1]}</div>
            </div>
            <div onClick={() => {this.props.props.selectDate('day5')}} className={this.props.props.date === "day5" ? "day day-selected" : "day"}>
              <div className="weekday">{day5[0]}</div>
              <div className="date">{day5[2]}</div>
              <div className="month">{day5[1]}</div>
            </div>
            <div onClick={() => {this.props.props.selectDate('day6')}} className={this.props.props.date === "day6" ? "day day-selected" : "day"}>
              <div className="weekday">{day6[0]}</div>
              <div className="date">{day6[2]}</div>
              <div className="month">{day6[1]}</div>
            </div>
            <div onClick={() => {this.props.props.selectDate('day7')}} className={this.props.props.date === "day7" ? "day day-selected" : "day"}>
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