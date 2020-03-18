import React, { Component } from 'react';
import SideBar from './sidebar/SideBar';
import ApiManager from './utility/ApiManager'
import { isAuthenticated } from "./auth/simpleAuth"
import NavBar from './nav/NavBar'
import Map from './Map'

class MainView extends Component {
    state= {
        lat: '0',
        long: '0'
    }

    render() {
        return (
            <>
                <NavBar />
                <section className="flex avenir">
                    <article className="w-70 pv2 ph4">
                        <Map />
                    </article>
                    <article className="w-30 bg-light-gray">
                        <SideBar 
                            displayTitle={'Add Marker'}
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