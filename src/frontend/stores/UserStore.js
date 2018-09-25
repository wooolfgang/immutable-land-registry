import { observable, action } from 'mobx';
import app from '../app';

class UserStore {
  @observable authenticatedUser = null;

  constructor(store) {
    this.store = store;
  }

  static isUserProfileComplete(user) {
    const requiredProps = ['fullName', 'address', 'homeAddress', 'governmentIdNumber'];
    return requiredProps.every(prop => user[prop]);
  }

  @action.bound
  setAuthenicatedUser(user) {
    this.authenticatedUser = user;
    console.log(user);
  }

  @action.bound
  async checkUserProfile() {
    if (!this.store.Web3Store.address) {
      return { isComplete: false, error: 'No Web3 found' };
    }

    try {
      const user = await app.service('api/users').find({ query: { publicAddress: this.store.Web3Store.address } });
      if (user.length <= 0) {
        return { isComplete: false, error: 'No user found' };
      }
      return { isComplete: UserStore.isUserProfileComplete(user[0]) };
    } catch (e) {
      return { isComplete: false, error: 'An error occured' };
    }
  }
}

export default UserStore;
