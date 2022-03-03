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
      address author;
      // address payable author;
   }

   event ImageCreated(
      uint id,
      string hash,
      string description,
      uint tipAmount,
      address author
   );
      // address payable author

   function uploadImage(string memory _imageHash, string memory _description) public{
      require(bytes(_imageHash).length > 0);
      require(bytes(_description).length > 0);
      require(msg.sender != address(0x0));


      imageCount++;
      images[imageCount] = Image(imageCount, _imageHash, _description, 0, msg.sender);
      
      emit ImageCreated(imageCount, _imageHash, _description, 0, msg.sender);
   }
}
