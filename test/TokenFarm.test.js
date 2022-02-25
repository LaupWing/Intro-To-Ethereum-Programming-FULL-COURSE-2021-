const { assert } = require('chai')

const TokenFarm = artifacts.require('TokenFarm')
const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')

require('chai')
   .use(require('chai-as-promised'))
   .should()


contract('Tokenfarm', accounts =>{
   // Write test here...
   let daiToken, dappToken, tokenFarm

   before(async ()=>{
      daiToken = await DaiToken.new()
      dappToken = await DappToken.new()
      tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
   })


   describe('Mock Dai deployment', async ()=>{
      it('has a name' , async ()=>{
         const name = await daiToken.name()
         assert.equal(name, 'Mock DAI Token')
      })
   })
})