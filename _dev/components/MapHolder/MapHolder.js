
// MapHolder
// ============
// Holds the main map component

// Imports
import React from 'react';
import openlayersmap from '../../script/base/openlayers';
import SideBar from '../SideBar/SideBar';

class MapHolder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locations: []
        }
    }

    componentDidMount() {
        let allLocations = {};

        // Add new map
        let map = new openlayersmap((updatedLocation) => {

            allLocations[updatedLocation] = allLocations[updatedLocation] || 0;

            allLocations[updatedLocation] += 1;
            
            this.setState({ 
                locations: allLocations 
            });
        });
        map.createHeatmap();
    }

    render() {
        return (
            <div id="map" className="MapHolder">
                <SideBar locations={this.state.locations} />
            </div>
        );
    }
}

// Exports
export default MapHolder;
