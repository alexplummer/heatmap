
// Stats
// ============
// Chart for visitor numbers

// Imports
import React from 'react';

class Stats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    componentWillUpdate(nextProps) {

        if (nextProps.locations !== this.props.locations) {

            if (this.props.locations.length > 0) {

                this.setState({
                    active: true
                });
            }
        }
    }

    render() {
        if (this.props.locations.length > 1) {

            let chart = c3.generate({
                bindto: '.Stats',
                data: {
                    columns: [],
                    type: 'pie',
                },
                size: {
                    height: 240
                },
                transition: {
                    duration: 200
                }
            });

            let timeout = 100;

            function addColumn(data, delay) {
                let dataTmp = [data[0], 0];

                setTimeout(function () {
                    chart.internal.d3.transition().duration(100);
                    chart.load({
                        columns: [
                            dataTmp
                        ]
                    });
                }, timeout);

                timeout += 100;

                data.forEach(function (value, index) {
                    setTimeout(function () {
                        dataTmp[index] = value;
                        if (index < 10) dataTmp.push(0);
                        chart.load({
                            columns: [
                                dataTmp
                            ],
                            length: 0
                        });
                    }, (timeout + (delay / data.length * index)));
                });
                timeout += delay;
            }

            this.props.locations.forEach((thisLocation) => {
                addColumn([thisLocation[0], thisLocation[1]], 1000)
            })
        }

        return (
            <div className={this.state.active ? "Stats animated bounceInDown" : "Stats"} />
        );
    }
}

// Exports
export default Stats;
