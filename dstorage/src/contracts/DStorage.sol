// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DStorage {
   string public name = 'DStorage';
   mapping(uint => File) public files;

   struct File {
      uint fileId;
      string fileHash;
      uint fileSize;
      string fileType;
      string fileName;
      string fileDescription;
      uint uploadTime;
      address payable uploader;
   }

   constructor() public {}

   function uploadFile(
      string memory _filehash,
      uint _fileSize,
      string memory _fileType,
      string memory _filename,
      string memory _fileDescription
   ) public{
      files[1] = File(
         1, 
         _filehash, 
         _fileSize, 
         _fileType,
         _filename, 
         _fileDescription, 
         23432432, 
         payable(msg.sender)
      );
   }
}
