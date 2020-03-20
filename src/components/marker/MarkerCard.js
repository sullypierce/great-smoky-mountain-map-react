import React, { Component } from "react";
import ApiManager from "../utility/ApiManager";

class MarkerCard extends Component {
    
    deleteMarker = (id) => {
        ApiManager.delete('markers', id)
    }

    render() {
        return (
            <>
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l ma3">
                
                <div>{this.props.marker.description}</div>
            </article>
            <form onSubmit={() => this.deleteMarker(this.props.marker.id)}>
                <button type="submit">Delete</button>
            </form>
            </>
        )
    }

}
export default MarkerCard