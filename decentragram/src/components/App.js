import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
   host: 'ipfs.infura.io',
   port: 5001,
   protocol: 'https'
})

class App extends Component {

   async componentDidMount(){
      await this.loadWeb3()
      await this.loadBlockchainData()
   }


   async loadWeb3() {
      if(window.ethereum){
         window.web3 = new Web3(window.ethereum)
         await window.ethereum.enable()
      }
      else if (window.web3){
         window.web3 = new Web3(window.web3.currentProvider)
      }
      else{
         window.alert('Non Ethereum browser detected. You should consider trying MetaMask!')
      }
   }

   async loadBlockchainData(){
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({
         account: accounts[0]
      })

      const networkId = await web3.eth.net.getId()
      const networkdData = Decentragram.networks[networkId]
      if(networkdData){
         const decentragram = web3.eth.Contract(Decentragram.abi, networkdData.address)
         this.setState({
            decentragram
         })
         const imagesCount = await decentragram.methods.imageCount().call()
         this.setState({ imagesCount})

         for (var i = 1; i <= imagesCount; i++){
            const image = await decentragram.methods.images(i).call()
            this.setState({
               images: [...this.state.images, image]
            })
         }

         this.setState({
            loading: false
         })
      }else{
         window.alert('Decentragram network had not been deployed contact the developers')
      }
   }

   captureFile = event =>{
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = ()=>{
         this.setState({
            buffer: Buffer(reader.result)
         })
         console.log('Buffer ', this.state.buffer)
      }
   }

   uploadImage = description =>{
      console.log('Submitting file to ipfs...')

      ipfs.add(this.state.buffer, (error, result)=>{
         console.log('Ipfs Result', result)
         if(error){
            console.error(error)
            return
         }

         this.setState({
            loading: true
         })
         this.state.decentragram.methods.uploadImage(result[0].hash, description).send({
            from: this.state.account
         })
         .on('transactionHash', _ =>{
            this.setState({
               loading: false
            })
         })
      })
   }

   constructor(props) {
      super(props)
      this.state = {
         account: '',
         decentragram: null,
         loading: true,
         images: []
      }
   }

   render() {
      return (
         <div>
            <Navbar account={this.state.account} />
            {this.state.loading
               ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
               : <Main
                  captureFile={this.captureFile}
                  uploadImage={this.uploadImage}
                  images={this.state.images}
               />
            }
         </div>
      );
   }
}

export default App;