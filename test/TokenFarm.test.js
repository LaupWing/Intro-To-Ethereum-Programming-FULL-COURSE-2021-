const TokenFarm = artifacts.require('TokenFarm')
const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')

require('chai')
   .use(require('chai-as-promised'))
   .should()


contract('Tokenfarm', accounts =>{
   // Write test here...

   describe('Mock Dai deployment', async ()=>{
      it('has a name' , async ()=>{
         let daiToken = await DaiToken.new()
         asset
      })
   })
})