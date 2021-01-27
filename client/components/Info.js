import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      financing: false,
    }

    this.toggleFinancing = this.toggleFinancing.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();

    let list = e.target.children;
    let formData = {
      house_id: this.props.info.id,
      name: list[0].value,
      phone: list[1].value,
      email: list[2].value,
      body: list[3].value,
      financing: list[5].checked
    }

    axios.post('http://localhost:2080/api/info', formData)
      .then(res => {
        console.log(res)
        this.props.info.submitInfoForm()
      })
      .catch(err => {
        console.log(err)
      })

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
      padding-left: 8px;
    `
    const InputLeft = styled(Input)`
      margin-right: 3.5px;
      width: 121px;
    `

    const InputRight = styled(Input)`
      margin-left: 3.5px;
      width: 121px;
    `
    const InputWhole = styled(Input)`
      width: 95.5%;
    `

    const InputBody = styled.textarea`
      margin-top: 10px;
      width: 94.75%;
      height: 80px;
      border: 1.5px rgba(0, 0, 0, 0.18) solid;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
      resize: none;
      font-family: 'Mulish', sans-serif;
      padding-left: 10px;
    `


    return(
      <form id="info-form" className='info' onSubmit={this.formSubmit} >
        <InputLeft name="name" placeholder="Name" defaultValue={this.props.info.name} required/>
        <InputRight name="phone" placeholder="Phone" defaultValue={this.props.info.phone}  required/>
        <InputWhole name="email" placeholder="Email" defaultValue={this.props.info.email}  required/>
        <InputBody defaultValue={`I am interested in ${this.props.info.address}`} />
        <button className={this.props.info.infoSubmitted === false ? "btn-submit" : "btn-submitted"} type="submit">{this.props.info.infoSubmitted === false ? "Request Info" : "Message Sent"} </button>
           <input onChange={this.toggleFinancing} name="financingtwo" type="checkbox"></input>
          <label className="financing" htmlFor="financingtwo">{this.state.financing === false ? 'I want to talk about financing' : 'A licensed lender will call you soon'}</label>
        <p className="advisory-info">By pressing Request Info, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our <a className="interactive-info" href="https://www.trulia.com/info/terms/">Terms of Use </a> Trulia does not endorse any <span className="tooltip interactive-info">real estate professional<span className="tooltiptext secondary">Real estate professionals include the real estate agents and brokers, mortgage lenders and loan officers, property managers, and other professionals you interact with through Trulia.</span></span> . </p>
      </form>
    )
  }
}

export default Info;