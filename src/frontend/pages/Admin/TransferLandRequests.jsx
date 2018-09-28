import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('LandStore')
@observer
class TransferLandRequests extends React.Component {
  async componentDidMount() {
    const { LandStore } = this.props;
    await LandStore.fetchTransferLandTransactions();
  }

  render() {
    return (
      <div />
    );
  }
}

export default TransferLandRequests;

