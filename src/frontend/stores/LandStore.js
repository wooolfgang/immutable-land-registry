import { observable, action, toJS } from 'mobx';
import { required } from '../utils/validation';
import formatter from '../utils/formatter';

class LandStore {
  @observable landContract;
  @observable currentNewLandStep = 0;
  @observable registeredLands = [];
  @observable addLandTransactions = [];
  @observable roleTransactions = [];
  @observable transferLandTransactions = [];
  @observable newLandTitle = {
    fullName: '',
    ownerAddress: '',
    residenceOfOwner: '',
    landLocation: '',
    landArea: '',
    contactNumber: '',
    numberPrefix: '+63',
    ownerImg: '',
    coordinates: [],
  };
  @observable newLandTitleErr = {
    fullName: 'Required',
    ownerAddress: 'Required',
    residenceOfOwner: 'Required',
    contactNumber: 'Required',
  };

  constructor(store) {
    this.store = store;
  }

  @action.bound
  setContract(contract) {
    this.landContract = contract;
  }

  @action.bound
  async fetchLand() {
    if (!this.landContract) {
      throw new Error('Land contract is not defined');
    }

    const registeredLandsLength = await this.landContract.getLandsLength.call();
    const landPromises = [];

    for (let i = 0; i < registeredLandsLength; i++) {
      landPromises.push(this.landContract.getLand(i));
    }

    const finalPromise = landPromises.reduce((previousPromise, current) => {
      return previousPromise.then((allContents) => {
        return current.then((content) => {
          allContents.push(content);
          return allContents;
        });
      });
    }, Promise.resolve([]));

    const lands = await finalPromise;
    const formattedlands = lands;
    this.registeredLands = formattedlands;
  }

  @action.bound
  async addLand(land) {
    const coordinates = [];
    land.latLngs.b[0].b.forEach((land) => {
      const lat = land.lat();
      const lng = land.lng();
      coordinates.push({ lat, lng });
    });
    this.registeredLands.push(coordinates);
    const mapped = coordinates.map(coor => new google.maps.LatLng(coor.lat, coor.lng));
    const polygon = new google.maps.Polygon({ path: mapped });
    const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    this.handleInputChange('coordinates', coordinates);
    this.handleInputChange('landArea', area);
  }

  @action.bound
  async submitLand() {
    const address = await this.store.Web3Store.getAddress();
    if (!this.landContract || !address) {
      throw new Error('Land contract is not defined');
    }

    const coordinates = toJS(this.newLandTitle.coordinates).map((val) => {
      const compressed = `${`${val.lat}`.slice(0, 15)},${`${val.lng}`.slice(0, 15)}`;
      return compressed;
    });

    try {
      const res = await this.landContract.addLandTransaction(
        toJS(this.newLandTitle.ownerAddress),
        coordinates,
        toJS(this.newLandTitle.fullName),
        toJS(this.newLandTitle.landLocation),
        {
          from: address,
        },
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound
  async fetchAddLandTransactions() {
    if (!this.landContract) {
      throw new Error('Land contract is not defined');
    }

    const addLandsTransactionLength = await this.landContract.getAddLandTransactionsLength.call();
    const addLandsPromises = [];
    for (let i = 0; i < addLandsTransactionLength; i++) {
      addLandsPromises.push(this.landContract.getAddLandTransaction(i));
    }

    const finalPromise = addLandsPromises.reduce((previousPromise, currentPromise) => {
      return previousPromise.then((allContents) => {
        return currentPromise.then((content) => {
          allContents.push(content);
          return allContents;
        });
      });
    }, Promise.resolve([]));

    const response = await finalPromise;
    const txns = formatter.formatAddLandRequests(response);
    this.addLandTransactions = txns;
  }

  @action.bound
  async fetchTransferLandTransactions() {
    if (!this.landContract) {
      throw new Error('Land contract is not defined');
    }

    const transferLandsTransactionLength = await this.landContract.getTransferLandTransactionsLength();
    const transferLandsPromises = [];
    for (let i = 0; i < transferLandsTransactionLength; i++) {
      transferLandsPromises.push(this.landContract.getTransferLandTransaction(i));
    }

    const finalPromise = transferLandsPromises.reduce((previousPromises, currentPromise) => {
      return previousPromises.then((allContents) => {
        return currentPromise.then((content) => {
          allContents.push(content);
          return allContents;
        });
      });
    }, Promise.resolve([]));

    const response = await finalPromise;
    console.log(response);
  }

  @action.bound
  async fetchRoleTransactions() {
    if (!this.landContract) {
      throw new Error('Land contract is not defined');
    }

    const roleTransactionsLength = await this.landContract.getRequestsLength.call();
    const roleTxnPromises = [];
    for (let i = 0; i < roleTransactionsLength; i++) {
      roleTxnPromises.push(this.landContract.getRequest(i));
    }

    const finalPromise = roleTxnPromises.reduce((previousPromise, currentPromise) => {
      return previousPromise.then((allContents) => {
        return currentPromise.then((content) => {
          allContents.push(content);
          return allContents;
        });
      });
    }, Promise.resolve([]));

    const response = await finalPromise;
    const txn = formatter.formatRoleRequests(response);
    this.roleTransactions = txn;
  }

  @action.bound
  nextStep(increment) {
    if (increment) {
      this.currentNewLandStep++;
    } else {
      this.currentNewLandStep--;
    }
  }

  @action.bound
  handleInputChange(prop, value) {
    this.newLandTitle[prop] = value;
  }

  @action.bound
  resetSelectedTitle() {
    this.selectedLandTitle = null;
  }

  @action.bound
  getValidationStatus(prop) {
    return this.newLandTitleErr[prop] === '' ? 'success' : 'error';
  }

  getError(prop) {
    this.newLandTitleErr[prop] = required(this.newLandTitle[prop]);
  }

  dataIsValid() {
    return Object.values(this.newLandTitleErr).every(value => value === '');
  }
}

export default LandStore;
