
// App
// ============
// All of JS is organised from here

// Imports
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import Feature from 'ol/feature';
import Heatmap from 'ol/layer/heatmap';
import VectorLayer from 'ol/layer/vector';
import Vector from 'ol/source/vector';
import MultiPoint from 'ol/geom/multipoint';
import OSM from 'ol/source/osm';
import Proj from 'ol/proj';

class openlayersmap {

    constructor(cb) {

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [-36500, 6673712],
                zoom: 18
            })
        });
        this.cb = cb;
    }

    createHeatmap() {
        let coord = [];
        let data = new Vector();
        let map = this.map;

        map.on('click', (e) => {
            coord.push(e.coordinate);
            updateHeatMap();
            this.queryLocation(e.coordinate);
        });

        function updateHeatMap() {

            // Remove old heatmap features
            let vectorLayerArray = [];
            map.getLayers().getArray().some(function (layer, i, array) {
                if (layer instanceof Heatmap) {
                    layer.getSource().clear();
                }
            }, this);

            // Add new heatmap
            let lonLat = new MultiPoint(coord);
            let pointFeature = new Feature({
                geometry: lonLat,
                weight: 1
            });

            data.addFeature(pointFeature);

            let heatMapLayer = new Heatmap({
                source: data,
                radius: 10,
                blur: 20
            });

            map.addLayer(heatMapLayer);
        }
    }

    queryLocation(coordinates) {
        const AMENITY = 'bar|pub|restaurant';
        const RADIUS = 12;
        const CONVERTED = Proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
        const LON = CONVERTED[0];
        const LAT = CONVERTED[1];

        const URL = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node(around:' + RADIUS + ',' + LAT + ',' + LON + ')' +
            '["amenity"~"' + AMENITY + '"]);out%20meta;';

        fetch(URL)
            .then((response) => {
                response.json().then((data) => {
                    
                    if (data.elements[0]) {
                        this.cb(data.elements[0].tags.name);
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default openlayersmap;