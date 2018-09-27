import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { CenteredDiv, GridColDiv, StyledSpan } from '../Generic';
import { containerDivStyle, disabledBigInputStyle, buttonStyle, disabledInputStyle } from './styles';

const { Item } = Form;

const PaddedDiv = styled.div`
  margin: '15px';
`;

const Component = inject('LandStore')(observer(({ LandStore }) => (
  <Form style={containerDivStyle}>
    <CenteredDiv>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Item
          label={<StyledSpan> Owners Name </StyledSpan>}
        >
          <Input
            style={disabledInputStyle}
            placeholder="Brent Anthony"
            value={LandStore.newLandTitle.fullName}
          />
        </Item>
        <Item
          label={<StyledSpan> Address </StyledSpan>}
        >
          <Input
            style={disabledInputStyle}
            placeholder="Tudas"
            value={LandStore.newLandTitle.ownerAddress}
          />
        </Item>
      </GridColDiv>
    </CenteredDiv>
    <CenteredDiv>
      <Item
        label={<StyledSpan> Residence of Owner </StyledSpan>}
      >
        <Input
          style={disabledBigInputStyle}
          placeholder="Visayan Village, Tagum City"
          value={LandStore.newLandTitle.residenceOfOwner}
        />
      </Item>
    </CenteredDiv>
    <CenteredDiv>
      <Item
        label={<StyledSpan> Location of Land </StyledSpan>}
      >
        <Input
          style={disabledBigInputStyle}
          placeholder="Location of Land"
          value={LandStore.newLandTitle.landLocation}
        />
      </Item>
    </CenteredDiv>
    <CenteredDiv>
      <PaddedDiv>
        {
          LandStore.newLandTitle.coordinates.map(data =>
            (
              <div>
              Latitude: {data.lat}
              Longitude: {data.lng}
              </div>
            ))
        }
      </PaddedDiv>
    </CenteredDiv>
    <CenteredDiv>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Button onClick={() => LandStore.nextStep(false)} style={buttonStyle}> Back </Button>
        <Button onClick={LandStore.submitLand} style={buttonStyle} type="primary"> Confirm </Button>
      </GridColDiv>
    </CenteredDiv>
  </Form>
)));

export default Component;
