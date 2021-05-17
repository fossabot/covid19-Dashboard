import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import makeRequest from '../xhr/fetchApi';

export default class Map extends Component {
    state = {
        lat: 20,
        lng: 77,
        zoom: 5,
        countries: []
    }

    componentDidMount() {
        const res = makeRequest({
            url : 'https://corona.lmao.ninja/v3/covid-19/countries'
        });
       res.then(data => {
           this.setState({countries: Array.from(data)});
       });
    };

    render() {
        const markerList = this.state.countries.map((country) =>
            <Marker position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                    Country: {country.country}
                    <hr style={{marginTop: 0, border: 0, borderTop: '2px solid rgba(249, 4, 4, 0.74)'}}/>
                    Total Cases: {country.cases} <br />
                    Active Cases: {country.active} <br />
                    Deaths Observed: {country.deaths} <br />
                    Recovered Patients: {country.recovered}
                </Popup>
            </Marker>
        );
        return (
            <React.Fragment>
            <Row className="justify-content-md-center">
                <Col xs={12} lg={11}>
                    <MapContainer center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} scrollWheelZoom={true}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[this.state.lat, this.state.lng]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                        {markerList}
                    </MapContainer>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
            </React.Fragment>
         )
     }
 }
 