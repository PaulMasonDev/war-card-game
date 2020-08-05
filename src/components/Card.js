import React, { Component } from 'react'

import './css/Card.css';
class Card extends Component {
  render(){
    let url = 'https://deckofcardsapi.com/static/img/';
    return(
      <div className="Card">
        <img src ={url + this.props.cardName[0] + '.png'} alt={this.props.cardName}/>
      </div>
    );
  }
}

export default Card;