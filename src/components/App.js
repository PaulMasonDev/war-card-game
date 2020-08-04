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
        initializeDeck(){
          const {suits, values, deck } = this;
          for(let value of values.split(',')){
            for(let suit of suits){
              deck.push(value + suit);
            }
          } 
        },
        shuffle() {
          const { deck } = this;
          for(let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
          }
        },
        dealPlayers() {
          const { deck, playerDeck, computerDeck } = this;
          for(let i = 0; i < 26; i ++){
            let playerCard = deck.pop();
            playerDeck.push(playerCard);
            let computerCard = deck.pop();
            computerDeck.push(computerCard);
          }
        }
      }
    }
  }

  componentDidMount(){
    this.state.game.initializeDeck();
    // this.state.game.shuffle();
    // this.state.game.dealPlayers();
    console.log(this.state.game.deck[0]);
    console.log(this.state.game.deck);
    console.log(this.state.game.playerDeck);
    console.log(this.state.game.computerDeck);
  }

  render() {
    return(
      <div>
        <Card cardName="AD"/>
        <h1>{this.state.game.deck.length ? this.state.game.deck[0] : null}</h1>
      </div>
    );
  }
}

export default App;