import React, { Component } from 'react'
import Card from './Card';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      game: {
        deck: [],
        playerDeck: [],
        computerDeck: [],
        suits: ['H', 'D', 'S', 'C'],
        values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
        playerCurrentCard: '',
        computerCurrentCard: '',
      }
    }
  }

  initializeDeck = () => {
    const {suits, values,} = this.state.game;
    const localDeck = [];
    for(let value of values.split(',')){
      for(let suit of suits){
        localDeck.push(value + suit);
      }
    } 
    this.setState((prevState) => ({
      prevState,
      game: {...prevState.game, deck: [...prevState.game.deck, ...localDeck]}
    }));
  }

  shuffle() {
    const { deck } = this.state.game;
    const localShuffle = [...deck];
    for(let i = localShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [localShuffle[i], localShuffle[j]] = [localShuffle[j], localShuffle[i]];
      console.log(localShuffle);
    }
    
    this.setState((prevState) => ({
      prevState,
      game: {...prevState.game, deck: [...prevState.game.deck, ...localShuffle]}
    }));
  }

  dealPlayers() {
    const { deck } = this.state.game;
    const localPlayerDeck = [];
    const localComputerDeck = [];
    for(let i = 0; i < 26; i ++){
      let playerCard = deck.pop();
      localPlayerDeck.push(playerCard);
      let computerCard = deck.pop();
      localComputerDeck.push(computerCard);
    }
    this.setState((prevState)=> ({
      prevState,
      game: {...prevState.game, playerDeck: [...prevState.game.playerDeck, ...localPlayerDeck]},
    }));
    this.setState((prevState)=> ({
      prevState,
      game: {...prevState.game, computerDeck: [...prevState.game.computerDeck, ...localComputerDeck]},
    }));
  }

  componentDidMount(){
    this.initializeDeck();
    this.shuffle();
    // this.dealPlayers();
    console.log(this.state.game.playerDeck[0]);
    // console.log(this.state.game.deck);
    // console.log(this.state.game.playerDeck);
    // console.log(this.state.game.computerDeck);
    
  }

  render() {
    console.log(this.state.game.deck);
    console.log(this.state.game.playerDeck);
    console.log(this.state.game.computerDeck);
    
    return(
      <div>
        <Card cardName={this.state.game.deck[25]}/>
      </div>
    );
  }
}

export default App;