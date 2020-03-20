import React, { Component } from "react"
import { register } from "./simpleAuth"

export default class Register extends Component {

  state = {
    email: "",
    userName: "",
    lastName: "",
    password: "",
    firstName: "",
    verifyPassword: ""
  }

  handleInputChange = (evt) => {
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = event => {
    event.preventDefault()

    // Create object with values from state
    const newUser = {
      "username": this.state.userName,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "email": this.state.email,
      "password": this.state.password
    }

    // Make a fetch call with the object as the body of the POST request
    register(newUser)
      .then(() => {
        this.props.history.push("/")
      })
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleRegister}>
          <h1 className="h3 mb3 f5 black fw2 ttu tracked">Register an Account with Bangazon</h1>
          <div className="measure">
            <label htmlFor="userName" className="f6 b db mb2"> Username </label>
            <input onChange={evt => this.handleInputChange(evt)}
              id="userName"
              type="text"
              name="userName"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="Username"
              required autoFocus />
          </div>
          <div className="measure">
            <label htmlFor="firstName" className="f6 b db mb2"> First Name </label>
            <input onChange={this.handleInputChange}
              id="firstName"
              type="text"
              name="firstName"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="First name"
              required autoFocus />
          </div>
          <div className="measure">
            <label htmlFor="lastName" className="f6 b db mb2"> Last Name </label>
            <input onChange={this.handleInputChange}
              id="lastName"
              type="text"
              name="lastName"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="Last name"
              required />
          </div>
          <div className="measure">
            <label htmlFor="inputEmail" className="f6 b db mb2"> Email address </label>
            <input onChange={this.handleInputChange}
              id="email"
              type="email"
              name="email"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="Email address"
              required />
          </div>
          <div className="measure">
            <label htmlFor="inputPassword" className="f6 b db mb2"> Password </label>
            <input onChange={this.handleInputChange}
              id="password"
              type="password"
              name="password"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="Password"
              required />
          </div>
          <div className="measure">
            <label htmlFor="verifyPassword" className="f6 b db mb2"> Verify Password </label>
            <input onChange={this.handleInputChange}
              id="verifyPassword"
              type="password"
              name="verifyPassword"
              className="input-reset ba b--black-20 pa2 mb2 db w-50"
              placeholder="Verify password"
              required />
          </div>
          <div className="measure">
            <button
              type="submit"
              className='b dib f6 link br-pill ba ph2 pv1 mv3 black bg-animate hover-bg-light-pink'>
              Register
            </button>
          </div>
        </form>
      </main>
    )
  }
}