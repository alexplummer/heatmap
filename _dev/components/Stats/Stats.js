
// Stats
// ============
// Chart for visitor numbers

// Imports
import React from 'react';

class Stats extends React.Component {

    render() {
        if (this.props.locations) {
            let chart = c3.generate({
                bindto: '.Stats',
                data: {
                    columns: this.props.locations,
                    type : 'pie',
                }
            });
        }

        return (
            <div className="Stats" />
        );
    }
}

// Exports
export default Stats;
