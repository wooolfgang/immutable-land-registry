function formatRegisteredLands(lands) {
  return lands.map((land) => {
    const coordinates = land[2].map((coordinate) => {
      const parsed = web3.toAscii(coordinate).split(',');
      return {
        lat: Number(parsed[0]),
        lng: Number(parsed[1].slice(0, parsed[1].length - 1)),
      };
    });
    return {
      ownerAddress: land[0],
      previousOwners: land[1],
      coordinates,
      ownerName: web3.toAscii(land[3]),
      location: web3.toAscii(land[4]),
    };
  });
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

