import { initMap } from "./map.js";
import { initSearch } from "./search.js";

//MARKERS (different styles)
var umaru = L.icon({
    iconUrl: 'markers/umaru.png',
    iconSize: [30, 33],
    popupAnchor: [0, -10]
});

var default_marker = L.icon({
    iconUrl: 'markers/default-marker.png',
    iconSize: [40, 44],
    popupAnchor: [0, -10]
});

//Marker functions
export function placeMarker (lat, lon) {
    const marker = L.marker([lat, lon], {icon: default_marker}); //create marker
    const popup = L.popup({ closeOnClick: false }) //4-line text popup
    .setLatLng([lat, lon])
    .setContent(`
        <div>
        <textarea rows='4'></textarea>
        <button>Save</button>
        </div>
    `)
    .openOn(map);

    setTimeout(() => {
        const textarea = popup.getElement().querySelector("textarea");
        const button = popup.getElement().querySelector("button");

        button.addEventListener("click", () => { //bind to popup & close on save
            marker.addTo(map);
              
            const lines = textarea.value.split("\n").join('<br>'); //preserve multi-line
            marker.bindPopup(lines).openPopup();
            map.closePopup(popup);
        });
    }, 0); //only make popup editable after it renders
}

export const map = initMap();
initSearch();