import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Map from './components/Map'
import { isAuthenticated } from "./components/auth/simpleAuth"
import MarkerForm from "./components/marker/MarkerForm"
import MainView from "./components/MainView"

// import MyProducts from "./myProduct/MyProducts"

class ApplicationViews extends Component {


  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            if (isAuthenticated()) {
            return <MainView {...props} />
          } else {
            return <Redirect to="/login" />
          }
          }}
        />
        <Route
          path="/register" render={props => {
            return <Register  {...props} />
          }}
        />
        <Route
          path="/login" render={props => {
            return <Login  {...props} />
          }}
        />
        <Route
          path="/addmarker" render={props => {
            return <MarkerForm  {...props} />
          }}
        />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
