import React, { Component } from 'react'
import Card from './Card';

import './css/ComputerHand.css';

class ComputerHand extends Component {
  render(){
    return(
      <div className="ComputerHand">
        <h1>COMPUTER has {this.props.data.length} cards left.</h1>
        <Card cardName={this.props.data}/>
      </div>
    );
  }
}

export default ComputerHand;