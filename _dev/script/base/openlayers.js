
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

class openlayersmap {

    constructor() {

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [-36676.93019369146, 6673712.155139712],
                zoom: 17
            })
        });
    }

    createHeatmap() {
        let coord = [];
        let data = new Vector();
        let map = this.map;

        map.on('click', (e) => {
            coord.push(e.coordinate);
            updateHeatMap();
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
                radius: 5,
                blur: 15,
                shadow: 400
            });

            map.addLayer(heatMapLayer);
        }
    }
}

export default openlayersmap;