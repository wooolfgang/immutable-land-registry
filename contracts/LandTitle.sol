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
    onlyValidator {
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
    
    /* Function used for transferring lands with previous owner */
    function transferLandTransaction(address _newLandOwner, uint _landIndex) 
    public 
    onlyTransactor
    onlyValidator {
        address[] memory validators;
        TransferLandTransaction memory txn = TransferLandTransaction({
            index: transferLandTransactions.length,
            landIndex: _landIndex,
            createdBy: msg.sender,
            newLandOwner: _newLandOwner,
            validators: validators
        });
        transferLandTransactions.push(txn);
    }

    /* 
        Once add land transaction has been validated (e.g 2 validators has validated),
        Replace the land transaction with the last land transaction
        Add the Land on the lands array
    */
    function addLand(AddLandTransaction _transaction) internal onlyValidator {
        require(_transaction.validators.length >= requiredValidatorsLength, "Transfer land needs at least two validators");
        AddLandTransaction storage lastTransaction = addLandTransactions[addLandTransactions.length - 1];
        addLandTransactions[_transaction.index] = lastTransaction;
        lastTransaction.index = _transaction.index;
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
        transferLandTransactions[_transaction.index] = lastTransaction;
        lastTransaction.index = _transaction.index;
        lands[_transaction.landIndex].previousOwners.push(lands[_transaction.landIndex].ownerAddress);
        lands[_transaction.landIndex].ownerAddress = _transaction.newLandOwner;
    }
}