import React, { Component } from 'react';
import './MapHolder.css';

class MapHolder extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="map" />
		);
	}
}

export default MapHolder;
