const { assert } = require('chai')

const Decentragram = artifacts.require('./Decentragram.sol')

require('chai')
   .use(require('chai-as-promised'))
   .should()

contract('Decentragram', ([deployer, author, tipper]) => {
   let decentragram

   before(async () => {
      decentragram = await Decentragram.deployed()
   })

   describe('deployment', async () => {
      it('deploys successfully', async () => {
         const address = await decentragram.address
         assert.notEqual(address, 0x0)
         assert.notEqual(address, '')
         assert.notEqual(address, null)
         assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
         const name = await decentragram.name()
         assert.equal(name, 'Decentragram')
      })
   })

   describe('images', async ()=>{
      let result, imageCount
      const hash = 'abc123'

      before(async ()=>{
         result = await decentragram.uploadImage(hash, 'Image Description', {from: author})
         imageCount = await decentragram.imageCount()
      })

      it('create images', async ()=>{
         assert.equal(imageCount, 1)
         const event = result.logs[0].args
         assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
         assert.equal(event.hash, hash, 'Hash correct')
         assert.equal(event.description, 'Image Description', 'description is correct')
         assert.equal(event.tipAmount, '0', 'tip amount is correct')
         assert.equal(event.author, author, 'Author is correct')

         await decentragram.uploadImage('', 'Image Description', {from: author}).should.be.rejected
         await decentragram.uploadImage('Image hash', '', {from: author}).should.be.rejected
      })

      it('list images', async()=>{
         const image = await decentragram.images(imageCount)
         assert.equal(image.id.toNumber(), imageCount.toNumber(), 'Id is correct')
         assert.equal(image.hash, hash, 'Hash is correct')
         assert.equal(image.description, 'Image Description', 'Description is correct')
         assert.equal(image.tipAmount, '0', 'Tip amount is correct')
         assert.equal(image.author, author, 'Author is correct')
      })
   })

})