import { observable, action } from 'mobx';
import { required } from '../utils/validation';

class LandStore {
  @observable currentNewLandStep = 0;
  @observable registeredLands;
  @observable newLandTitle = {
    firstName: '',
    surname: '',
    residenceOfOwner: '',
    landLocation: '',
    landArea: '',
    contactNumber: '',
    numberPrefix: '+63',
    ownerImg: '',
    coordinates: [],
  };
  @observable newLandTitleErr = {
    firstName: 'Required',
    surname: 'Required',
    residenceOfOwner: 'Required',
    contactNumber: 'Required',
  };

  constructor(store) {
    this.store = store;
  }

  async getRegisteredLands() {
    this.registeredLands = [];
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
