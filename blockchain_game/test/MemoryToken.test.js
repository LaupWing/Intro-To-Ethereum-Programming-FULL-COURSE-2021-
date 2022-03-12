const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
   .use(require('chai-as-promised'))
   .should()

contract('Memory Token', (accounts) => {
   let token
   // code goes here...
   describe('deployment', async ()=>{
      it('deploys succesfully', async ()=>{
         token = await MemoryToken.deployed()
         const address = token.address
         assert.notEqual(address, 0x0)
         assert.notEqual(address, '')
         assert.notEqual(address, null)
         assert.notEqual(address, undefined)
      })
   })
})
