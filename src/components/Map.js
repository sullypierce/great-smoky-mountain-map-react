import React, { Component } from 'react';
import L from 'leaflet';
import token from '../Token'
import ApiManager from './utility/ApiManager';

const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];

export default class Map extends Component {
  map = null;

  getMarkers = () => {
    fetch(`http://localhost:8000/markers`, {
      "headers": {
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then((markers) => {
        let all = []
        let hiking = []
        let fishing = []
        markers.forEach(marker => {
          let newMarker = L.marker([marker.lat, marker.long])
            .bindPopup(
              `<p class="map-text"><strong>Description:</strong> ${marker.description}</p>`)
            .on('click', () => {
              this.props.changeToMarkerView(marker.id)
            })
            console.log(marker)
            console.log(newMarker)
            hiking.push(newMarker)
            all.push(newMarker)

            // eval(`${marker.marker_type.type_name}` + '.append(newMarker)');
        });
        let completeLayer = L.layerGroup(all)
        let hikingLayer = L.layerGroup(hiking)
        let fishingLayer = L.layerGroup(fishing)
        let overlayMaps = {
          'All' : completeLayer,
          'Hiking' : hikingLayer,
          'Fishing' : fishingLayer
        }
        completeLayer.addTo(this.map)
        L.control.layers(overlayMaps).addTo(this.map);

      })
  }

  sendToForm = (lat, long) => {
    this.props.history.push({
      pathname: '/addmarker',
      state: {
        lat: lat,
        long: long
      }
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
    // navigator.geolocation.getCurrentPosition(position => {
    //   const coords = position.coords;
    //   this.map.setView([coords.latitude, coords.longitude], 16);

    //   L.marker([coords.latitude, coords.longitude])
    //     .bindPopup('This is your current <strong>location</strong>')
    //     .addTo(this.map);
    // });
    let clickMarker = L.marker([35.593194343320405, -83.51481347344817])
    // log user clicks
    this.map.on('click', event => {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      console.log(lat, lng);
      clickMarker.setLatLng([lat, lng])
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