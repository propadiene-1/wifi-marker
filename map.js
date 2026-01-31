import {placeMarker} from './main.js';

//render map
export function initMap(){
  var map = L.map('map').setView([47.61061509828912, -122.20266934857376], 16);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  //place marker anywhere you click
  function onMapClick(e) {
    placeMarker(e.latlng.lat, e.latlng.lng);
  }

  map.on('click', onMapClick);
  return map;
}