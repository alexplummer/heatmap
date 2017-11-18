
// SideBar
// ============
// Holds further information about the map

// Imports
import React from 'react';

class SideBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let locationsList = this.props.locations.map((thisLocation) => {   
            return <li key="thisLocation" >{thisLocation}</li>;
        });
        return (
            <div className="SideBar">
                <ul>
                    {locationsList}
                </ul>
            </div>
        );
    }
}

// Exports
export default SideBar;
