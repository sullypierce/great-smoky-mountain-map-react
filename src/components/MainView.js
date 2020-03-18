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
        markerId: 0
    }

    changeToMarkerView = (id) => {
        this.setState({
            displayTitle: 'Marker View',
            markerId: id
        })
    }

    render() {
        return (
            <>
                <NavBar />
                <section className="flex avenir">
                    <article className="w-70 pv2 ph4">
                        <Map 
                        changeToMarkerView={this.changeToMarkerView}
                        />
                    </article>
                    <article className="w-30 bg-light-gray">
                        <SideBar 
                            displayTitle={this.state.displayTitle}
                            lat={this.state.lat}
                            long={this.state.long}
                        />
                    </article>
                </section>
            </>
        )
    }

}

export default MainView;