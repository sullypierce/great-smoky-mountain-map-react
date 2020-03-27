import React, { Component } from "react";
import ApiManager from "../utility/ApiManager";

class MarkerCard extends Component {

    deleteMarker = (id) => {
        ApiManager.delete('markers', id)
    }

    componentDidMount() {
        console.log(this.props.user.id === this.props.marker.user_id)
    }

    render() {
        return (
            <article className=' pa2 w-100'>
                <img src={this.props.marker.picture_url} alt={'marker'}/>
                <div className="ba">Description: {this.props.marker.description}</div>
                {/* <div>Type: {this.props.marker.type_name}</div> */}

            
            {this.props.isUsers ? 
            <>
                <form onSubmit={() => this.deleteMarker(this.props.marker.id)}>
                <button className='ma2' type="submit">Delete</button></form>
                <button onClick={() => this.props.setEditMarker(this.props.marker)}>Edit</button></>
            : null}
            </article>
        )
    }

}
export default MarkerCard