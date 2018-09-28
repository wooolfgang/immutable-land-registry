import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';

const StyledDiv = styled.div`
    margin: 5px;
`;

const P = styled.p`
    color: 'green';
`;

@inject('UserStore', 'LandStore')
@observer
class ProfileModal extends React.Component {
  async componentDidMount() {
    const { UserStore } = this.props;
    await UserStore.fetchUserRoles();
  }

  applyValidator = async () => {
    const { LandStore: { landContract }, UserStore: { authenticatedUser: { publicAddress } } } = this.props;
    if (!landContract) throw new Error('No contract found');
    const res = await landContract.requestAccess(0, { from: publicAddress });
    console.log(res);
  }

  applyTransactor = async () => {
    const { LandStore: { landContract }, UserStore: { authenticatedUser: { publicAddress } } } = this.props;
    if (!landContract) throw new Error('No contract found');
    const res = await landContract.requestAccess(1, { from: publicAddress });
    console.log(res);
  }

  render() {
    const { visible, handleCancel, handleOk } = this.props;
    const { UserStore: { authenticatedUser, isUserRoleFetching } } = this.props;
    if (isUserRoleFetching || !authenticatedUser) return null;
    return (
      <Modal
        title="Profile Info"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <StyledDiv>
          {
          authenticatedUser.isTransactor ? <P> Role: Transactor </P> :
          <Button primary onClick={this.applyTransactor}> APPLY FOR TRANSACTOR</Button>
            }
        </StyledDiv>
        <StyledDiv>
          {
            authenticatedUser.isValidator ? <P>Role: Validator</P> :
            <Button primary onClick={this.applyValidator}> APPLY FOR VALIDATOR</Button>
        }
        </StyledDiv>
      </Modal>
    );
  }
}

export default ProfileModal;
