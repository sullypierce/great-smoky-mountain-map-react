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
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l ma3">
                
                <div>{this.props.marker.description}</div>
            
            {this.props.user.id === this.props.marker.user_id ? <form  onSubmit={() => this.deleteMarker(this.props.marker.id)}>
                <button type="submit">Delete</button>
            </form>
            : null}
            </article>
        )
    }

}
export default MarkerCard