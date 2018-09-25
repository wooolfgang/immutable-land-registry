import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Form, Input } from 'antd';
import { CenteredDiv, GridColDiv, StyledSpan } from '../Generic';
import { containerDivStyle, disabledBigInputStyle, buttonStyle, disabledInputStyle } from './styles';

const { Item } = Form;

const Component = inject('LandStore')(observer(({ LandStore }) => (
  <Form style={containerDivStyle}>
    <CenteredDiv>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Item
          label={<StyledSpan> Owner's First Name </StyledSpan>}
        >
          <Input
            style={disabledInputStyle}
            placeholder="Brent Anthony"
            value={LandStore.newLandTitle.firstName}
          />
        </Item>
        <Item
          label={<StyledSpan> Owner's Surname </StyledSpan>}
        >
          <Input
            style={disabledInputStyle}
            placeholder="Tudas"
            value={LandStore.newLandTitle.surname}
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
    <CenteredDiv margin="19.5em">
      <GridColDiv col="1fr 1fr" gap="5em">
        <Button onClick={() => LandStore.nextStep(false)} style={buttonStyle}> Back </Button>
        <Button onClick={() => LandStore.addLandToContract()} style={buttonStyle} type="primary"> Confirm </Button>
      </GridColDiv>
    </CenteredDiv>
  </Form>
)));

export default Component;
