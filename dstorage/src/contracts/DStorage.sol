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

   function uploadFile() public{
      files[1] = File(1, 'abc123', 1024, 'png','Foobar', 'Foo bar baz', 23432432, payable(0x0));
   }
}
