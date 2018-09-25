import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';
import { CenteredDiv, GridColDiv } from '../Generic';
import { mapContainerElement, buttonStyle, containerDivStyle, mapButtonsDiv } from './styles';

const MapWithAMarkerWithLabel = compose(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 10.69694, lng: 122.56444 }}
  >

    <DrawingManager
      drawingMode={google.maps.drawing.OverlayType.POLYLINE}
      onPolylineComplete={(evt) => {
        props.LandStore.addLand(evt);
      }}
      options={{
        drawingControl: true,
        polylineOptions: {
          fillColor: '#ea9da3',
          geodesic: true,
          fillOpacity: 1,
          strokeWeight: 5,
          strokeColor: '#ea9da3',
          clickable: false,
          editable: false,
          zIndex: 1,
        },
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYLINE,
          ],
        },
      }}
    />
  </GoogleMap>
));

const Component = inject('LandStore')(observer(({ LandStore }) => (
  <div style={containerDivStyle}>
    <MapWithAMarkerWithLabel
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3gTG6T0-GEcBN0GEwUJYRiUv-1O1tq0&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={mapContainerElement} />}
      mapElement={<div style={{ height: '100%' }} />}
      LandStore={LandStore}
    />
    <CenteredDiv style={mapButtonsDiv}>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Button onClick={() => LandStore.nextStep(false)} style={buttonStyle}> Back </Button>
        <Button onClick={() => LandStore.nextStep(true)} style={buttonStyle} type="primary"> Next </Button>
      </GridColDiv>
    </CenteredDiv>
  </div>
)));

export default Component;

