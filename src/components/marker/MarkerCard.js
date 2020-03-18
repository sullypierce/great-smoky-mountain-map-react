import React, { Component } from "react";
import ApiManager from "../utility/ApiManager";

class MarkerCard extends Component {
    state = {
        marker: {}
    }

   componentDidMount () {
       ApiManager.getOne('markers', this.props.markerId)
       .then(marker => this.setState({marker: marker}))
   }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l ma3">
                
                <div>{this.state.marker.description}</div>
            </article>
        )
    }

}
export default MarkerCard