import React, { Component } from "react";
import PlayerHand from "./PlayerHand";
import ComputerHand from "./ComputerHand";

class GameBoard extends Component {
  static defaultProps = {
    suits: ["H", "D", "S", "C"],
    values: "2,3,4,5,6,7,8,9,0,J,Q,K,A",
  };

  constructor(props) {
    super(props);
    this.state = {
      game: {
        deck: [], // Initialized Deck
        playerDeck: [],
        computerDeck: [],
        tempDeck: [], // Used when there is a tie to hold the cards that the next winner will get.
      },
    };
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
    this.setState((prevState) => ({
      //Setting proper state with the temporary localDeck
      prevState,
      game: { ...prevState.game, deck: [...prevState.game.deck, ...localDeck] },
    }));
  };

  shuffle() {
    const { deck } = this.state.game;
    const localShuffle = [...deck];
    for (let i = localShuffle.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [localShuffle[i], localShuffle[j]] = [localShuffle[j], localShuffle[i]];
    }

    this.setState((prevState) => ({
      prevState,
      game: { ...prevState.game, deck: [...localShuffle] },
    }));
  }

  dealPlayers() {
    const { deck } = this.state.game;
    const localPlayerDeck = [];
    const localComputerDeck = [];
    for (let i = 0; i < 26; i++) {
      // Deals out all cards from deck and since shuffled, will be random cards in each deck.
      let playerCard = deck.pop(); // Draw from the deck
      localPlayerDeck.push(playerCard); // Deal to player
      let computerCard = deck.pop(); // Draw from the deck
      localComputerDeck.push(computerCard); //Deal to the Computer
    }
    this.setState((prevState) => ({
      ...prevState,
      game: {
        ...prevState.game,
        playerDeck: [...prevState.game.playerDeck, ...localPlayerDeck],
        computerDeck: [...prevState.game.computerDeck, ...localComputerDeck],
      },
    }));
  }

  async startGame() {
    await this.initializeDeck();
    await this.shuffle();
    this.dealPlayers();
    console.log(this.state.game.playerDeck[0]);
  }
  nextRound = () => {
    // Grab the first character of each card in order to compare values. Some modification must be done to the non-numeric values and to 10, since it uses 0.
    let player = this.state.game.playerDeck[0].slice(0, 1);
    let computer = this.state.game.computerDeck[0].slice(0, 1);
    if (typeof player === "string" || player === "0") {
      switch (player) {
        case "A":
          player = 14;
          break;
        case "J":
          player = 11;
          break;
        case "Q":
          player = 12;
          break;
        case "K":
          player = 13;
          break;
        case "0":
          player = 10;
          break;
        default:
          player = this.state.game.playerDeck[0].slice(0, 1);
      }
    }
    if (typeof computer === "string" || computer === "0") {
      switch (computer) {
        case "A":
          computer = 14;
          break;
        case "J":
          computer = 11;
          break;
        case "Q":
          computer = 12;
          break;
        case "K":
          computer = 13;
          break;
        case "0":
          computer = 10;
          break;
        default:
          computer = this.state.game.computerDeck[0].slice(0, 1);
      }
    }
    //Temporary Computer and Player Arrays copied from state, and will later be put into state.
    let tempCompDeck = [...this.state.game.computerDeck];
    let tempPlayerDeck = [...this.state.game.playerDeck];

    if (player > computer) {
      // If player has a higher value.
      const card = tempCompDeck.shift(); // Take the card from the computer
      tempPlayerDeck.push(card); // Put it into the player deck
      tempPlayerDeck.push(tempPlayerDeck.shift()); // Put your own card back into deck.
      if (this.state.game.tempDeck.length > 0) {
        // If there were the same values drawn.
        const tempDeck = [...this.state.game.tempDeck];
        // This portion is not altogether working correctly.  Current Issue: Even though the length might be 6, only half the cards are pushed to the player or computer.
        for (let i = 0; i < tempDeck.length; i++) {
          let card = tempDeck.shift();
          tempPlayerDeck.push(card);
        }
        tempPlayerDeck = [...tempPlayerDeck, ...tempDeck];
        this.setState((prevState) => ({
          prevState,
          game: { ...prevState.game, tempDeck: [] },
        }));
      }
    } else if (computer > player) {
      const card = tempPlayerDeck.shift();
      tempCompDeck.push(card);
      tempCompDeck.push(tempCompDeck.shift());
      if (this.state.game.tempDeck.length > 0) {
        const tempDeck = [...this.state.game.tempDeck];
        tempCompDeck = [...tempCompDeck, ...tempDeck];
        this.setState((prevState) => ({
          prevState,
          game: { ...prevState.game, tempDeck: [] },
        }));
      }
    } else if (player === computer) {
      // If values are the same.
      const tempDeck = [];
      const dealCards = (num) => {
        for (let i = 0; i < num; i++) {
          tempDeck.push(tempPlayerDeck.shift());
          tempDeck.push(tempCompDeck.shift());
        }
        this.setState((prevState) => ({
          prevState,
          game: {
            ...prevState.game,
            tempDeck: [...prevState.game.tempDeck, ...tempDeck],
          },
        }));
      };
      dealCards(3);
    }
    this.setState((prevState) => ({
      prevState,
      game: { ...prevState.game, playerDeck: [...tempPlayerDeck] },
    }));
    this.setState((prevState) => ({
      prevState,
      game: { ...prevState.game, computerDeck: [...tempCompDeck] },
    }));

    // console.log('TEMP Player:', tempPlayerDeck, 'TEMP Comp:', tempCompDeck)
    player > computer
      ? console.log("PLAYER WINS")
      : console.log("COMPUTER WINS");
    console.log("Player: ", player, "Computer: ", computer);
  };

  handleClick = () => {
    this.nextRound();
  };
  componentDidMount() {
    this.startGame();
  }

  render() {
    console.log("GAME DECK: ", this.state.game.deck);
    console.log("PLAYER DECK: ", this.state.game.playerDeck);
    console.log("COMPUTER DECK: ", this.state.game.computerDeck);
    console.log("TEMP DECK: ", this.state.game.tempDeck);

    const compData = this.state.game.computerDeck;
    const playerData = this.state.game.playerDeck;
    return (
      <div>
        <ComputerHand data={compData} />
        <PlayerHand data={playerData} />
        <button onClick={this.handleClick}>Next Round</button>
      </div>
    );
  }
}

export default GameBoard;
