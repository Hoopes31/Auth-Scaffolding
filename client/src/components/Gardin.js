import React from 'react'
import { render } from 'react-dom'
import { PlantTimer } from './gardin/PlantTimer'
import { AddPlant } from './gardin/AddPlant.js'
import { AddPlantInputForm } from './gardin/AddPlantInputForm.js'
import { Link } from 'react-router-dom'

class Gardin extends React.Component {
  render(){
    return(
      <div>
        <Link to='/login'>Logout</Link> 
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