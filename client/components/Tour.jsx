import React from 'react';
import Dates from './Dates.jsx'
//import image from '../../public/images/questionMark.png'

class Tour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourType: 'inperson'
    }
  }



  handleTourType(type) {
    this.setState({
      tourType: type
    })
  }

  render() {
    return(
      <div className="container-tour" id="tour">

        <div className="tour-type">
        <div className="type-text">Tour Type <span className="tour-info tooltip">?<span className="tooltiptext"> If you'd like to tour this home without leaving yours, select the video chat tour type and discuss available options with the agent you are connected with.</span></span></div>
          <button onClick={() => {this.handleTourType('inperson')}} className={this.state.tourType === 'inperson' ? "inperson type-active" : "inperson"}>In-Person</button>
          <button onClick={() => {this.handleTourType('video')}} className={this.state.tourType === "video" ? "videochat type-active" : "videochat"}>Video Chat</button>
        </div>

          <Dates />

      </div>
    )
  }
}

export default Tour;