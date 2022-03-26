pragma solidity ^0.8.13;
contract epesa {
      uint public dueDate;
      uint public invoiceAmount;
      address wakala;

  constructor(uint _invoiceAmount) public {
    dueDate = block.timestamp + 200;
    invoiceAmount = _invoiceAmount;
    wakala = msg.sender;
  }

}


