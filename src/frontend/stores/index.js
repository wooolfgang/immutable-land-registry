import LandStore from './LandStore';
import UserStore from './UserStore';
import AuthStore from './AuthStore';
import Web3Store from './Web3Store';

class RootStore {
  constructor() {
    this.LandStore = new LandStore(this);
    this.UserStore = new UserStore(this);
    this.AuthStore = new AuthStore(this);
    this.Web3Store = new Web3Store(this);
  }
}

export default RootStore;
