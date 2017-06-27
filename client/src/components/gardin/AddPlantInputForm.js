import React from 'react'
import { PlantInput } from './PlantInput.js'
//set up add plant text boxes for Plant Name, Plant Water Schedule, Feed Date

export class AddPlantInputForm extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {value: "<---->"}

    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      //ADD LOGIC THAT CREATES NEW PLANT TIME WITH NAME ETC 
    this.state.value
    event.preventDefault();
    }

    render(){
      return(
        <div>
          <form onSubmit={this.handleSubmit} action="/addPlant" method="POST">
            Plant Name: 
            <PlantInput /> <br/>
            Plant Water Schedule:
            <PlantInput /> <br/>
            Plant Feed Schedule: 
            <PlantInput /> <br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
}
