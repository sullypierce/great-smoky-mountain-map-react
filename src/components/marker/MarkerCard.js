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
            <article className=" ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l ma3">
                <img src={this.props.marker.picture_url} alt={'marker'}/>
                <div>{this.props.marker.description}</div>
            
            {this.props.isUsers ? 
            <>
                <form onSubmit={() => this.deleteMarker(this.props.marker.id)}>
                <button  type="submit">Delete</button></form>
                <button onClick={() => this.props.setEditMarker(this.props.marker)}>Edit</button></>
            : null}
            </article>
        )
    }

}
export default MarkerCard