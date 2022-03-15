// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DVideo {
   uint256 public videoCount = 0;
   string public name = "DVideo";
   mapping(uint => Video) public videos;

   // 1. Model the Video
   //Create id=>struct mapping
   struct Video {
      uint id;
      string hash;
      string title;
      address author;
   }

   //Create Struct

   //Create Event
   event VideoUploaded(
      uint id,
      string hash,
      string title,
      address author
   );

   constructor() public {}

   function uploadVideo(string memory _videoHash, string memory _title)
      public
   {
      require(bytes(_videoHash).length > 0);
      require(bytes(_title).length > 0);
      require(msg.sender != address(0));
      // Make sure the video hash exists
      // Make sure video title exists
      // Make sure uploader address exists
      // Increment video id
      videoCount++;

      // Add video to the contract
      videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

      // Trigger an event
      emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
   }
}
