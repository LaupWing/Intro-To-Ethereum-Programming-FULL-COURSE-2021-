pragma solidity >=0.4.22 <0.9.0;

contract Decentragram {
   string public name = "Decentragram";
   mapping(uint => Image) public images;
   struct Image {
      uint id; // uint is always positive
      string hash;
      string description;
      uint tipAmount;
      address payable author;
   }
}
