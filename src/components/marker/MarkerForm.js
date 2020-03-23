import React, { Component } from 'react'
import ApiManager from '../utility/ApiManager'


class MarkerForm extends Component {
    
    state = {
        description: this.props.markerToEdit.description,
        is_public: this.props.markerToEdit.is_public,
        picture_url: this.props.markerToEdit.picture_url,
        marker_type_id: this.props.markerToEdit.marker_type_id,
        lat: this.props.lat,
        long: this.props.long,
        markertypes: []
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleIsPublic = () => {
        if (this.state.is_public === false) {
            this.setState({is_public: true})
        } else {
            this.setState({is_public: false})
        }
    }

    componentDidMount() {
        ApiManager.get('markertypes')
        .then(markertypes => this.setState({markertypes}))
    }

    handleSubmit = event => {  
        const format = /[@#$%^&*()]/
        if (format.test(this.state.description)) {
            window.alert("Special characters (!@#$%^&*()) are not allowed in the name or description")
        // }else if(!event.target.checkValidity()){
        //     return alert('please fill out form properly')
        }else{
            const newMarker = {
                description: this.state.description,
                is_public: this.state.is_public,
                picture_url: this.state.picture_url,
                lat: this.props.lat,
                long: this.props.long,
                marker_type_id: this.state.marker_type_id
            }
            if (this.props.markerToEdit === {}) {
                ApiManager.post('markers', newMarker)
                .then(() => window.location.reload())
            } else {
                ApiManager.update('markers', newMarker, this.props.markerToEdit.id)
                .then(() => window.location.reload())
            }
            
                
        }
    }

    render() {
        return (
            <>
             <h2 className="f6 gray fw2 ttu tracked product-header">Add a Marker at <br/> {this.props.lat}, {this.props.long}</h2>
                
                    <div className="measure">
                        <label htmlFor="description" className="f6 b db mb2">Description</label>
                        <input id="description" className="input-reset ba b--black-20 pa2 mb2 db w-100" value={this.state.description} type="text" onChange={this.handleFieldChange} required />
                    </div>
                    <div className="measure">
                        <label htmlFor="is_public" className="f6 b db mb2">Post Public?</label>
                        <input id="is_public" checked={this.state.is_public}  className=" ba b--black-20 pa2 mb2 db w-100" type="checkbox" onChange={this.handleIsPublic} required />
                    </div>
                    <div className="measure">
                        <label htmlFor="picture_url" className="f6 b db mb2">Add a Picture</label>
                        <input id="picture_url" value={this.state.picture_url}  className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" onChange={this.handleFieldChange} required />
                    </div>
                    <div className="measure">
                        
                        <label className="f6 b db mb2" htmlFor="marker_type_id">Marker Type</label>
                        <select onChange={this.handleFieldChange} className="input-reset ba b--black-20 pa2 mb2 db w-100"  value={this.state.marker_type_id } id="marker_type_id">
                            {this.state.markertypes.map(type => 
                                <option key={type.id} value={type.id}>{type.type_name}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={this.handleSubmit}>Submit</button>
            </>
        )
    }
}
export default MarkerForm;