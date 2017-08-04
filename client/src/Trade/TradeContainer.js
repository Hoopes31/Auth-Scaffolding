import React, { Component } from 'react'
import {Col, Row, Well, Button, ButtonGroup} from 'react-bootstrap'
import Trader from './Trader'
import Card from './Card'
import TradeBlock from './TradeBlock'
import CardSearch from '../CardSearch/CardSearch'

class TraderPage extends Component {
    constructor(){
        super()
        this.state = {
            blue: new Trader('blue'), 
            red : new Trader('red'),
            cardSearchValue: ''
        }
        this.addCard = this.addCard.bind(this)
        this.removeCard = this.removeCard.bind(this)
    }
    onCardSearchChange = (event, { newValue, method }) => {
      this.setState({
        cardSearchValue: newValue
      })
    }
  
    componentDidMount(){
        this.updatePrices()
    }
    updatePrices(){
        this.setState({blue: Object.assign(this.state.blue, 
            {totalValue: this.calculateValue(this.state.blue)}
        )})
        this.setState({red: Object.assign(this.state.red, 
            {totalValue: this.calculateValue(this.state.red)}
        )})
    }
    calculateValue(trader){
        return trader.cards.reduce((total,card) => {
            return total + parseFloat(card.price)
        }, 0)
    }
    addCard(event){
        
        let cardName = event.target.name ? event.target.name : this.state.cardSearchValue
        let traderName = event.target.id
        let newCardList = this.state[traderName].cards

        newCardList.push(new Card(cardName))
        if (traderName === 'blue'){
            this.setState({blue: Object.assign(this.state[traderName], {cards: newCardList} )})
        }else if(traderName === 'red'){
            this.setState({red: Object.assign(this.state[traderName], {cards: newCardList} )})
        } 
        this.setState({
            cardSearchValue: ''
        })
        this.updatePrices()
    }
    removeCard(event){
        
        let cardName = event.target.name
        let traderName = event.target.id
        console.log(event.target.name)
        let newCardList = this.state[traderName].cards.filter((card) => {
            // console.log('card.name' + card.name)
            // console.log('cardName' + cardName)
            return card.name !== cardName
        })
        if (traderName === 'blue'){
            this.setState({blue: Object.assign(this.state[traderName], {cards: newCardList} )})
        }else if(traderName === 'red'){
            this.setState({red: Object.assign(this.state[traderName], {cards: newCardList} )})
        } 
        this.setState({
            cardSearchValue: ''
        })
        this.updatePrices()
    }
    render(){
        return(<Row className="trade-container">
                <Col md={10} mdOffset={1} xs={12}>
                    <Well className="input-well">
                        <Col xs={7} md={10} >
                            <CardSearch addCard={this.addCard.bind(this)} value={this.state.cardSearchValue} onChange={this.onCardSearchChange}/>
                        </Col>
                        <Col xs={5} md={2}>
                            <ButtonGroup className="pull-right">
                                <Button bsStyle="primary" onClick={this.addCard} id="blue">Blue</Button> 
                                <Button bsStyle="danger" onClick={this.addCard}  id="red">Red</Button>
                            </ButtonGroup>   
                        </Col>
                        
                    </Well>
                </Col>

                <TradeBlock trader={this.state.blue} removeCard={this.removeCard}/>
                <TradeBlock trader={this.state.red} removeCard={this.removeCard}/>
        </Row>)
    }
}

export default TraderPage