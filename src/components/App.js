import React, { Component } from 'react'
import GameBoard from './GameBoard';

import './css/App.css';

class App extends Component {
  render(){
    return(
      <div>
        <GameBoard />
      </div>
    );
  }
}

export default App;