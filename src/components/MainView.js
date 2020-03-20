import React, { Component } from 'react';
import SideBar from './sidebar/SideBar';
import ApiManager from './utility/ApiManager'
import { isAuthenticated } from "./auth/simpleAuth"
import NavBar from './nav/NavBar'
import Map from './Map'

class MainView extends Component {
    state= {
        displayTitle: '',
        lat: '0',
        long: '0',
        marker: {}
    }

    changeToMarkerView = (id) => {
        ApiManager.getOne('markers', id)
        .then((marker) => {
            this.setState({
                displayTitle: 'Marker View',
                marker: marker
            })
        })
        
    }

    changeFormCoordinates = (lat, long) => {
        this.setState({
            displayTitle: 'Add Marker',
            lat: lat,
            long: long
        })
    }

    render() {
        return (
            <>
                
                <section className="mainView flex avenir">
                    <article className="w-70 pv2 ph4">
                        <NavBar />
                        <Map 
                        changeToMarkerView={this.changeToMarkerView}
                        changeFormCoordinates={this.changeFormCoordinates}
                        />
                        <SideBar 
                            displayTitle={this.state.displayTitle}
                            lat={this.state.lat}
                            long={this.state.long}
                            marker={this.state.marker}
                        />
                    </article>
                </section>
            </>
        )
    }

}

export default MainView;