import landService from './lands';
import userService from './user';

const setupAllServices = (db) => {
  return function setup() {
    const app = this;
    app
      .configure(landService(db))
      .configure(userService(db));
  };
};

export default setupAllServices;
