
// VisitTable
// ============
// A table to track number of visitors

// Imports
import React from 'react';

class VisitTable extends React.Component {

    constructor(props) {
        super(props);

        this.locationsList = [];
        this.winningLocation = [];
    }

    render() {

        // Render locations to table
        this.winningLocation = this.props.winner.map((thislocation) => {
            return <tr key={thislocation}><td>{thislocation[0]}</td><td>{thislocation[1]}</td></tr>
        });

        this.locationsList = this.props.locations.map((thislocation) => {
            return <tr key={thislocation}><td>{thislocation[0]}</td><td>{thislocation[1]}</td></tr>
        });

        return (
            <div className="VisitTable">
                <h3>Current winner</h3>
                <table>
                    <tr><th>Name</th><th>Visits</th></tr>
                    {this.winningLocation}
                </table>
                <h4>Leaderboard</h4>
                <table>
                    {this.locationsList}
                </table>
            </div>
        );
    }
}

// Exports
export default VisitTable;
