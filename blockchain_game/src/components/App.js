import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import MemoryToken from '../abis/MemoryToken.json'
import brain from '../brain.png'

const CARD_ARRAY = [
   {
      name: 'fries',
      img: '/images/fries.png'
   },
   {
      name: 'cheeseburger',
      img: '/images/cheeseburger.png'
   },
   {
      name: 'ice-cream',
      img: '/images/ice-cream.png'
   },
   {
      name: 'pizza',
      img: '/images/pizza.png'
   },
   {
      name: 'milkshake',
      img: '/images/milkshake.png'
   },
   {
      name: 'hotdog',
      img: '/images/hotdog.png'
   },
   {
      name: 'fries',
      img: '/images/fries.png'
   },
   {
      name: 'cheeseburger',
      img: '/images/cheeseburger.png'
   },
   {
      name: 'ice-cream',
      img: '/images/ice-cream.png'
   },
   {
      name: 'pizza',
      img: '/images/pizza.png'
   },
   {
      name: 'milkshake',
      img: '/images/milkshake.png'
   },
   {
      name: 'hotdog',
      img: '/images/hotdog.png'
   }
]


class App extends Component {

   async componentDidMount() {
      await this.loadWeb3()
      await this.loadBlockChainData()
      this.setState({
         cardArray: CARD_ARRAY.sort(()=> 0.5 - Math.random())
      })
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
         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask')
      }
   }

   async loadBlockChainData() {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({
         account: accounts[0]
      })

      const networkId = await web3.eth.net.getId()
      const networkData = MemoryToken.networks[networkId]

      if (networkData) {
         const abi = MemoryToken.abi
         const address = networkData.address
         const token = new web3.eth.Contract(abi, address)
         const totalSupply = await token.methods.totalSupply.call()
         this.setState({ token, totalSupply })

         let balanceOf = await token.methods.balanceOf(accounts[0]).call()
         for (let i = 0; i < balanceOf; i++) {
            let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
            let tokenURI = await token.methods.tokenURI(id).call()
            this.setState({
               tokenURIs: [...this.state.tokenURIs, tokenURI]
            })
         }
      } else {
         window.alert('Smart contract is not deployed to detected network')
      }
   }

   flipCard = async (cardId)=>{
      let alreadyChosen = this.state.cardsChosen.length
      this.setState({
         cardsChosen: [...this.state.cardsChosen, this.state.cardArray[cardId].name],
         cardsChosenId: [this.state.cardsChosenId, cardId]
      })

      if(alreadyChosen === 1){
         setTimeout(this.checkForMatch, 100)
      }
   }

   chooseImage = (cardId) =>{
      cardId = cardId.toString()
      if(this.state.cardsChosenId.includes(cardId)){
         return CARD_ARRAY[cardId].img
      }
      return window.location.origin + '/images/blank.png'
      // if(this.state.cardsWon.includes(cardId)){
      //    return window.location.origin + '/images/white.png'
      // }
      // else if(this.state.cardsChosenId.includes(cardId)){
      //    return CARD_ARRAY[cardId].img
      // }else{
      //    return window.location.origin + '/images/blank.png'
      // }
   }

   constructor(props) {
      super(props)
      this.state = {
         account: '0x0',
         token: null,
         totalSupply: 0,
         tokenURIs: [],
         cardArray: [],
         cardsChosen: [],
         cardsChosenId: [],
         cardsWon: []
      }
   }

   render() {
      return (
         <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
               <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <img src={brain} width="30" height="30" className="d-inline-block align-top" alt="" />
                  &nbsp; Memory Tokens
               </a>
               <ul className="navbar-nav px-3">
                  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                     <small className="text-muted"><span id="account">{this.state.account}</span></small>
                  </li>
               </ul>
            </nav>
            <div className="container-fluid mt-5">
               <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                     <div className="content mr-auto ml-auto">
                        <h1 className="d-4">Edit this file in App.js!</h1>

                        <div className="grid mb-4" >

                           {this.state.cardArray.map((card, key)=>{
                              return (
                                 <img 
                                    src={this.chooseImage(key)} 
                                    data-id={key}
                                    key={key}
                                    alt=""
                                    onClick={event=>{
                                       const cardId = event.target.getAttribute('data-id')
                                       if(!this.state.cardsWon.includes(cardId.toString())){
                                          this.flipCard(cardId)
                                       }
                                    }} 
                                 />
                              )
                           })}

                        </div>

                        <div>

                           {/* Code goes here... */}

                           <div className="grid mb-4" >

                              {/* Code goes here... */}

                           </div>

                        </div>

                     </div>

                  </main>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
