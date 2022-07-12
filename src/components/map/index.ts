import Leaflet from 'leaflet';

const POZNYAKI_GEO: Leaflet.LatLngExpression = [ 50.39837794464349, 30.634370836987415 ];

window.addEventListener('load', () => {
    const createdMap = Leaflet.map('map', {
        center: POZNYAKI_GEO,
        zoom:   16,
    });

    // https://leaflet-extras.github.io/leaflet-providers/preview/

    Leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        maxZoom:     20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(createdMap);

    Leaflet.marker(POZNYAKI_GEO).addTo(createdMap);
});


// import { Loader, LoaderOptions } from 'google-maps';

// window.addEventListener('load', async () => {
//     // or const {Loader} = require('google-maps'); without typescript

//     const mapQuery = document.getElementById('map');

//     if (!mapQuery) {
//         return;
//     }

//     console.log('some text');
//     const options: LoaderOptions = {/* todo */};
//     const loader = new Loader('AIzaSyCkkP5e9UfUAeQEhT7Z9rsZKsLwuapZMtE', options);

//     const google = await loader.load();
//     const map = new google.maps.Map(mapQuery, {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom:   8,
//     });
// });

// export {};
