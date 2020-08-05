import React, { Component } from 'react'
import Card from './Card';

import './css/PlayerHand.css';

class PlayerHand extends Component {
  render(){
    return(
      <div className="PlayerHand">
        <h1>PLAYER has {this.props.data.length} cards left.</h1>
        <Card cardName={this.props.data}/>
      </div>
    );
  }
}

export default PlayerHand;