const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
   .use(require('chai-as-promised'))
   .should()

contract('Memory Token', (accounts) => {
   let token

   before(async ()=>{
      token = await MemoryToken.deployed()
   })
   // code goes here...
   describe('deployment', async ()=>{
      it('deploys succesfully', async ()=>{
         const address = token.address
         assert.notEqual(address, 0x0)
         assert.notEqual(address, '')
         assert.notEqual(address, null)
         assert.notEqual(address, undefined)
      })

      it('has a name', async ()=>{
         const name = await token.name()
         assert.equal(name, 'Memory Token')
      })
   })
})
