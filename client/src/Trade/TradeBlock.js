import React, { Component } from 'react'
import {Col, Panel, Glyphicon, Well} from 'react-bootstrap';

class TraderBlock extends Component {

    render(){
        return(<Col xs={10} xsOffset={1} md={6} mdOffset={0} className="trade-block">
        <Well>
        <h2 className={`text-center ${this.props.trader.name}`}>{this.props.trader.name} | {parseFloat(this.props.trader.totalValue).toFixed(2)} </h2>
        
            {this.props.trader.cards.map((card) => {
                return <CardPanel key={card.name} card={card} trader={this.props.trader} removeCard={this.props.removeCard}/>
            })}
        </Well>
        </Col>)
    }

}

class CardPanel extends Component{
    constructor(){
        super()
        this.state = {
            panelOpen: false
        }
        this.buidCardTitle = this.buidCardTitle.bind(this)
    }
    buidCardTitle(){
        return(<div>
            <h4>{this.props.card.name} | Price Avg: {parseFloat(this.props.card.price).toFixed(2)} </h4> 
            <Glyphicon glyph={`arrow-${this.props.card.trending}`} /> 
            <Glyphicon glyph="remove" onClick={this.props.removeCard} type={this.props.card.name} id={this.props.trader.name} className="pull-right"/>  
        </div>)
    }
    componentWillMount(){
        this.buidCardTitle()
    }
    componentDidMount(){
        this.buidCardTitle()
    }
    toggleCardInfo(){
        this.setState({panelOpen: !this.state.panelOpen})
    }
    render(){
        return(<div>
            <Panel header={this.buidCardTitle ? this.buidCardTitle() : this.props.card.name} onClick={this.toggleCardInfo.bind(this)}>
                 {this.state.panelOpen ? <CardInfo/>: null}
            </Panel>
        </div>)
    }
}
class CardInfo extends Component{
    render(){
    return(<div>
        <h6>Card info here.</h6>
    </div>)
    }
}

export default TraderBlock