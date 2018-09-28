import React from 'react';
import { inject, observer } from 'mobx-react';
import { List, Avatar } from 'antd';

@inject('LandStore', 'UserStore')
@observer
class RoleRequests extends React.Component {
  componentDidMount() {
    const { LandStore } = this.props;
    LandStore.fetchRoleTransactions();
  }

  approve = async (index) => {
    const { LandStore: { landContract }, UserStore: { authenticatedUser } } = this.props;
    if (!landContract) throw new Error('No land contract');
    const res = await landContract.approveRequest(index, { from: authenticatedUser.publicAddress });
    console.log(res);
  }

  render() {
    const { LandStore: { roleTransactions } } = this.props;
    return (
      <List
        style={{ overflow: 'scroll', height: '90%' }}
        itemLayout="horizontal"
        dataSource={roleTransactions}
        renderItem={item => (
          <List.Item actions={[<a onClick={() => this.approve(item.index)}>Approve Role</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a>Transaction Index: {item.index}</a>}
              description={
                <div>
                  <p> <b> Requester Address: </b> {item.requesterAddress}</p>
                  <p> <b>Role: </b>{item.role}</p>
                </div>
                           }
            />
          </List.Item>
                )}
      />
    );
  }
}

export default RoleRequests;
