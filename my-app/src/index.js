// NPM
import React from 'react';
import ReactDOM from 'react-dom';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import Feature from 'ol/feature';
import Heatmap from 'ol/layer/heatmap';
import Vector from 'ol/source/vector';
import MultiPoint from 'ol/geom/multipoint';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';

// COMPONENTS
import './index.css';
import MapHolder from './components/MapHolder/MapHolder';

ReactDOM.render(<MapHolder />, document.getElementById('root'));

let data = new Vector();

let map = new Map({
	target: 'map',
	layers: [
		new TileLayer({
			source: new OSM()
		})
	],
	view: new View({
		center: [-36676.93019369146, 6673712.155139712],
		zoom: 15
	})
});



// created for owl range of data
let coord = [];

map.on('click', (e) => {
	coord.push(e.coordinate);
	updateHeatMap();
});

function updateHeatMap() {
	console.log(coord);
	let lonLat = new MultiPoint(coord);

	let pointFeature = new Feature({
		geometry: lonLat,
		weight: 20 // e.g. temperature
	});

	data.addFeature(pointFeature);

	// create the layer
	let heatMapLayer = new Heatmap({
		source: data,
		radius: 10
	});

	// add to the map
	map.addLayer(heatMapLayer);
}