import React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Divider, Icon } from 'antd';
import styled from 'styled-components';

const StyledHeader = styled.nav`
  display: grid;
  height: 100%;
  background: #1d3557;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  cursor: ${props => props.cursor};
`;

const ProfileDiv = styled.div`
  display: grid;
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
  grid-row: ${props => props.row};
`;

const StyledImage = styled.img`
  margin-top: 3em;
  border-radius: 50%;
  max-width: 15em;
  max-height : 15em;

  @media screen 
  and (min-device-width : 768px) 
  and (max-device-width : 1024px)  {
    width: 10em;
    height : 10em;
  }
`;

const StyledText = styled.span`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  margin-left: ${props => props.left};
  grid-row: ${props => props.row};
  cursor: ${props => props.cursor};
  display: inherit;
  justify-content: center;
  user-select: none;

  @media screen 
  and (min-device-width : 768px) 
  and (max-device-width : 1024px)  {
    font-size: ${props => props.smallsize};
  }
`;

const MarginDiv = styled.div`
  margin-top: ${props => props.top};
  margin-bottom: ${props => props.bottom};
`;

const SidebarComponent = ({ AuthStore: { logout }, LandStore: { resetSelectedTitle } }) => (
  <StyledHeader>
    <CenteredDiv>
      <ProfileDiv rows="3">
        <CenteredDiv>
          <StyledImage src="https://scontent.fceb1-1.fna.fbcdn.net/v/t1.0-9/35645282_1440729199406598_2005553614730297344_n.jpg?_nc_cat=0&oh=dee32fbf8c55e7efd572741ec11e3165&oe=5BD00BE4" />
        </CenteredDiv>
        <ProfileDiv row="2 / 3" rows="4">
          <StyledText row="1 / 2" color="white" size="2.5em" smallsize="2em" weight="500"> Brent Tudas </StyledText>
          <StyledText row="2 / 3" color="white" size="1em" smallsize="0.8em" weight="200">
            Employee at Land Registration Authority
            <Divider />
          </StyledText>
          <CenteredDiv cursor="pointer">
            <Row type="flex" align="start">
              <Icon type="area-chart" style={{ fontSize: '2.5em', color: '#a8dadc' }} />
              <StyledText left="0.3em" color="#a8dadc" size="2em">
                <Link style={{ color: 'white', textDecoration: 'none' }} onClick={() => resetSelectedTitle()} to="/map">
                  Map &nbsp; &nbsp; &nbsp;
                </Link>
              </StyledText>
            </Row>
          </CenteredDiv>
          <CenteredDiv cursor="pointer">
            <Row type="flex" align="start">
              <Icon type="file-add" style={{ fontSize: '2.5em', color: '#a8dadc' }} />
              <StyledText left="0.3em" color="#a8dadc" size="2em">
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/newland">
                  Register
                </Link>
              </StyledText>
            </Row>
          </CenteredDiv>
        </ProfileDiv>
        <MarginDiv top="10em">
          <Row type="flex" align="end">
            <StyledText onClick={logout} cursor="pointer" left="7em" color="white" size="1.5em" weight="200"> Sign Out </StyledText>
          </Row>
        </MarginDiv>
      </ProfileDiv>
    </CenteredDiv>
  </StyledHeader>
);

const Routes = ({ AuthStore, LandStore }) => (
  <div>
    { LandStore.selectedLandTitle ?
      <Redirect to={`/land/${LandStore.selectedLandTitle.landCode}`} /> :
      <SidebarComponent AuthStore={AuthStore} LandStore={LandStore} />
    }
  </div>
);

export default inject('AuthStore', 'LandStore')(observer(Routes));
