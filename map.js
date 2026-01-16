export function initMap(){
  var map = L.map('map').setView([47.61061509828912, -122.20266934857376], 16);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

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

  // MARKER FUNCTIONALITY //

  function onMapClick(e) {
      const marker = L.marker(e.latlng, {icon: default_marker}); //create marker
      const popup = L.popup({ closeOnClick: false }) //4-line text popup
          .setLatLng(e.latlng)
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
              
              const lines = textarea.value.split("\n"); //preserve multi-line
              const text = lines.join('<br>');
              marker.bindPopup(text).openPopup();
              map.closePopup(popup);
          });
      }, 0);
  }

  map.on('click', onMapClick);
  return map;
}

//demo marker i guess
/*var marker = L.marker([47.61061509828912, -122.20266934857376]).addTo(map);
marker.bindPopup("<b>Nana's Green Tea</b><br><br><b>Wifi Network:</b> NanaGreenTea<br><b>Password:</b> greenteaneko<br><br><b>Closes at 9:00pm PST</b>").openPopup();*/

//circle for range i guess
/*var circle = L.circle([47.61061509828912, -122.20266934857376], { //showing render radius?
    color: '#6fd5de',
    fillColor: '#b3f6fc',
    fillOpacity: 0.2,
    radius: 2500 //2500m, about 1.55 miles
}).addTo(map);*/

/*function escapeHtml(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

class WifiSpot {
  constructor(latlng) {
    this.lat = latlng.lat;
    this.lng = latlng.lng;
    this.label = "";
  }

  setLabel(text) {
    this.label = text;
  }

  getPopupHtml() {
    return `<b>${escapeHtml(this.label)}</b>`;
  }
}*/