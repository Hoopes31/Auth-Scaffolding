import React from 'react'
import { AddPlantButton } from './AddPlantButton'
import { PlantTimer } from './PlantTimer'

//set up an add button with drop down menu for plants
//plant selection comes from JSON objects within database

export class AddPlant extends React.Component {
  constructor(props) {
   super(props);
   this.state = {value: "default"};
   
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // ADD TO PLANTCOMPONENT TO APP HERE
    this.state.value
    event.preventDefault();
  }

  render(){
    return(
      <div>
      <form onSubmit={this.handleSubmit} action="/addPlant" method="POST">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="default">--select--</option>
          <option value="test">test</option>
          <option value="test2">test2</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}


