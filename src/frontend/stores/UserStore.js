import { observable, action } from 'mobx';
import app from '../app';

class UserStore {
  @observable authenticatedUser = null;
  @observable isUserRoleFetching = false;

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
  }

  @action.bound
  async fetchUserRoles() {
    this.isUserRoleFetching = true;
    if (!this.authenticatedUser) {
      throw new Error('No authenticated user');
    }
    if (!this.store.LandStore.landContract) {
      throw new Error('No contract');
    }
    try {
      const contract = this.store.LandStore.landContract;
      const isTransactor = await contract.isTransactor(this.authenticatedUser.publicAddress);
      const isValidator = await contract.isValidator(this.authenticatedUser.publicAddress);
      const isCeo = await contract.isCeo(this.authenticatedUser.publicAddress);
      this.authenticatedUser.isTransactor = isTransactor;
      this.authenticatedUser.isValidator = isValidator;
      this.authenticatedUser.isCeo = isCeo;
      this.setRoles();
    } catch (e) {
      console.log(e);
    }
    this.isUserRoleFetching = false;
  }

  @action.bound setRoles() {
    const roles = [];
    if (this.authenticatedUser.isTransactor) {
      roles.push('TRANSACTOR');
    }
    if (this.authenticatedUser.isValidator) {
      roles.push('VALIDATOR');
    }
    if (this.authenticatedUser.isCeo) {
      roles.push('CEO');
    }
    this.authenticatedUser.roles = roles;
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
