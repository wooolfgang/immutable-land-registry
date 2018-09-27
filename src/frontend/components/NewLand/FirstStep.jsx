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
          label={<StyledSpan> Owner Name </StyledSpan>}
          validateStatus={LandStore.getValidationStatus('fullName')}
          hasFeedback
          help={<ErrorText> {LandStore.newLandTitleErr.fullName} </ErrorText>}
        >
          <Input
            onChange={(e) => {
              LandStore.handleInputChange('fullName', e.target.value);
              LandStore.getError('fullName');
              LandStore.getValidationStatus('fullName');
            }}
            style={inputStyle}
            placeholder="Bob"
            value={LandStore.newLandTitle.fullName}
          />
        </Item>
        <Item
          label={<StyledSpan> Owner Address </StyledSpan>}
          validateStatus={LandStore.getValidationStatus('ownerAddress')}
          hasFeedback
          help={<ErrorText> {LandStore.newLandTitleErr.ownerAddress} </ErrorText>}
        >
          <Input
            onChange={(e) => {
              LandStore.handleInputChange('ownerAddress', e.target.value);
              LandStore.getError('ownerAddress');
              LandStore.getValidationStatus('ownerAddress');
            }}
            style={inputStyle}
            placeholder="Evans"
            value={LandStore.newLandTitle.ownerAddress}
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
          placeholder="Lapuz, Iloilo City"
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
