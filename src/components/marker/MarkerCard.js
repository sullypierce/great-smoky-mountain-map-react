import React, { Component } from "react";
import ApiManager from "../utility/ApiManager";

class MarkerCard extends Component {

    deleteMarker = (id) => {
        ApiManager.delete('markers', id)
    }

    componentDidMount() {
        console.log(this.props.user.id === this.props.marker.user_id)
    }

    deleteSavedMarker = (id) => {
        ApiManager.delete('savedmarkers', id)
    }

    saveMarker = (id) => {
        ApiManager.post('savedmarkers', {'marker_id': id})
    }

    render() {
        return (
            <article className=' pa2 w-100'>
                <img src={this.props.marker.picture_url} alt={'marker'}/>
                <div className="ba br1">Description: {this.props.marker.description}</div>
                {/* <div>Type: {this.props.marker.type_name}</div> */}

            <div className='flex'>
            {this.props.isUsers ? 
            <>
                <div className='flex center ma1'>
                <form onSubmit={() => this.deleteMarker(this.props.marker.id)}>
                
                <button className='ma2 mt1 mb1 pa2' type="submit"><i className="fas fa-trash-alt"></i></button></form>
                <button className='ma1' onClick={() => this.props.setEditMarker(this.props.marker)}><i className="fas fa-edit"></i></button>
                </div>
            </>
            : null}
            </div>

            {this.props.savedMarkerIds.includes(this.props.marker.id) ? 
                <form onSubmit={() => this.deleteSavedMarker(this.props.marker.id)}>
                
                <button className='ma2 mt1 mb1 pa2' type="submit"><i class="fas fa-backspace"></i></button></form>
                :
                <form onSubmit={() => this.saveMarker(this.props.marker.id)}>
                
                <button className='ma2 mt1 mb1 pa2' type="submit"><i class="fas fa-save"></i></button></form>
        }
            </article>
        )
    }

}
export default MarkerCard