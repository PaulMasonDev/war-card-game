import React, { Component } from 'react'
import PlayerHand from './PlayerHand';
import ComputerHand from './ComputerHand';

class GameBoard extends Component {
  static defaultProps = {
    suits: ['H', 'D', 'S', 'C'],
    values: '2,3,4,5,6,7,8,9,0,J,Q,K,A',
  }
  
  constructor(props){
    super(props);
    this.state = {
      game: {
        deck: [],
        playerDeck: [],
        computerDeck: [],
        winner: null
      }
    }
  }

  initializeDeck = () => {
    const {suits, values,} = this.props;
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
    }
    
    this.setState((prevState) => ({
      prevState,
      game: {...prevState.game, deck: [...localShuffle]}
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

  async startGame() {
    await this.initializeDeck();
    await this.shuffle();
    this.dealPlayers();
    console.log(this.state.game.playerDeck[0]);
  }
  nextRound = () => {
    let player = this.state.game.playerDeck[0].slice(0, 1);
    let computer = this.state.game.computerDeck[0].slice(0, 1);
    if(typeof player === 'string' || player === '0'){
      switch(player){
        case 'A':
          player = 14;
          break;
        case 'J':
          player = 11;
          break;
        case 'Q':
          player = 12;
          break;
        case 'K':
          player = 13;
          break;
        case '0':
          player = 10;
          break;
        default:
          player = this.state.game.playerDeck[0].slice(0, 1);
      }
    }
    if(typeof computer === 'string' || computer === '0'){
      switch(computer){
        case 'A':
          computer = 14;
          break;
        case 'J':
          computer = 11;
          break;
        case 'Q':
          computer = 12;
          break;
        case 'K':
          computer = 13;
          break;
        case '0':
          computer = 10;
          break;
        default:
          computer = this.state.game.computerDeck[0].slice(0, 1);
      }
    }

    const tempCompDeck = [...this.state.game.computerDeck];
    const tempPlayerDeck = [...this.state.game.playerDeck];

    if(player > computer){
      const card = tempCompDeck.shift();
      tempPlayerDeck.push(card);
      tempPlayerDeck.push(tempPlayerDeck.shift());
    } else if(computer > player){
      const card = tempPlayerDeck.shift();
      tempCompDeck.push(card);
      tempCompDeck.push(tempCompDeck.shift());
    } else if(player === computer){
      console.log('EQUALS');

    }
    this.setState((prevState)=> ({
      prevState,
      game: {...prevState.game, playerDeck: [ ...tempPlayerDeck]},
    }));
    this.setState((prevState)=> ({
      prevState,
      game: {...prevState.game, computerDeck: [...tempCompDeck]},
    }));

    // console.log('TEMP Player:', tempPlayerDeck, 'TEMP Comp:', tempCompDeck)
    player > computer ? console.log('PLAYER WINS') : console.log('COMPUTER WINS')
    console.log("Player: ", player, "Computer: ", computer);
    
  }

  handleClick = () =>{
    this.nextRound();
  }
  componentDidMount(){
    this.startGame();
  }
 
  render(){
    console.log('GAME DECK: ', this.state.game.deck);
    console.log('PLAYER DECK: ',this.state.game.playerDeck);
    console.log('COMPUTER DECK: ',this.state.game.computerDeck);

    const compData = this.state.game.computerDeck;
    const playerData = this.state.game.playerDeck;
    return(
      <div>
        <ComputerHand 
        data={compData}
        />
        <PlayerHand 
        data={playerData}
        />
        <button onClick={this.handleClick}>Next Round</button>
      </div>
    );
  }
}

export default GameBoard;