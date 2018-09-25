import { action, observable, computed } from 'mobx';
import app from '../app';

class AuthStore {
  @observable isAuthenticating;

  constructor(store) {
    this.store = store;
  }

  @computed get isAuthenticated() {
    return !!this.store.UserStore.authenticatedUser;
  }

  @action.bound
  async authenticate() {
    this.isAuthenticating = true;
    try {
      const token = await app.authenticate();
      const payload = await app.passport.verifyJWT(token.accessToken);
      const user = await app.service('api/users').get(payload.userId);
      this.store.UserStore.setAuthenicatedUser(user);
    } catch (e) {
      console.log(e);
    }
    this.isAuthenticating = false;
  }

  @action.bound
  async signinWithMetamask(signature, publicAddress) {
    try {
      const token = await app.authenticate({
        signature,
        publicAddress,
        strategy: 'metamask',
      });
      const payload = await app.passport.verifyJWT(token.accessToken);
      const user = await app.service('api/users').get(payload.userId);
      this.store.UserStore.setAuthenicatedUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound
  async signup(fullName, homeAddress, governmentIdNumber) {
    const { Web3Store, Web3Store: { web3 } } = this.store;
    const publicAddress = Web3Store.address;

    if (!publicAddress) throw new Error('No user in metamask');
    if (!web3) throw new Error('No web3 istance found');

    const users = (await app.service('api/users').find({ query: { publicAddress } }));
    let user = users[0];

    if (users.length === 0 && fullName && homeAddress && governmentIdNumber) {
      user = await app.service('api/users').create({ publicAddress, fullName, homeAddress, governmentIdNumber });
    }

    console.log(user);

    const signature = await web3.eth.personal.sign(web3.utils.fromUtf8(`I am signing my one-time nonce: ${user.nonce}`), user.publicAddress);
    console.log(signature);
    await this.signinWithMetamask(signature, user.publicAddress);
  }

  @action.bound
  async logout() {
    try {
      await app.logout();
      this.store.UserStore.setAuthenicatedUser(null);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthStore;
