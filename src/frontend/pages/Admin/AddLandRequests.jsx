import React from 'react';
import { observer, inject } from 'mobx-react';
import { List, Avatar } from 'antd';

@inject('LandStore', 'Web3Store', 'UserStore')
@observer
class AddLandRequests extends React.Component {
  async componentDidMount() {
    const { LandStore } = this.props;
    await LandStore.fetchAddLandTransactions();
  }

  approve = async (index) => {
    const { LandStore: { landContract }, Web3Store: { getAddress } } = this.props;
    const address = await getAddress();
    const res = await landContract.validateAddLandTransaction(index, {
      from: address,
    });
    console.log(res);
  }

  render() {
    const { LandStore: { addLandTransactions }, UserStore: { authenticatedUser: { publicAddress } } } = this.props;
    return (
      <List
        style={{ overflow: 'scroll', height: '90%' }}
        itemLayout="horizontal"
        dataSource={addLandTransactions}
        renderItem={item => (
          <List.Item actions={item.validators.includes(publicAddress) ? [<a style={{ color: 'green' }}> Appproved </a>] : [<a onClick={() => this.approve(item.index)}>Approve</a>, <a>Reject</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a>[{item.index}] Created by: {item.createdBy}</a>}
              description={
                <div>
                  <p> <b> Owner: </b> {item.ownerAddress}</p>
                  <p> <b>Owner Name: </b>{item.ownerName}</p>
                  <p> <b>Validators:</b> {item.validators.reduce((acc, val) => acc + val, '')} </p>
                  <p> <b>Previous Owners:</b> {item.previousOwners.reduce((acc, val) => acc + val, '')}</p>
                  <p> <b>Coordinates: </b>{item.coordinates.reduce((acc, val) => `${acc} Lat:${val.lat} Lng:${val.lng}`, '')} </p>
                  <p> <b>Location:</b> {item.location}</p>
                </div>
                           }
            />
          </List.Item>
      )}
      />
    );
  }
}

export default AddLandRequests;

