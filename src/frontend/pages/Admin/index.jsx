import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd';
import { CenteredDiv } from '../../components/Generic';
import AddLandRequests from './AddLandRequests';
import TransferLandRequests from './TransferLandRequests';
import RoleRequests from './RoleRequests';

const { TabPane } = Tabs;

const StyledDiv = styled.div`
  background-color: #F6F9FC;
  min-height: 100vh;
  min-width: 100vw;
`;

const CardOne = styled.div`
  border-top: 4px solid #A8DADB;
  background: white;
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
  width: 70%;
  height: 150px;
  margin: 25px;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const CardTwo = styled.div`
  padding: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
  width: 70%;
  height: 500px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  max-width: 7em;
  max-height : 7em;
}`;

const Profile = styled.div`
  height: 65%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

@inject('UserStore')
@observer
class Admin extends React.Component {
  async componentDidMount() {
    const { UserStore } = this.props;
    await UserStore.fetchUserRoles();
  }

  render() {
    const { UserStore: { authenticatedUser, isUserRoleFetching } } = this.props;
    if (isUserRoleFetching) return null;

    return (
      <StyledDiv>
        <CenteredDiv>
          <CardOne>
            <StyledImage src="https://res.cloudinary.com/depjh17m6/image/upload/v1537885123/facebook-profile-picture-silhouette-17_umosuf.jpg" />
            <Profile>
              <span> Name: {authenticatedUser.fullName}</span>
              <span> Address: {authenticatedUser.publicAddress}</span>
              <span> Roles: {authenticatedUser.roles}</span>
            </Profile>
          </CardOne>
        </CenteredDiv>
        <CenteredDiv>
          <CardTwo>
            <Tabs onChange={() => {}} type="card">
              <TabPane tab="Add Land Requests" key="1" >
                <AddLandRequests />
              </TabPane>
              <TabPane tab="Transfer Land Requests" key="2" >
                <TransferLandRequests />
              </TabPane>
              <TabPane tab="Role Requests" key="3">
                <RoleRequests />
              </TabPane>
            </Tabs>
          </CardTwo>
        </CenteredDiv>
      </StyledDiv>

    );
  }
}

export default Admin;
