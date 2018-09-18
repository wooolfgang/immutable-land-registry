/* eslint-disable no-undef ,no-plusplus */

const LandTitle = artifacts.require('LandTitle');

contract('LandTitle', async (accounts) => {
  const owner = accounts[0];
  let landTitle;

  beforeEach('Setup new contract before each test', async () => {
    landTitle = await LandTitle.new(owner);
  });

  describe('addLandTransaction', () => {
    it('Should throw when caller is not a transactor or validator', () => {

    });
  });
});

