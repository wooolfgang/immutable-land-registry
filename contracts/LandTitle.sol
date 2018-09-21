pragma solidity ^0.4.24;
import "./AccessControl.sol";

contract LandTitle is AccessControl {
    
    struct Land {
        address ownerAddress;
        address[] previousOwners;
        bytes32[] coordinates;
        bytes32 ownerName;
        bytes32 location;
    }
    
    struct AddLandTransaction {
        uint index;
        address createdBy;
        address[] validators;
        Land land;
    }
    
    struct TransferLandTransaction {
        uint index;
        uint landIndex;
        bytes32 newLandOwnerName;
        address createdBy;
        address newLandOwner;
        address[] validators;
    }
    
    mapping(address => uint[]) addressToLandIndexes;
    Land[] lands;
    AddLandTransaction[] addLandTransactions;
    TransferLandTransaction[] transferLandTransactions;
    uint requiredValidatorsLength = 2;
    
    /* This function is used for lands to be registered without previous owners */
    function addLandTransaction(address _ownerAddress, bytes32[] _coordinates, bytes32 _ownerName, bytes32 _location) 
    public 
    onlyTransactor
    {
        Land memory land = Land({ 
            ownerAddress: _ownerAddress,
            previousOwners: new address[](0),
            coordinates: _coordinates,
            ownerName: _ownerName,
            location: _location
        }); 
        
        AddLandTransaction memory txn = AddLandTransaction({  
            index: addLandTransactions.length,
            createdBy: msg.sender,
            validators: new address[](0),
            land: land
        });
        
        addLandTransactions.push(txn);
    }

     /* Function used for adding land transfer transactions with previous owner */
    function transferLandTransaction(address _newLandOwner, bytes32 _newLandOwnerName, uint _landIndex) 
    public 
    onlyTransactor
    {
        address[] memory validators;
        TransferLandTransaction memory txn = TransferLandTransaction({
            index: transferLandTransactions.length,
            landIndex: _landIndex,
            createdBy: msg.sender,
            newLandOwner: _newLandOwner,
            newLandOwnerName: _newLandOwnerName,
            validators: validators
        });
        transferLandTransactions.push(txn);
    }

    /*
        Function used by validators to validate the addLandTransaction
        Adds the caller as validator if current validators are less than required validators
        Else, transaction is "finished" and land gets added in the lands storage
    */
    function validateAddLandTransaction(uint _index) public onlyValidator {
        AddLandTransaction storage txn = addLandTransactions[_index];
        for (uint i = 0; i < txn.validators.length; i++) {
            if (txn.validators[i] == msg.sender) {
                revert("This address is already a validator");
            }
        }
        
        txn.validators.push(msg.sender);

        if (txn.validators.length == requiredValidatorsLength) {
            addLand(txn);
        }
    }   

    function validateTransferLandTransaction(uint _index) public onlyValidator {
        TransferLandTransaction storage txn = transferLandTransactions[_index];
        for (uint i = 0; i < txn.validators.length; i++) {
            if (txn.validators[i] == msg.sender) {
                revert("This address is already a validator");
            }
        }

        txn.validators.push(msg.sender);

        if (txn.validators.length == requiredValidatorsLength) {
            transferLand(txn);
        }
    }

    function getAddLandTransaction(uint _index) public view onlyValidator returns (
        uint index,
        address createdBy, 
        address[] validators,
        address ownerAddress,
        address[] previousOwners,
        bytes32[] coordinates,
        bytes32 ownerName,
        bytes32 location
    ) {
        AddLandTransaction memory txn = addLandTransactions[_index];
        Land memory land = txn.land;
        return (
        txn.index, txn.createdBy, txn.validators, land.ownerAddress, 
        land.previousOwners, land.coordinates, land.ownerName, land.location
        );
    }

    function getTransferLandTransaction(uint _index) public view onlyValidator returns (
        uint index,
        uint landIndex,
        bytes32 newLandOwnerName,
        address createdBy,
        address newLandOwner,
        address[] validators
    ) {
        TransferLandTransaction memory txn = transferLandTransactions[_index];
        return (txn.index, txn.landIndex, txn.newLandOwnerName, txn.createdBy, txn.newLandOwner, txn.validators);
    }

    function getAddLandTransactionsLength() public view returns (uint) {
        return addLandTransactions.length;
    }

    function getTransferLandTransactionsLength() public view returns (uint) {
        return transferLandTransactions.length;
    }

    function getLandsLength() public view returns (uint) {
        return lands.length;
    }

    function getLand(uint _index) public view onlyTransactor returns (
        address ownerAddress,
        address[] previousOwners,
        bytes32[] coordinates,
        bytes32 ownerName,
        bytes32 location
    ) {
        Land memory land = lands[_index];
        return (land.ownerAddress, land.previousOwners, land.coordinates, land.ownerName, land.location);
    }

    /* 
        Once add land transaction has been validated (e.g 2 validators has validated),
        Replace the land transaction with the last land transaction, delete the last transaction
        Add the Land on the lands array
    */
    function addLand(AddLandTransaction _transaction) internal onlyValidator {
        require(_transaction.validators.length >= requiredValidatorsLength, "Transfer land needs at least two validators");
        AddLandTransaction storage lastTransaction = addLandTransactions[addLandTransactions.length - 1];
        lastTransaction.index = _transaction.index;   
        addLandTransactions[_transaction.index] = lastTransaction;
        delete addLandTransactions[addLandTransactions.length - 1]; 
        addLandTransactions.length--;
        lands.push(_transaction.land);
    }

    /*
        Once transfer land transaction has been validated, 
        Replace the land transaction with the last land transaction in the array
        Replace the Land Data by changing the landOwner and moving the currentOwner to previousOwners
    */
    function transferLand(TransferLandTransaction _transaction) internal onlyValidator {
        require(_transaction.validators.length >= requiredValidatorsLength, "Transfer land needs at least two validators");
        TransferLandTransaction storage lastTransaction = transferLandTransactions[transferLandTransactions.length - 1]; 
        lastTransaction.index = _transaction.index;
        transferLandTransactions[_transaction.index] = lastTransaction;
        delete transferLandTransactions[transferLandTransactions.length - 1];
        transferLandTransactions.length--;
        lands[_transaction.landIndex].previousOwners.push(lands[_transaction.landIndex].ownerAddress);
        lands[_transaction.landIndex].ownerAddress = _transaction.newLandOwner;
        lands[_transaction.landIndex].ownerName = _transaction.newLandOwnerName;
    }
}