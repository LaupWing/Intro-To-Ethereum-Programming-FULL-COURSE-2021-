import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
   host: 'ipfs.infura.io',
   port: 5001,
   protocol: 'https'
})

class App extends Component {

   async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
   }

   async loadWeb3() {
      if(window.ethereum){
         window.web3 = new Web3(window.ethereum)
         await window.ethereum.enable()
      }
      else if(window.web3){
         window.web3 = new Web3(window.web3.currentProvider)
      }else{
         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
   }

   async loadBlockchainData() {
      const web3 = window.web3
      
      const accounts = await web3.eth.getAccounts()
      this.setState({account: accounts[0]})

      const networkId = await web3.eth.net.getId()
      const networkData = DStorage.networks[networkId]
      if(networkData){
         const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
         this.setState({
            dstorage
         })
         const fileCount = await dstorage.methods.fileCount().call()
         this.setState({fileCount})
         for(var i = fileCount;  i >= 1; i++){
            const file = await dstorage.methods.files(i).call()
            this.setState({
               files: [...this.state.files, file]
            })
         }
      }else{
         window.alert('DStorage contract not deployed to detected network.')
      }
      this.setState({
         loading: false
      })
   }

   // Get file from user
   captureFile = event => {
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()

      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
         this.setState({
            buffer: Buffer(reader.result),
            type: file.type,
            name: file.name
         })
      }
   }


   //Upload File
   uploadFile = description => {

      //Add file to the IPFS

      //Check If error
      //Return error

      //Set state to loading

      //Assign value for the file without extension

      //Call smart contract uploadFile function 

   }

   //Set states
   constructor(props) {
      super(props)
      this.state = {
         loading: true,
         account: '',
         dstorage: null,
         files: [],
         type: null,
         name: null
      }

      //Bind functions
   }

   render() {
      return (
         <div>
            <Navbar account={this.state.account} />
            {this.state.loading
               ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
               : <Main
                  files={this.state.files}
                  captureFile={this.captureFile}
                  uploadFile={this.uploadFile}
               />
            }
         </div>
      );
   }
}

export default App;