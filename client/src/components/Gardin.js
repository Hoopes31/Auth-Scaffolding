import React from 'react'
import { render } from 'react-dom'
import { PlantTimer } from './gardin/PlantTimer'
import { AddPlant } from './gardin/AddPlant.js'
import { AddPlantInputForm } from './gardin/AddPlantInputForm.js'
window.React = React

class Gardin extends React.Component {
  render(){
    return(
      <div>
        <PlantTimer days={4} plant='Orchid'/>
        <PlantTimer days={1} plant='ZZ'/>
        <br/>
<br/>
<br/>
        <AddPlantInputForm />
      </div>
    )
  }
}

export default Gardin