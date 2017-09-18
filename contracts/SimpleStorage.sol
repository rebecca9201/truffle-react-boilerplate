pragma solidity ^0.4.15;

contract SimpleStorage {
  uint public value;
  address public owner;
  
  function SimpleStorage() {
      value = 0;
      owner = msg.sender;
  }

  function setValue(uint val) {
      value = val;
  }

  function getValue() returns(uint) {
    return value;
  }
}