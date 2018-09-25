/* eslint-disable no-undef ,no-plusplus */
const AccessControl = artifacts.require('AccessControl');

contract('AccessControl', async (accounts) => {
  const owner = accounts[0];
  let accessControl;
  const ROLE_VALIDATOR = 0;
  const ROLE_TRANSACTOR = 1;

  beforeEach('Setup new contract before each test', async () => {
    accessControl = await AccessControl.new();
  });

  describe('requestAccess', () => {
    it('Adds a request transaction with role transactor returns correct data', async () => {
      const sender = accounts[2];
      await accessControl.requestAccess(ROLE_TRANSACTOR, { from: sender });
      const txn = await accessControl.getRequest(0);
      const expected = [
        0,
        sender,
        ROLE_TRANSACTOR,
      ];
      const txnFormattted = [
        txn[0].toNumber(),
        txn[1],
        txn[2].toNumber(),
      ];
      assert.deepEqual(txnFormattted, expected, 'Should return the correct requestAccessTransaction data');
    });
    it('Adds a request transaction with role validator returns correct data', async () => {
      const sender = accounts[2];
      await accessControl.requestAccess(ROLE_VALIDATOR, { from: sender });
      const txn = await accessControl.getRequest(0);
      const expected = [
        0,
        sender,
        ROLE_VALIDATOR,
      ];
      const txnFormattted = [
        txn[0].toNumber(),
        txn[1],
        txn[2].toNumber(),
      ];
      assert.deepEqual(txnFormattted, expected, 'Should return the correct requestAccessTransaction data');
    });
  });

  describe('approveRequest', () => {
    it('Removes the request transaction and approves the user for that role', async () => {
      const sender = accounts[2];
      await accessControl.requestAccess(ROLE_TRANSACTOR, { from: sender });
      await accessControl.approveRequest(0);
      const requestsLength = await accessControl.getRequestsLength();
      const isTransactor = await accessControl.isTransactor(sender);
      const isValidator = await accessControl.isValidator(sender);
      assert.equal(requestsLength.toNumber(), 0, 'Should be zero');
      assert.equal(isTransactor, true, 'Sender should be a transactor');
      assert.equal(isValidator, false, 'Sender should not be a validator');
    });
  });
});

