# wifi-marker

Quick and easy map designed to mark locations that have free WiFi.

Using [Leaflet](https://leafletjs.com/) for map functions, [OpenStreetMap](https://www.openstreetmap.org/) tiles, and [Geoapify](https://www.geoapify.com/) for geocoding.

## Quick Start (minimal functions)

With this you can see the map and place markers.

1. Clone the repo
    ```
    git clone https://github.com/propadiene-1/wifi-marker.git
    ```
2. Run on a local web server
    ```
    python3 -m http.server 8000
    ```
3. Open localhost in browser
    ```
    http://localhost:8000

## Enable Search Functions (with Geoapify)

With this you can search for locations. 

1. Go to [**Geoapify**](https://www.geoapify.com/) and follow instructions to [**request an API key**](https://www.geoapify.com/get-started-with-maps-api/). Make sure to select "Geocoding API."

2. Create a config.js file with your API key:
    ```
    export const GEOAPIFY_KEY = [YOUR API KEY HERE]
    ```
3. Done! The searches will automatically use your API key.

## Contents
+ ```README.md``` project description
+ ```index.html``` main webpage
+ ```main.js``` main script
+ ```map.js``` map functions for rendering map and creating markers
+ ```search.js``` search functions and geocoding
+ ```styles.css``` styling template
