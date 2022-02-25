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
})