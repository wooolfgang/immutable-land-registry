import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { mapMarker } from './styles';

const Styledspan = styled.span`
  font-weight: 400;
  font-size: 1.2em;
  font-family: Gill Sans, sans-serif;
`;

const MapMarker = ({ position, owner, address, location }) => (
  <MarkerWithLabel
    position={position}
    labelAnchor={new google.maps.Point(0, 0)}
    labelStyle={mapMarker}
  >
    <div>
      <Row> <Styledspan> Owned by: {owner} </Styledspan> </Row>
      <Row> <Styledspan> Address: {address} </Styledspan> </Row>
      <Row> <Styledspan> Location: x: {location.x} </Styledspan> </Row>
      <Row> <Styledspan> Location: y: {location.y} </Styledspan> </Row>
    </div>
  </MarkerWithLabel>
);

export default MapMarker;
