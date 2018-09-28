import React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Divider, Icon } from 'antd';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';


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

class SidebarComponent extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  render() {
    const {
      AuthStore: { logout },
      LandStore: { resetSelectedTitle },
      UserStore: { authenticatedUser } } = this.props;
    if (!authenticatedUser) return null;
    return (
      <StyledHeader>
        <CenteredDiv>
          <Icon onClick={this.showModal} type="crown" theme="outlined" style={{ color: '#a8dadc', cursor: 'pointer', fontSize: '30px', position: 'absolute', top: '5px', right: '12px' }} />
          <ProfileModal visible={this.state.visible} handleCancel={this.handleCancel} handleOk={this.handleOk} />
          <ProfileDiv rows="3">
            <CenteredDiv>
              <StyledImage src="https://res.cloudinary.com/depjh17m6/image/upload/v1537885123/facebook-profile-picture-silhouette-17_umosuf.jpg" />
            </CenteredDiv>
            <ProfileDiv row="2 / 3" rows="4">
              <StyledText row="1 / 2" color="white" size="2.5em" smallsize="2em" weight="500"> {authenticatedUser && authenticatedUser.fullName} </StyledText>
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
  }
}

const Routes = ({ AuthStore, LandStore, UserStore }) => (
  <div>
    { LandStore.selectedLandTitle ?
      <Redirect to={`/land/${LandStore.selectedLandTitle.landCode}`} /> :
      <SidebarComponent AuthStore={AuthStore} LandStore={LandStore} UserStore={UserStore} />
    }
  </div>
);

export default inject('AuthStore', 'LandStore', 'UserStore')(observer(Routes));
