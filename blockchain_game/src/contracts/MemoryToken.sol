// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ERC721Full.sol";

contract MemoryToken is ERC721Full {
  // Code goes here...
   constructor() ERC721Full("MemoryToken", "MEMORY") public{

   }
   
   
}
