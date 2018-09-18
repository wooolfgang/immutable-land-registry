pragma solidity ^0.4.24;

/* This contract handles the authorization logic */
contract AccessControl {
    address owner;
    mapping(address => bool) validators;
    mapping(address => bool) transactors;
    
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender address is not owner");
        _;
    }

    modifier onlyValidator() {
        require(validators[msg.sender] == true, "Sender address is not registered as validator");
        _;
    }
    
    modifier onlyTransactor() {
        require(transactors[msg.sender] == true, "Sender address is not registered as transactor");
        _;
    }

    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setValidator(address _validatorAddress) public onlyOwner {
        validators[_validatorAddress] = true;
    }
    
    function setTransactor(address _transactorAddress) public onlyOwner onlyValidator {
        transactors[_transactorAddress] = true;
    }

}