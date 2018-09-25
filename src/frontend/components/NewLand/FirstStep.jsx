import React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Button, Form, Input, Select, notification, Icon } from 'antd';
import { containerDivStyle, inputStyle, bigInputStyle, buttonStyle } from './styles';
import { CenteredDiv, GridColDiv, StyledSpan } from '../Generic';
import UploadWall from './UploadWall';

const { Item } = Form;
const { Option } = Select;

const ErrorText = styled.p`
  color: #cc0000;
`;

const PrefixSelector = ({ value, onChange }) => (
  <Select
    defaultValue="+63"
    style={{ width: 70 }}
    initialValue={value}
    onChange={onChange}
  >
    <Option value="+63">+63</Option>
    <Option value="+69">+69</Option>
  </Select>
);

const openNotification = () => {
  notification.open({
    message: 'Error',
    description: 'Invalid Land Title Details',
    icon: <Icon type="frown-circle" style={{ color: '#108ee9' }} />,
  });
};

const Component = inject('LandStore')(observer(({ LandStore }) => (
  <Form style={containerDivStyle}>
    <CenteredDiv>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Item
          label={<StyledSpan> Owner's First Name </StyledSpan>}
          validateStatus={LandStore.getValidationStatus('firstName')}
          hasFeedback
          help={<ErrorText> {LandStore.newLandTitleErr.firstName} </ErrorText>}
        >
          <Input
            onChange={(e) => {
              LandStore.handleInputChange('firstName', e.target.value);
              LandStore.getError('firstName');
              LandStore.getValidationStatus('firstName');
            }}
            style={inputStyle}
            placeholder="Brent Anthony"
            value={LandStore.newLandTitle.firstName}
          />
        </Item>
        <Item
          label={<StyledSpan> Owner's Surname </StyledSpan>}
          validateStatus={LandStore.getValidationStatus('surname')}
          hasFeedback
          help={<ErrorText> {LandStore.newLandTitleErr.surname} </ErrorText>}
        >
          <Input
            onChange={(e) => {
              LandStore.handleInputChange('surname', e.target.value);
              LandStore.getError('surname');
              LandStore.getValidationStatus('surname');
            }}
            style={inputStyle}
            placeholder="Tudas"
            value={LandStore.newLandTitle.surname}
          />
        </Item>
      </GridColDiv>
    </CenteredDiv>
    <CenteredDiv>
      <GridColDiv col="1fr 1fr" gap="5em">
        <Item
          label={<span className="guest-item-label"> Contact Number </span>}
          help={<p className="error-text"> {LandStore.newLandTitleErr.contactNumber} </p>}
          hasFeedback
          validateStatus={LandStore.getValidationStatus('contactNumber')}
        >
          <Input
            value={LandStore.newLandTitle.contactNumber}
            addonBefore={<PrefixSelector value={LandStore.newLandTitle.numberPrefix}onChange={e => LandStore.handleInputChange('numberPrefix', e.target.value)} />}
            style={inputStyle}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                LandStore.handleInputChange('contactNumber', e.target.value);
                LandStore.getError('contactNumber');
                LandStore.getValidationStatus('contactNumber');
              }
            }}
            placeholder="39893067321"
          />
        </Item>
        <Item label={<span className="guest-item-label"> Owner's Image </span>}>
          <UploadWall onChange={LandStore.handleInputChange} />
        </Item>
      </GridColDiv >
    </CenteredDiv>
    <CenteredDiv>
      <Item
        label={<StyledSpan> Residence of Owner </StyledSpan>}
        validateStatus={LandStore.getValidationStatus('residenceOfOwner')}
        hasFeedback
        help={<ErrorText> {LandStore.newLandTitleErr.residenceOfOwner} </ErrorText>}
      >
        <Input
          onChange={(e) => {
            LandStore.handleInputChange('residenceOfOwner', e.target.value);
            LandStore.getError('residenceOfOwner');
            LandStore.getValidationStatus('residenceOfOwner');
          }}
          style={bigInputStyle}
          placeholder="Visayan Village, Tagum City"
          value={LandStore.newLandTitle.residenceOfOwner}
        />
      </Item>
    </CenteredDiv>
    <CenteredDiv>
      <Item
        label={<StyledSpan> Location of Land </StyledSpan>}
        validateStatus={LandStore.getValidationStatus('landLocation')}
        hasFeedback
        help={<ErrorText> {LandStore.newLandTitleErr.landLocation} </ErrorText>}
      >
        <Input
          onChange={(e) => {
            LandStore.handleInputChange('landLocation', e.target.value);
            LandStore.getError('landLocation');
            LandStore.getValidationStatus('landLocation');
          }}
          style={bigInputStyle}
          placeholder="Location of Land"
          value={LandStore.newLandTitle.landLocation}
        />
      </Item>
    </CenteredDiv>
    <CenteredDiv margin="2.5em">
      <Button
        onClick={() => {
        if (LandStore.dataIsValid()) {
          LandStore.nextStep(true);
        } else {
          openNotification();
        }
        }}
        style={buttonStyle}
        type="primary"
      >
        Next
      </Button>
    </CenteredDiv>
  </Form>
)));

export default Component;
