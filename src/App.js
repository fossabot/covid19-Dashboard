import './App.css';
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import {Container, Row, Col} from 'react-bootstrap';
import GlobalStat from './components/GlobalStat';
import makeRequest from './xhr/fetchApi';
import Spinner from 'react-bootstrap/Spinner';
import Graph from './components/Graph';

function App() {
  const [active, setActive] = useState(<Spinner animation="grow" />);
  const [deaths, setDeaths] = useState(<Spinner animation="grow" />);
  const [recovered, setRecovered] = useState(<Spinner animation="grow" />);
  useEffect(() => {
    const res = makeRequest({
      url : 'https://corona.lmao.ninja/v3/covid-19/all'
      });
      res.then(data => {
          setActive(data.active);
          setDeaths(data.deaths);
          setRecovered(data.recovered);
      });
  });
  return (
    <div className="App-header">
      <header className="">
        <h1>Covid-19 Trends Dashboard</h1>
      </header>
      <Container>
        <Map/>
        <Row>
            <Col xs={12} md={4}>
              <GlobalStat className='active-card' variant='primary' stat={active} heading='Active Covid19 Cases'></GlobalStat>
            </Col>
            <Col xs={12} className='col_show_xs'>
                <hr/>
            </Col>
            <Col xs={12} md={4}>
              <GlobalStat variant='danger' stat={deaths} heading='Deaths Observed'></GlobalStat>
            </Col>
            <Col xs={12} className='col_show_xs'>
                <hr/>
            </Col>
            <Col xs={12} md={4}>
              <GlobalStat variant='success' stat={recovered} heading='Recovered Covid19 Cases'></GlobalStat>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <hr/>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={6}>
              <Graph type='cases'/>
            </Col>
            <Col xs={12} className='col_show_xs'>
                <hr/>
            </Col>
            <Col xs={12} md={6}>
              <Graph type='deaths'/>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs={12}>
                <hr/>
            </Col>
            <Col xs={12} md={8} lg={7}>
              <Graph type='recovered'/>
            </Col>
            <Col xs={12}>
                <hr/>
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
