import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div id="info">
        {this.props.address}
      </div>
    )
  }
}

export default Info;