console.log("started");
import { GEOAPIFY_KEY } from "./config.js";
console.log("key stuff:", typeof GEOAPIFY_KEY, GEOAPIFY_KEY.length);
import { map, placeMarker } from './main.js';

export function initSearch(){

  const input = document.getElementById("search-content"); //user input
  const resultsBox = document.getElementById("results-container"); //container for all results

  function displayResults(results){ //takes results from search API (json)
    results.forEach((result, index) => {
      const div = document.createElement("div"); //create container for each result
      div.className="result-item";                //consistent css for all results
      if (index == 0){                        //API ranks, so 0 index is best result
        div.id = "top-result";
      }
      div.textContent = result['formatted']; //formatted address from Geoapify API
      div.dataset.lat = result['lat']; //attach coords to the result just in case
      div.dataset.lon = result['lon'];
      resultsBox.appendChild(div); //add to big container
    });
  }
  
  async function search(query){ //search API for user input string. async bc lookup takes a while
    //convert input to % delimiters and insert it into API key link
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&apiKey=${GEOAPIFY_KEY}`;
    const searchResponse = await fetch (url); //returns a Response object (json, dictionary keyed with results : [], query : {})
    const data = await searchResponse.json(); //convert response object to json
    console.log("Error:", data.error);
    console.log("Message:", data.message);
    console.log("Status code:", data.statusCode);
    console.log("Key in config:", GEOAPIFY_KEY.substring(0, 10) + "...");
    return data['results'];
    //TODO: place a marker on the top result (data['results'][0]['lon'], data['results'][0]['lat'])
    //const lon = data['results']['lon'];
    //const lat = data['results']['lat'];
  }

  //SEARCH ON ENTER KEY
  input.addEventListener("keydown", async (e) => {
    if (e.key == "Enter"){
      const query = input.value.trim();
      const results = await search(query);  //wait to finish calling API
      displayResults(results);
    }
  });

  //ZOOM MAP TO LOCATION ON CLICK
  const searchResult = document.querySelector('.result-item');
  if (searchResult){
    searchResult.addEventListener("click", (e) => { 
      //PAN MAP TO LOCATION
      map.panTo(topResult.dataset.lat, topResult.dataset.lon);
      //place marker on attached coordinates
      placeMarker([topResult.dataset.lat, topResult.dataset.lon])
    });
  }

  //SEARCH WHILE TYPING
  input.addEventListener("keydown", (e) => {
    return;
  });

  //FOCUS SEARCH ON CTRL F
  document.addEventListener("keydown", (e) => { 
    const ctrlPressed = e.ctrlKey || e.metaKey; //bind to cmd/ctrl-f
    if (ctrlPressed && e.key === "f") {
      console.log("cmd f pressed");
      e.preventDefault();
      if (input){
        console.log("input found:", input);
        input.focus();
        input.select();
      } else{
        console.log('input not found');
      }
    }
  });

  /*
  //autocomplete search
  async function autocomplete(q) {
    console.log('autocomplete started');
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}&limit=5&apiKey=${GEOAPIFY_KEY}`
    );
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log('autocomplete data:', data.features);
    return data.features;
  }

    function clearResults() {
    resultsBox.innerHTML = "";
    resultsBox.style.display = "none";
  }
  
  //AUTOCOMPLETE WHILE TYPING
  input.addEventListener("input", async () => {
    const q = input.value.trim();
    if (q.length < 3){
      clearResults();
      return;
    }
    const results = await autocomplete(q);
    console.log('input results:', results);
    displayResults(results);
  });
  */

}


// GEOCODER FUNCTIONALITY //

/*var geocoder = L.Control.geocoder({ //geocoder!
  defaultMarkGeocode: false
}).addTo(map);

geocoder.on('markgeocode', function (e) {//bbox for search result
    var bbox = e.geocode.bbox;
    var poly = new L.Polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })

// SEARCH
function openSearchBar(e) {
  const container = geocoder.getContainer();
  const toggle = container.querySelector(".leaflet-control-geocoder-icon") || ("a");
  container.classList.add("leaflet-control-geocoder-expanded"); //"click" icon
    
  const input = container.querySelector("input"); //focus input
  if (input) {
    input.focus();
    input.select();
  }
}*/
