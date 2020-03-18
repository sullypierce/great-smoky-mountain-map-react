import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from "../auth/simpleAuth"
import ApiManager from '../utility/ApiManager'

class NavBar extends Component {
    state = {
        markeTypeId: 0,
        markerTypes: []
    }

    // componentDidMount() {
    //     ApiManager.get('markertypes')
    //         .then(markerTypeList => {
    //             this.setState({
    //                 markerTypes: markerTypeList
    //             })
    //         })
    // }

    markerTypeURL = () => {
        this.props.history.push(`/markertype/${this.state.markerTypeId}`)
    }

    handleMarkerTypeSelect = evt => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange, this.markerTypeURL)
    }

    handleLogout = () => {
        logout();
        this.props.history.push('/')
    }

    render() {
        return (
            <nav className="pa3 pa4-ns avenir f6 f5-ns">
                <div className="flex">

                    <div className="search-options">
                        <select id="productTypeId" onChange={this.handleMarkerTypeSelect}>
                            {/* <option value="all">all product types</option>
                            {this.props.markerTypes.map(markerType => {
                                return <option key={markerType.id} value={markerType.id}>{markerType.type_name}</option>
                            })} */}
                        </select>


                    </div>
                </div>
                <div className='pt1'>
                    {isAuthenticated()
                        ? <p className="pointer dim dib mr4" onClick={this.handleLogout}>Logout</p>
                        : <a className="pointer dim dib mr4" href="/login">Login</a>}
                </div>
            </nav>
        )
    }
}

export default withRouter(NavBar);