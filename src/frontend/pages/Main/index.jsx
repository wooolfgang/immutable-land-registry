import React from 'react';
import { Col } from 'antd';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import LandProfile from '../../components/LandProfile';
import GoogleMap from '../../components/Map';
import NewLand from '../../components/NewLand';

const MapContainer = styled.div`
  grid-template-rows: 2;
`;

const Main = ({ LandStore: { landContract } }) => (
  <div style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
    <Col span="6">
      <Switch>
        <Route path="/newland" component={Sidebar} />
        <Route path="/map" component={Sidebar} />
        <Route exact path="/" component={Sidebar} />
        <Route path="/land/:code" component={LandProfile} />
      </Switch>
    </Col>

    <MapContainer>
      <Col span="18" style={{ overflow: 'hidden' }}>
        <Switch>
          <Route path="/map" component={landContract && GoogleMap} />
          <Route path="/newland" component={landContract && NewLand} />
          <Route path="/land" component={landContract && GoogleMap} />
        </Switch>
      </Col>
    </MapContainer>
  </div>
);

export default inject('LandStore')(observer(Main));

