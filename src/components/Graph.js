import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import makeRequest from '../xhr/fetchApi';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge'

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: {},
            deaths: {},
            recovered: {},
            graphType: 'Line',
            options: {
                low: (this.props.type === 'cases') ? 145000000 : (this.props.type === 'deaths') ? 3200000 : 92000000,
                showArea: true,
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0.2
                }),
                axisX: {
                    labelOffset: {
                        x: -20,
                        y: 0
                    }
                },
                axisY: {
                    offset: 50,
                    labelInterpolationFnc: function (value) {
                        return (value / 1000) + 'k';
                    }
                }
            }
        }
    }
    componentDidMount() {
        const res = makeRequest({
            url : 'https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=7'
        });
       res.then(data => {
           this.setState({cases: data.cases});
           this.setState({deaths: data.deaths});
           this.setState({recovered: data.recovered});
       });
    }
     populateData() {
        var labels=[], series=[];
        switch (this.props.type) {
            case 'cases':
                for (const [key, value] of Object.entries(this.state.cases)) {
                    labels.push(key);
                    series.push(value);
                }
                break;
            case 'deaths':
                for (const [key, value] of Object.entries(this.state.deaths)) {
                    labels.push(key);
                    series.push(value);
                }
                break;
            case 'recovered':
                for (const [key, value] of Object.entries(this.state.recovered)) {
                    labels.push(key);
                    series.push(value);
                }
                break;
            default:
                 return {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8],
                    series: [
                      [5, 9, 7, 8, 5, 3, 5, 4]
                    ]
                };
        }
        return {
            labels: labels,
            series: [series]
        };
    };
    render() {
        var data = this.populateData();
        return (
            <Alert variant='secondary' className='h-cover'>
                <Alert.Heading>{(this.props.type === 'cases') ? 'Cases History' : (this.props.type === 'deaths') ? 'Deaths History' : 'Recovery History'}:</Alert.Heading>
                <h5><Badge variant="secondary">7 Day period</Badge></h5>
                <hr />
                <ChartistGraph className={(this.props.type === 'cases') ? 'ct-octave cases-chart' : (this.props.type === 'deaths') ? 'ct-octave deaths-chart' : 'ct-octave recovery-chart'} data={data} options={this.state.options} type={this.state.graphType} />
            </Alert>
        )
    }
}