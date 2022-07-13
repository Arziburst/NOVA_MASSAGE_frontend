// Core
import Leaflet from 'leaflet';

const POZNYAKI_GEO: Leaflet.LatLngExpression = [ 50.39837794464349, 30.634370836987415 ];

const leafletMap: HTMLDivElement | null = document.querySelector('#map');
const costCards: HTMLDivElement | null = document.querySelector('#cost');


const changeHeightMap = () => {
    if (!(leafletMap && costCards)) {
        return;
    }
    leafletMap.style.height = `${(window.innerHeight - costCards.clientHeight) - 100}px`;
};

window.addEventListener('load', () => {
    const createdMap = Leaflet.map('map', {
        center: POZNYAKI_GEO,
        zoom:   16,
    });

    Leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        maxZoom:     20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(createdMap);

    changeHeightMap();
    createdMap.invalidateSize();

    const svgIcon = Leaflet.divIcon({
        html: `
            <svg class="leaflet__icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve">
                <path d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0
                    C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6
                    s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/>
            </svg>
        `,
        className:  '',
        iconSize:   [ 24, 40 ],
        iconAnchor: [ 12, 40 ],
    });

    Leaflet.marker(POZNYAKI_GEO, { icon: svgIcon }).addTo(createdMap);


    const mapButtonLinks: HTMLDivElement | null = document.querySelector('.leaflet-bottom.leaflet-right');
    const mapShadowPane: HTMLDivElement | null = document.querySelector('.leaflet-pane.leaflet-shadow-pane');


    if (mapButtonLinks && mapShadowPane) {
        mapButtonLinks.style.display = 'none';
    }
});

window.addEventListener('resize', changeHeightMap);
