function formatRegisteredLands() {

}

function formatAddLandRequests(requests) {
  return requests.map((req) => {
    return {
      index: req[0].toNumber(),
      createdBy: req[1],
      validators: req[2],
      ownerAddress: req[3],
      previousOwners: req[4],
      coordinates: req[5].map((val) => {
        const values = web3.toAscii(val).split(',');
        return {
          lat: values[0],
          lng: values[1],
        };
      }),
      ownerName: web3.toAscii(req[6]),
      location: web3.toAscii(req[7]),
    };
  });
}

function formatTransferLandRequests(requests) {

}

function formatRoleRequests(requests) {
  return requests.map((req) => {
    let role;
    if (req[2].toNumber() === 1) {
      role = 'validator';
    } else if (req[2].toNumber() === 2) {
      role = 'transactor';
    }
    return {
      index: req[0].toNumber(),
      requesterAddress: req[1],
      role,
    };
  });
}


module.exports = {
  formatRegisteredLands,
  formatAddLandRequests,
  formatTransferLandRequests,
  formatRoleRequests,
};

