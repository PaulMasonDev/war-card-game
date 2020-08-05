import React, { Component } from "react";
import PlayerHand from "./PlayerHand";
import ComputerHand from "./ComputerHand";

import './css/GameBoard.css';

class GameBoard extends Component {
  static defaultProps = {
    suits: ["H", "D", "S", "C"],
    values: "2,3,4,5,6,7,8,9,0,J,Q,K,A",
  };

  constructor(props) {
    super(props);
    this.state = {
        deck: [], // Initialized Deck
        playerDeck: [],
        computerDeck: [],
        tempDeck: [], // Used when there is a tie to hold the cards that the next winner will get.
        winner: null,
        message: 'Welcome to the game of WAR!',
        cardMessage: ''
    };
  }

  // Deck update function
  deckUpdate = (tempDeck, stateDeck = 'deck', fresh) => {
    this.setState((prevState) => ({
      prevState,
      [stateDeck]: [...(fresh ? [] : prevState[stateDeck]), ...tempDeck],
    }));
  }

  initializeDeck = () => {
    // Initialize deck based upon default props.
    const { suits, values } = this.props;
    const localDeck = [];
    for (let value of values.split(",")) {
      for (let suit of suits) {
        localDeck.push(value + suit);
      }
    }
    this.deckUpdate(localDeck);
  };

  shuffle() {
    const { deck } = this.state;
    const localShuffle = [...deck];
    for (let i = localShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [localShuffle[i], localShuffle[j]] = [localShuffle[j], localShuffle[i]];
    }
    this.deckUpdate(localShuffle, 'deck', true);
  }

  dealPlayers() {
    const { deck } = this.state;
    const localPlayerDeck = [];
    const localComputerDeck = [];
    for (let i = 0; i < 26; i++) {
      // Deals out all cards from deck and since shuffled, will be random cards in each deck.
      function deal(dealDeck){
        dealDeck.push(deck.pop()); // Draw from the deck and deal to player/comp.
      }
      deal(localPlayerDeck);
      deal(localComputerDeck);
    }
    this.deckUpdate(localPlayerDeck, 'playerDeck');
    this.deckUpdate(localComputerDeck, 'computerDeck');
  }

  nextRound = () => {
    // Grab the first character of each card in order to eventually compare values. Some modification must be done to the non-numeric values and to 10, since 10 uses 0 when referencing the image.
    let player = this.state.playerDeck[0].slice(0, 1);
    let computer = this.state.computerDeck[0].slice(0, 1);
    if (typeof player === "string" || player === "0") {
      player = player === "A" ? 14 
        : player === "J" ? 11 
        : player === "Q" ? 12 
        : player === "K" ? 13 
        : player === "0" ? 10
        : player;
    }
    if (typeof computer === "string" || computer === "0") {
      computer = computer === "A" ? 14 
        : computer === "J" ? 11 
        : computer === "Q" ? 12 
        : computer === "K" ? 13 
        : computer === "0" ? 10
        : computer;
    }
    //Temporary Computer and Player Arrays copied from state, and will later be put into state.
    let tempCompDeck = [...this.state.computerDeck];
    let tempPlayerDeck = [...this.state.playerDeck];

    if (player > computer) {
      this.setState({message: `PLAYER won computer's card.`,
      cardMessage: ''
    });
      // If player has a higher value.
      const card = tempCompDeck.shift(); // Take the card from the computer
      tempPlayerDeck.push(card); // Put it into the player deck
      tempPlayerDeck.push(tempPlayerDeck.shift()); // Put your own card back into deck.
      if (this.state.tempDeck.length > 0) {
        // If there were the same values drawn.
        const tempDeck = [...this.state.tempDeck];
        tempPlayerDeck = [...tempPlayerDeck, ...tempDeck];
        this.deckUpdate([], 'tempDeck', true);
      }
    } else if (computer > player) {
      this.setState({
        message: `COMPUTER won player's card.`,
        cardMessage: ''
      });
      const card = tempPlayerDeck.shift(); // Take the card from the player.
      tempCompDeck.push(card); // Put it into the computer deck.
      tempCompDeck.push(tempCompDeck.shift()); // Put your own card back into deck.
      if (this.state.tempDeck.length > 0) {
        // If there were the same values drawn.
        const tempDeck = [...this.state.tempDeck];
        tempCompDeck = [...tempCompDeck, ...tempDeck];
        this.deckUpdate([], 'tempDeck', true);
      }
    } else if (player === computer) {
      this.setState({
        message: `It's time for a WAR!!!!!`,
        cardMessage: 'Three cards from each player are on the line!'});
      // If values are the same.
      const tempDeck = [];
      const dealCards = (num) => {
        for (let i = 0; i < num; i++) {
          tempDeck.push(tempPlayerDeck.shift());
          tempDeck.push(tempCompDeck.shift());
        }
        this.deckUpdate(tempDeck, 'tempDeck');
      };
      dealCards(3);
    }
    this.deckUpdate(tempPlayerDeck, 'playerDeck', true);
    this.deckUpdate(tempCompDeck, 'computerDeck', true);

    player > computer
      ? this.setState({winner: 'player'})
      : this.setState({winner: 'computer'});
    console.log("Player: ", player, "Computer: ", computer);
  };

  handleClick = () => {
    this.nextRound();
  };

  async startGame() {
    await this.initializeDeck();
    await this.shuffle();
    this.dealPlayers();
    console.log(this.state.playerDeck[0]);
  }

  componentDidMount() {
    this.startGame();
  }

  render() {
    console.log("GAME DECK: ", this.state.deck);
    console.log("PLAYER DECK: ", this.state.playerDeck);
    console.log("COMPUTER DECK: ", this.state.computerDeck);
    console.log("TEMP DECK: ", this.state.tempDeck);
    console.log(this.state.winner);
  
    return (
      <div className="GameBoard">
        <h1>{this.state.message}</h1>
        <h3 className="GameBoard-header">{this.state.cardMessage}</h3>
        <ComputerHand data={this.state.computerDeck} />
        <PlayerHand data={this.state.playerDeck} />
        <button onClick={this.handleClick}>Next Round</button>
      </div>
    );
  }
}

export default GameBoard;