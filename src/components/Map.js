import React, { Component } from 'react';
import L from 'leaflet';
import token from '../Token'
import ApiManager from './utility/ApiManager';
import orangeMarker from './LogoMakr_5bMiza.png'
import markerShadow from './pinshadow.png'

const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];

export default class Map extends Component {
  map = null;

 
  getMarkers = () => {
     //get all the markers
      ApiManager.get('markers')
      .then((markers) => {
          // set up arrays to group markers by type
        let all = []
        let hiking = []
        let fishing = []
        //loop through all markers
        markers.forEach(marker => {
          let newMarker = L.marker([marker.lat, marker.long])
            .bindPopup(
              `<p class="map-text"><strong>Description:</strong> ${marker.description}</p>`)
              //add a click handler to show detailed view in sidebar
            .on('click', () => {
              this.props.changeToMarkerView(marker.id)
            })
            all.push(newMarker)
            //add the marker to the correct array
            eval(`${marker.marker_type.type_name}` + '.push(newMarker)');
        });
        

        //loop through again and create a layer for each type of marker and add to overlay obj
        let completeLayer = L.layerGroup(all)
          let hikingLayer = L.layerGroup(hiking)
          let fishingLayer = L.layerGroup(fishing)
        //create object with all layers
        //add the layer with all markers to the map
        completeLayer.addTo(this.map)
          let overlayMaps = {
            'All' : completeLayer,
            'Fishing': fishingLayer,
            'Hiking': hikingLayer
          }
        //add a control with the layers to the map
        L.control.layers(overlayMaps).addTo(this.map);
        })
        
  }

  componentDidMount() {
    // create map
    this.map = L.map('map').setView([35.593194343320405, -83.51481347344817], 10);

    // add basemap
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
      {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'sullivanpierce/ck7ktjjr4065m1iqimjlvtexr',
        accessToken: token.mapboxToken
      }).addTo(this.map);

    this.getMarkers()

    let clickMarker = L.marker([35.593194343320405, -83.51481347344817])
    // log user clicks
    var orangeIcon = L.icon({
      iconUrl: './LogoMakr_5bMiza.png',
      shadowUrl: './pinshadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
    this.map.on('click', event => {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      console.log(lat, lng);
      clickMarker.setLatLng([lat, lng], {icon: orangeIcon})
        .bindPopup(`Would you like to add a marker here?`)
        .addTo(this.map);
      this.props.changeFormCoordinates(lat, lng)
    });
    L.polyline(dummyDataPath)
      .addTo(this.map);
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    )
  }
}