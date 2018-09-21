/* eslint-disable no-undef ,no-plusplus */

const LandTitle = artifacts.require('LandTitle');

contract('LandTitle', async (accounts) => {
  const owner = accounts[0];
  let landTitle;

  beforeEach('Setup new contract before each test', async () => {
    landTitle = await LandTitle.new(owner);
  });

  describe('addLandTransaction', () => {
    it('Should throw when caller is not a transactor or validator', async () => {
      let res;
      try {
        const landOwner = accounts[2];
        const unauthorizedCaller = accounts[3];
        res = await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: unauthorizedCaller });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should add land transaction when msg sender is a validator or transactor', async () => {
      const landOwner = accounts[2];
      const validator = accounts[2];
      await landTitle.setTransactor(validator);
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: validator });
      const length = await landTitle.getAddLandTransactionsLength.call();
      assert.equal(Number(length), 1, 'New length of land transactions should be 1');
      const res = await landTitle.getAddLandTransaction(0);
      assert.equal(res[0].toNumber(), 0, 'It should return the correct index');
    });
  });

  describe('getLandTransactions', () => {
    it('Should throw when caller is not validator or transactor', async () => {
      const landOwner = accounts[2];
      const unauthorizedCaller = accounts[3];
      let res;
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      try {
        res = await landTitle.getAddLandTransaction.call(0, { from: unauthorizedCaller });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should return the correct transaction', async () => {
      const landOwner = accounts[2];
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      const res = await landTitle.getAddLandTransaction.call(0, { from: owner });
      const expected = [
        0,
        owner,
        [],
        landOwner,
        [],
        [web3.toHex('1') + new Array(67 - web3.toHex('1').length).join('0'), web3.toHex('2') + new Array(67 - web3.toHex('2').length).join('0')],
        web3.toHex('Li Arolf') + new Array(67 - web3.toHex('Li Arolf').length).join('0'),
        web3.toHex('Somwhere') + new Array(67 - web3.toHex('Somehere').length).join('0'),
      ];
      res[0] = res[0].toNumber();
      assert.deepEqual(res, expected, 'The returned data should return the expected data');
    });
  });

  describe('validateAddLandTransaction', () => {
    it('Should throw an error when msg.sender is not a validator', async () => {
      const landOwner = accounts[2];
      const unauthorizedCaller = accounts[3];
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      let res;

      try {
        res = await landTitle.validateAddLandTransaction(0, { from: unauthorizedCaller });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should add the validator on the validators list of the land', async () => {
      const landOwner = accounts[2];
      const validatorOne = accounts[3];
      await landTitle.setValidator(validatorOne, { from: owner });
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      await landTitle.validateAddLandTransaction(0, { from: validatorOne });
      const res = await landTitle.getAddLandTransaction(0);
      assert.equal(res[2].length, 1);
    });

    it('Should throw error if validator has already validated ', async () => {
      const landOwner = accounts[2];
      const validatorOne = accounts[3];
      await landTitle.setValidator(validatorOne, { from: owner });
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      let res;

      try {
        await landTitle.validateAddLandTransaction(0, { from: validatorOne });
        res = await landTitle.validateAddLandTransaction(0, { from: validatorOne });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should remove the addLandTransaction and add the new land', async () => {
      const landOwner = accounts[2];
      const validatorOne = accounts[3];
      const validatorTwo = accounts[4];
      await landTitle.setValidator(validatorOne, { from: owner });
      await landTitle.setValidator(validatorTwo, { from: owner });
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      await landTitle.validateAddLandTransaction(0, { from: validatorOne });
      await landTitle.validateAddLandTransaction(0, { from: validatorTwo });
      const addLandTxns = await landTitle.getAddLandTransactionsLength.call();
      const landsLength = await landTitle.getLandsLength.call();
      assert.equal(addLandTxns.toNumber(), 0, 'Addlandtransaction should be deleted');
      assert.equal(landsLength.toNumber(), 1, 'A new land should be addded');
    });
  });

  describe('transferLandTransaction', () => {
    it('Should throw an error when msg.sender is not a validator / transactor', async () => {
      const landOwner = accounts[2];
      const newLandOwner = accounts[3];
      const unauthorizedCaller = accounts[4];
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });

      let res;
      try {
        res = await landTitle.transferLandTransaction(newLandOwner, 0, { from: unauthorizedCaller });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error, 'It should throw when caller is not authorized');
    });

    it('Should add new transfer transaction with correct data', async () => {
      const landOwner = accounts[2];
      const validatorFirst = accounts[3];
      const validatorSecond = accounts[4];
      await landTitle.setValidator(validatorFirst);
      await landTitle.setValidator(validatorSecond);
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      await landTitle.validateAddLandTransaction(0, { from: validatorFirst });
      await landTitle.validateAddLandTransaction(0, { from: validatorSecond });
      const newLandOwner = accounts[5];
      await landTitle.transferLandTransaction(newLandOwner, 'John', 0);
      const transferTransactionLength = await landTitle.getTransferLandTransactionsLength.call();
      let transferTransaction = await landTitle.getTransferLandTransaction(0);
      const expected = [
        0,
        0,
        web3.toHex('John') + new Array(67 - web3.toHex('John').length).join('0'),
        owner,
        newLandOwner,
        [],
      ];
      transferTransaction = [
        Number(transferTransaction[0]),
        Number(transferTransaction[1]),
        transferTransaction[2],
        transferTransaction[3],
        transferTransaction[4],
        transferTransaction[5],
      ];
      assert.equal(Number(transferTransactionLength), 1, 'There should be a new transfer transaction');
      assert.deepEqual(expected, transferTransaction, 'Should return the correct data');
    });

    it('Should mutate the data once the land transfer has two validators', async () => {
      const landOwner = accounts[2];
      const validatorFirst = accounts[3];
      const validatorSecond = accounts[4];
      await landTitle.setValidator(validatorFirst);
      await landTitle.setValidator(validatorSecond);
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      await landTitle.validateAddLandTransaction(0, { from: validatorFirst });
      await landTitle.validateAddLandTransaction(0, { from: validatorSecond });
      const newLandOwner = accounts[5];
      await landTitle.transferLandTransaction(newLandOwner, 'John', 0);
      const transferTransactionLength = await landTitle.getTransferLandTransactionsLength.call();
      let transferTransaction = await landTitle.getTransferLandTransaction(0);
      const expected = [
        0,
        0,
        web3.toHex('John') + new Array(67 - web3.toHex('John').length).join('0'),
        owner,
        newLandOwner,
        [],
      ];
      transferTransaction = [
        Number(transferTransaction[0]),
        Number(transferTransaction[1]),
        transferTransaction[2],
        transferTransaction[3],
        transferTransaction[4],
        transferTransaction[5],
      ];
      assert.equal(Number(transferTransactionLength), 1, 'There should be a new transfer transaction');
      assert.deepEqual(expected, transferTransaction, 'Should return the correct data');
    });

    it('Should transfer the land to new owner once transfer transaction has two validators', async () => {
      const landOwner = accounts[2];
      const validatorFirst = accounts[3];
      const validatorSecond = accounts[4];
      await landTitle.setValidator(validatorFirst);
      await landTitle.setValidator(validatorSecond);
      await landTitle.addLandTransaction(landOwner, ['1', '2'], 'Li Arolf', 'Somwhere', { from: owner });
      await landTitle.validateAddLandTransaction(0, { from: validatorFirst });
      await landTitle.validateAddLandTransaction(0, { from: validatorSecond });
      const newLandOwner = accounts[5];
      await landTitle.transferLandTransaction(newLandOwner, 'John', 0);
      await landTitle.validateTransferLandTransaction(0, { from: validatorFirst });
      await landTitle.validateTransferLandTransaction(0, { from: validatorSecond });
      const transferTransactionLength = await landTitle.getTransferLandTransactionsLength.call();
      const land = await landTitle.getLand(0);
      const expected = [
        newLandOwner,
        [landOwner],
        [web3.toHex(1) + new Array(67 - web3.toHex(1).length).join('0'),
          web3.toHex(2) + new Array(67 - web3.toHex(2).length).join('0')],
        web3.toHex('John') + new Array(67 - web3.toHex('John').length).join('0'),
        web3.toHex('Somwhere') + new Array(67 - web3.toHex('Somwhere').length).join('0'),
      ];
      assert.equal(Number(transferTransactionLength), 0, 'Transfer transction should be deleted');
      assert.deepEqual(land, expected, 'Land should be modified to new owner');
    });
  });
});
