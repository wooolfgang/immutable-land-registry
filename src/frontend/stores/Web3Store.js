import { observable, action } from 'mobx';

class Web3Store {
  @observable web3;
  @observable address;

  constructor(store) {
    this.store = store;
  }

  @action.bound
  addWeb3(web3) {
    this.web3 = web3;
  }

  @action.bound
  async getAddress() {
    if (!this.address) {
      this.address = await this.web3.eth.getCoinbase();
    }
    return this.address;
  }
}

export default Web3Store;
