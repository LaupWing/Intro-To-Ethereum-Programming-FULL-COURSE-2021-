pragma solidity >=0.4.22 <0.9.0;

contract Decentragram {
   string public name = "Decentragram";

   uint public imageCount = 0;
   mapping(uint => Image) public images;

   struct Image {
      uint id; // uint is always positive
      string hash;
      string description;
      uint tipAmount;
      // address author;
      address payable author;
   }

   function uploadImage(string memory _imageHash, string memory _describtion) public{
      imageCount + imageCount++;
      images[imageCount] = Image(imageCount, _imageHash, _describtion, 0, msg.sender);
   }
}
