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
            </article>
        )
    }

}
export default MarkerCard