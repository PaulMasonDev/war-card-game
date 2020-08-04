import React, { Component } from 'react'

class Card extends Component {
  render(){
    let url = 'https://deckofcardsapi.com/static/img/';
    return(
      <div className="Card">
        <img src ={url + this.props.cardName + '.png'} alt={this.props.cardName}/>
      </div>
    );
  }
}

export default Card;