import React from 'react'

export class PlantInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: "default"}

    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render(){
      return(
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
      )
    }
}


