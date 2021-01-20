import React from 'react';
import styled from 'styled-components'

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      financing: false
    }

    this.toggleFinancing = this.toggleFinancing.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();

    let list = e.target.children;
    let formData = {
      name: list[0].value,
      phone: list[1].value,
      email: list[2].value,
      body: list[3].value,
      finance: list[5].checked
    }
    console.log(formData)

  }

  toggleFinancing() {
    this.setState({
      financing: !this.state.financing
    })
  }



  render() {

    const Input = styled.input`
      margin-top: 8px;
      height: 30px;
      border:1.5px rgba(0, 0, 0, 0.18) solid;
      outline: none;
      border-radius: 8px;
      font-size: 16px;
    `
    const InputLeft = styled(Input)`
      margin-right: 3.5px;
      width: 127px;
    `

    const InputRight = styled(Input)`
      margin-left: 3.5px;
      width: 127px;
    `
    const InputWhole = styled(Input)`
      width: 98%;
    `

    const InputBody = styled.textarea`
      margin-top: 10px;
      width: 98%;
      height: 80px;
      border: 1.5px rgba(0, 0, 0, 0.18) solid;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
      resize: none;
      font-family: 'Mulish', sans-serif;
    `


    return(
      <form className='info' onSubmit={this.formSubmit}>
        <InputLeft  placeholder="Name"  required/>
        <InputRight placeholder="Phone"  required/>
        <InputWhole placeholder="Email"  required/>
        <InputBody defaultValue={`I am interested in ${this.props.address}`}  required/>
        <input className="btn-submit" value="Request Info" type="submit"></input>
           <input onChange={this.toggleFinancing} name="financingtwo" type="checkbox"></input>
          <label className="financing" htmlFor="financingtwo">{this.state.financing === false ? 'I want to talk about financing' : 'A licensed lender will call you soon'}</label>
        <p className="advisory-info">By pressing Request Info, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our Terms of Use Trulia does not endorse any real estate professionals  </p>
      </form>
    )
  }
}

export default Info;