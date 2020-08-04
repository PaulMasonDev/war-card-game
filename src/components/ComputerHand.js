import React, { Component } from 'react'
import Card from './Card';

class ComputerHand extends Component {
  render(){
    return(
      <div>
        <h1>COMPUTER has {this.props.data.length} cards left.</h1>
        <Card cardName={this.props.data}/>
      </div>
    );
  }
}

export default ComputerHand;