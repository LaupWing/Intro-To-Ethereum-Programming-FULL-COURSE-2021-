pragma solidity >=0.5.0 <0.9.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
   string public name = "Dapp Token Farm";
   DappToken public dappToken;
   DaiToken public daiToken;

   mapping(address => uint) public stakingBalance;
   mapping(address => bool) public hasStaked;
   mapping(address => bool) public isStaking;
   address[] public stakers;

   constructor(DappToken _dappToken, DaiToken _daiToken) public{
      dappToken = _dappToken;
      daiToken = _daiToken;
   }

   // 1. Stakes Tokens (Deposit)
   function stakeTokens(uint _amount) public{
      // Transfer Mock Dai tokens to this contract for staking
      daiToken.transferFrom(msg.sender, address(this), _amount);

      stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

      // Add user to stakers array *only* if the havent staked already
      if(!hasStaked[msg.sender]){
         stakers.push(msg.sender);        
      }

      // Update staking statuss
      isStaking[msg.sender] = true;
      hasStaked[msg.sender] = true;
   }

   // 2. Unstakeing Tokens (Withdraw)

   // 3. Issuing Tokens
}