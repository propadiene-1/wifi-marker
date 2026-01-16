import { GEOAPIFY_KEY } from "./config.js";
export function initSearch(){
    const input = document.getElementById("search");
    const resultsBox = document.getElementById("results");

    //autocomplete search
    async function autocomplete(q) {
        const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}&limit=5&apiKey=${GEOAPIFY_KEY}`
        );
        const data = await res.json();
        return data.features;
    }

    function clearResults() {
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";
    }
    document.addEventListener("keydown", (e) => { //bind to cmd/ctrl-f
        const ctrlPressed = e.ctrlKey || e.metaKey;
        
        if (ctrlPressed && e.key === "f") {
            console.log("gothere");
            e.preventDefault();
            if (input){
                input.focus();
                input.select();
            }
        }
    });
}

/*input.addEventListener("input", async () => {
  const q = input.value.trim();
  if (q.length < 3) return;

  const results = await autocomplete(q);
  console.log(results.map(r => r.properties.formatted));
});*/


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
