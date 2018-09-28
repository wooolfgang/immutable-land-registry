import React from 'react';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { Spin } from 'antd';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';
import LandLegends from './Legend';
import { mapContainerElement } from './styles';

const MapWithAMarkerWithLabel = compose(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 10.69694, lng: 122.56444 }}
    onClick={e => props.LandStore.selectMap(e)}
  >
    {props.LandStore.landCoordinates.map(land => (
      <Polyline
        path={land}
        geodesic
        options={{
          strokeColor: '#ea9da3',
          strokeOpacity: 0.8,
          strokeWeight: 5,
          fillColor: '#FF0000',
          fillOpacity: 1,
        }}
      />
    ))}

    <DrawingManager
      drawingMode={props.LandStore.drawing ? google.maps.drawing.OverlayType.POLYLINE : null}
      onPolylineComplete={(evt) => {
        props.LandStore.addLand(evt);
      }}
      options={{
        drawingControl: false,
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

@inject('LandStore') @observer
class MapComponent extends React.Component {
  componentDidMount() {
    const { LandStore } = this.props;
    LandStore.fetchLand();
  }

  render() {
    const { LandStore } = this.props;
    return (
      <div>
        {LandStore.registeredLands.length >= 0 ?
          <div>
            <MapWithAMarkerWithLabel
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3gTG6T0-GEcBN0GEwUJYRiUv-1O1tq0&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={mapContainerElement} />}
              mapElement={<div style={{ height: '100%' }} />}
              LandStore={this.props.LandStore}
            />
            <LandLegends />
          </div>
         : <Spin /> }
      </div>
    );
  }
}

export default MapComponent;
