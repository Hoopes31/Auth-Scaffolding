import Autosuggest from 'react-autosuggest'
import React, { Component } from 'react'
import allCards from '../json/allCardNames.json'
import {Button, ButtonGroup} from 'react-bootstrap'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim())
  
  if (escapedValue === '') {
    return []
  }

  const regex = new RegExp('^' + escapedValue, 'i')

  return allCards.data.filter(card => regex.test(card))
}

function getSuggestionValue(suggestion) {
  return suggestion
}


class CardSearch extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      suggestions: []
    } 
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }
  renderSuggestion(suggestion) {
    return (
      <div>
        <span className="align-middle">{suggestion}</span>
        <ButtonGroup className="pull-right">
          <Button bsStyle="primary" onClick={this.props.addCard} name={suggestion} id="blue">Blue</Button> 
          <Button bsStyle="danger"  onClick={this.props.addCard} name={suggestion} id="red">Red</Button>
        </ButtonGroup>  
      </div>

    )
  }

  onSuggestionsFetchRequested = ({ value }) => {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.setState({
        suggestions: getSuggestions(this.props.value)
      })
    }, 400)

  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }
  componentWillUnmount(){
    clearTimeout(this.debounce)
  }
  render() {
    const { suggestions } = this.state
    const inputProps = {
      placeholder: "Enter a card name",
      value: this.props.value,
      onChange: this.props.onChange,
      className: "form-control"
    }

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
    )
  }
}

export default CardSearch