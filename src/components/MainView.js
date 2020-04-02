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
        marker: {},
        markerToEdit: {},
        user: {},
        savedMarkerIds: []
    }

    addToSavedMarkers = (markerId) => {
        let newList = this.state.savedMarkerIds
        newList.push(markerId)
        this.setState({savedMarkerIds: newList})
    }

    changeToMarkerView = (id) => {
        ApiManager.getOne('markers', id)
        .then((marker) => {
            ApiManager.get('users')
            .then(user => {
                this.setState({
                    displayTitle: 'Marker View',
                    marker: marker,
                    user: user
                })
            })
            
        })
        
    }

    setEditMarker = (marker) => {
        this.setState({markerToEdit: marker,
        displayTitle: 'Edit Marker'})
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
                
                <section className="mainBackground flex-column mainView avenir">
                <NavBar />
                    <article className="flex w-100 justify-center h-75 pv2 ph4">
                        <div className='w-75'>
                        <Map 
                        changeToMarkerView={this.changeToMarkerView}
                        changeFormCoordinates={this.changeFormCoordinates}
                        addToSavedMarkers={this.addToSavedMarkers}
                        savedMarkerIds={this.state.savedMarkerIds}
                        />
                        </div>
                        <div className='ba w-25 bg-washed-blue o-80'>
                        <SideBar 
                            displayTitle={this.state.displayTitle}
                            lat={this.state.lat}
                            long={this.state.long}
                            marker={this.state.marker}
                            user={this.state.user}
                            setEditMarker={this.setEditMarker}
                            markerToEdit={this.state.markerToEdit}
                            savedMarkerIds={this.state.savedMarkerIds}
                            />
                            </div>
                    </article>
                </section>
            </>
        )
    }

}

export default MainView;