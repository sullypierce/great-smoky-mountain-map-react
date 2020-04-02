import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from "../auth/simpleAuth"
import ApiManager from '../utility/ApiManager'
import logo from './LogoMakr_4MLnWw.png' 

class NavBar extends Component {
    state = {
        markeTypeId: 0,
        markerTypes: [],
        username: ''
    }


    markerTypeURL = () => {
        this.props.history.push(`/markertype/${this.state.markerTypeId}`)
    }

    handleLogout = () => {
        logout();
        this.props.history.push('/')
    }

    componentDidMount() {
        let username = sessionStorage.getItem('username')
        this.setState({username: username})
    }

    render() {
        return (
            <nav className="flex pa3 pa4-ns avenir f6 f5-ns fl h-25 w-100 bb">
                <div className="flex w-50">
                    <img className='bb bt' src={logo} alt='Great Smoky Mountain Map'/>
                </div>
                    {isAuthenticated() ?
                        <div className='w-50 flex items-center justify-right'>
                            <div className=" br3 pa1 ml7">Welcome {this.state.username}!</div>
                            <p className="pointer dim dib mr4 tr v-mid ba br3 pa1 ml2" onClick={this.handleLogout}>Logout</p>
                        </div>
                        : <a className="pointer dim dib mr4 tl" href="/login">Login</a>}
            </nav>
        )
    }
}

export default withRouter(NavBar);