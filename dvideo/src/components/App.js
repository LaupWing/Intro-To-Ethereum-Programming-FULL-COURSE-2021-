import React, { Component } from 'react';
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

   async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
   }

   async loadWeb3() {
      if (window.ethereum) {
         window.web3 = new Web3(window.ethereum)
         await window.ethereum.enable()
      }
      else if (window.web3) {
         window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
   }

   async loadBlockchainData() {
      const web3 = window.web3
      //Load accounts
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      //Add first account the the state
      this.setState({
         account: accounts[0]
      })
      //Get network ID
      //Get network data
      const networkId = await web3.eth.net.getId()
      const networkData = DVideo.networks[networkId]
      //Check if net data exists, then
      //Assign dvideo contract to a variable
      //Add dvideo to the state
      if(networkData){
         const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
         this.setState({
            dvideo
         })
         //Check videoAmounts
         const videosCount = await dvideo.methods.videoCount().call()
         //Add videAmounts to the state
         this.setState({videosCount})

         //Iterate throught videos and add them to the state (by newest)
         for(var i=videosCount; i>=1; i++){
            const video = await dvideo.methods.videos(i).call()
            this.setState({
               videos: [this.state.videos, video]
            })
         }
         
         //Set latest video and it's title to view as default 
         const latest = await dvideo.methods.videos(videosCount).call()
         this.setState({
            currentHash: latest.hash,
            currentTitle: latest.title
         })
         //Set loading state to false
         this.setState({
            loading: false
         })
      }else{
         //If network data doesn't exisits, log error
         window.alert('DVideo contract not deployed to detected network.')
      }
   }

   //Get video
   captureFile = event => {
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = () =>{
         this.setState({buffer: Buffer(reader.result)})
         console.log('buffer', this.state.buffer)
      }
   }

   //Upload video
   uploadVideo = title => {
      ipfs.add(this.state.buffer, (err, res)=>{
         if(error){
            console.error(err)
            return
         }
         this.setState({loading: true})
         this.state.dvideo.methods
            .uploadVideo(result[0].hash, title).send({from: this.state.account})
            .on('transactionHash', _=>this.setState({loading: false}))
      })
   }

   //Change Video
   changeVideo = (hash, title) => {

   }

   constructor(props) {
      super(props)
      this.state = {
         loading: false,
         account: '',
         dvideo: null,
         videos: [],
         loading: true,
         currentHash: null,
         currentTitle: null
         //set states
      }

      //Bind functions
   }

   render() {
      return (
         <div>
            <Navbar
               account={this.state.account}
            />
            {this.state.loading
               ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
               : <Main
                  videos={this.state.videos}
                  captureFile={this.captureFile}
                  uploadVideo={this.uploadVideo}
                  currentHash={this.currentHash}
                  currentTitle={this.currentTitle}
               //states&functions
               />
            }
         </div>
      );
   }
}

export default App;