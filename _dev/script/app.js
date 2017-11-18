
// App
// ============
// All of JS is organised from here

// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import open from 'react-dom';
import MapHolder from '../components/MapHolder/MapHolder';
import openlayersmap from './base/openlayers';

ReactDOM.render(<MapHolder />, document.querySelector('#app'));

// Add new map
let map = new openlayersmap;
map.createHeatmap();
