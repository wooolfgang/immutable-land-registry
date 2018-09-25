import React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { GridRowDiv, CenteredDiv, StyledSpan } from '../Generic';
import { iconStyle } from './styles';

const ColoredDiv = styled.div`
  background-color: ${props => props.color};
  height: ${props => props.height};
`;

const ProfileImage = styled.div`
  position: absolute;
  top: 13em;
  left: 17em;

  @media screen 
  and (min-device-width : 768px) 
  and (max-device-width : 1366px)  {
    left: 13.5em;
  }
`;

const RoundedImage = styled.img`
  border-radius: 50%;
  max-width: 10em;
  max-height : 10em;

  @media screen 
  and (min-device-width : 768px) 
  and (max-device-width : 1024px)  {
    width: 4em;
    height : 4em;
    right: 0em;
  }
`;

const LandOwnerName = styled.h3`
  color: white;
  font-size: 1.5em;
  float: right;
  user-select: none;
`;

const StyledText = styled.span`
  color: white;
  font-size: ${props => props.size};
  white-space: pre-line;
  float: right;
  user-select: none;
  margin: ${props => props.margin};
`;

const LandOwnerDetails = styled.div`
  margin: 6em 2em;
  @media screen 
  and (min-device-width : 768px) 
  and (max-device-width : 1366px)  {
    margin: 6em 1em 0em 0em;
  }
`;

@inject('LandStore') @observer
export default class LandProfileComponent extends React.Component {
  render() {
    const { firstName, surname, landLocation, residenceOfOwner } = this.props.LandStore.selectedLandTitle;
    return (
      <GridRowDiv row="3fr 7fr">
        <ColoredDiv color="white" height="10em">
          <Link to="/map">
            <Icon onClick={() => this.props.LandStore.resetSelectedTitle()} style={iconStyle} type="left-circle" />
          </Link>
        </ColoredDiv>
        <ProfileImage>
          <RoundedImage src="https://scontent.fceb1-1.fna.fbcdn.net/v/t1.0-9/35645282_1440729199406598_2005553614730297344_n.jpg?_nc_cat=0&oh=dee32fbf8c55e7efd572741ec11e3165&oe=5BD00BE4" /> 
        </ProfileImage>
        <ColoredDiv color="#1d3557" height="45em">
          <LandOwnerDetails right="5em">
            <LandOwnerName> {firstName} {surname} </LandOwnerName>
            <br /> <br />
            <StyledText size="1em"> +639893067321 </StyledText>
            <StyledText size="1em"> 0xF03748DE10Efd6bA2e5F713E44aD30955a2D1aB7 </StyledText>
          </LandOwnerDetails>
          <CenteredDiv margin="3.5em">
            <GridRowDiv row="repeat(2, 1fr)">
              <StyledSpan weight="700" color="white"> Location: </StyledSpan>
              <StyledSpan weight="400" color="white"> {landLocation} </StyledSpan>
              <div style={{ marginTop: '0.8em' }}> </div>
              <StyledSpan weight="700" color="white"> Land Area: </StyledSpan>
              <StyledSpan weight="400" color="white"> 480 square meter </StyledSpan>
            </GridRowDiv>
          </CenteredDiv>
        </ColoredDiv>
      </GridRowDiv>
    );
  }

}