
// VisitTable
// ============
// A table to track number of visitors

// Imports
import React from 'react';

class VisitTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }

        this.locationsList = [];
        this.winningLocation = [];
        this.leaderboardHeader = "";
    }

    componentWillUpdate(nextProps) {

        if (nextProps.locations !== this.props.locations) {

            this.setState({
                loaded: false
            });
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.locations !== this.props.locations) {

            setTimeout(() => {
                this.setState({
                    loaded: true
                });
            }, 500);
        }
    }

    render() {

        // Render locations to table
        this.winningLocation = this.props.winner.map((thislocation) => {
            return <tr key={thislocation}><td>{thislocation[0]}</td><td>{thislocation[1]}</td></tr>
        });

        if (this.props.locations.length > 0) {
            this.leaderboardHeader = <h4>Leaderboard</h4>;

            this.locationsList = this.props.locations.map((thislocation) => {
                return <tr key={thislocation}><td>{thislocation[0]}</td><td>{thislocation[1]}</td></tr>
            });
        }

        return (
            <div className="VisitTable">
                <h3>Current winner</h3>
                <table className={this.state.loaded ? 'loaded' : ''}>
                    <tr><th>Name</th><th>Visits</th></tr>
                    {this.winningLocation}
                </table>
                {this.leaderboardHeader}
                <table>
                    {this.locationsList}
                </table>
            </div>
        );
    }
}

// Exports
export default VisitTable;
