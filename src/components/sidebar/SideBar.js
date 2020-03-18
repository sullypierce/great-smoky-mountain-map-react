import React from 'react';
// import MyAccount from '../myAccount/MyAccount'
import { isAuthenticated } from '../auth/simpleAuth';
import MarkerForm from '../marker/MarkerForm';
import MarkerCard from '../marker/MarkerCard';

export default props => {

    const currDisplay = () => {
        if (isAuthenticated()) {
        // if (props.displayTitle === "My Account") return <MyAccount />
        if (props.displayTitle === "Add Marker") return <MarkerForm lat={props.lat} long={props.long}/>
        if (props.displayTitle === 'Marker View') return <MarkerCard id={props.markerId}/>
        else return <p>Hello</p>
        
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