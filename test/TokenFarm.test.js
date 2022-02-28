const { assert } = require('chai')

const TokenFarm = artifacts.require('TokenFarm')
const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')

require('chai')
   .use(require('chai-as-promised'))
   .should()

function tokens(n){
   return web3.utils.toWei(n, 'ether')
}

contract('Tokenfarm', ([owner, investor]) =>{
   // Write test here...
   let daiToken, dappToken, tokenFarm

   before(async ()=>{
      // Load contracts
      daiToken = await DaiToken.new()
      dappToken = await DappToken.new()
      tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

      // Transfer all Dapp tokens to farm (1 million)
      await dappToken.transfer(tokenFarm.address, tokens('1000000'))

      await daiToken.transfer(investor, tokens('100'), {
         from: owner
      })

   })


   describe('Mock Dai deployment', async ()=>{
      it('has a name' , async ()=>{
         const name = await daiToken.name()
         assert.equal(name, 'Mock DAI Token')
      })
   })

   describe('Dapp token deployment', async ()=>{
      it('has a name' , async ()=>{
         const name = await dappToken.name()
         assert.equal(name, 'DApp Token')
      })
   })

   describe('Token Farm deployment', async ()=>{
      it('has a name' , async ()=>{
         const name = await tokenFarm.name()
         assert.equal(name, 'Dapp Token Farm')
      })
      it('contract has tokens' , async ()=>{
         const balance = await dappToken.balanceOf(tokenFarm.address)
         assert.equal(balance.toString(), tokens('1000000'))
      })
   })

   describe('Farming tokens', async ()=>{
      it('rewards investors for staking mDai tokens', async()=>{
         let result

         // Check investor balance for staking
         result = await daiToken.balanceOf(investor)
         assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

         // Stake Mock DAI Tokens
         await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
         await tokenFarm.stakeTokens(tokens('100'), {from: investor})

         result = await daiToken.balanceOf(investor)
         assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

         result = await daiToken.balanceOf(tokenFarm.address)
         assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')

         result = await tokenFarm.stakingBalance(investor)
         assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

         await tokenFarm.issueToken({from: owner})

         result = await dappToken.balanceOf(investor)
         assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct after issue')

         await tokenFarm.issueTokens({from: investor}).should.be.rejected;

         await tokenFarm.unstakeTokens({from: investor})

         result = await daiToken.balanceOf(investor)
         assert.equal(result.toString(), tokens('100'), 'investor DAI wallet balance correct after staking')

         result = await daiToken.balanceOf(tokenFarm.address)
         assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')

         result = await tokenFarm.stakingBalance(investor)
         assert.equal(result.toString(), tokens('0'), 'investor staking balance correct afters staking')

         result = await tokenFarm.isStaking(investor)
         assert.equal(result.toString(), false, 'investor staking status correct after staking')
      })

   })
})