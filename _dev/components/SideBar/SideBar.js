
// SideBar
// ============
// Holds further information about the map

// Imports
import React from 'react';
import Stats from '../Stats/Stats';
import VisitTable from '../VisitTable/VisitTable';

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            locations: [],
        }

        this.sortedLocations = [];
        this.allSortedLocations = [];
        this.winningArray = [];
    }

    sortLocationVisits() {
        this.sortedLocations = [];

        for (let eachLocation in this.props.locations) {

            if (this.props.locations.hasOwnProperty(eachLocation)) {
                this.sortedLocations.push([eachLocation, this.props.locations[eachLocation]]);
            }
        }

        this.sortedLocations.sort((a, b) => {
            return b[1] - a[1];
        });

        this.allSortedLocations = this.sortedLocations.slice();

        this.winningArray = this.sortedLocations.splice(0, 1);
    }

    componentWillUpdate(nextProps) {

        this.sortLocationVisits();

        if (nextProps.locations !== this.props.locations) {

            this.setState({
                locations: this.locationsList,
                active: true
            });
        }
    }

    render() {

        return (
            <div className={this.state.active ? 'SideBar animated bounceInRight' : 'SideBar'}>
                <Stats locations={this.allSortedLocations} />
                <VisitTable winner={this.winningArray} locations={this.sortedLocations} />
            </div>
        );
    }
}

// Exports
export default SideBar;
