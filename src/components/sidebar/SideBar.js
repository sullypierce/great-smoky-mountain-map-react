import React from 'react';
// import MyAccount from '../myAccount/MyAccount'
import { isAuthenticated } from '../auth/simpleAuth';
import MarkerForm from '../marker/MarkerForm';
import MarkerCard from '../marker/MarkerCard';

export default props => {
    const markerToEdit = {
        is_public: false,
        marker_type_id : '1'
    }

    const currDisplay = () => {
        if (isAuthenticated()) {
        // if (props.displayTitle === "My Account") return <MyAccount />
        if (props.displayTitle === "Add Marker") return <MarkerForm 
        lat={props.lat} 
        long={props.long} 
        markerToEdit={markerToEdit}/>
        if (props.displayTitle === "Edit Marker") return <MarkerForm 
        lat={props.markerToEdit.lat} 
        long={props.markerToEdit.long} 
        markerToEdit={props.markerToEdit}/>
        if (props.displayTitle === 'Marker View') return <MarkerCard 
        marker={props.marker} 
        user={props.user} 
        isUsers={props.marker.user_id === props.user.id} 
        setEditMarker={props.setEditMarker}
        savedMarkerIds={props.savedMarkerIds} />
        else return <><h2>Welcome!</h2><p>Click a marker to see more info or click anywhere to add a new marker.</p></>
        
    }}

    return (
        <>
        <section className="pt4 pb6 ph3 ph4-ns">
            <h2 className="f4 fw6 ttu">{props.displayTitle}</h2>
            {currDisplay()}
        </section>
        </>
    )

}