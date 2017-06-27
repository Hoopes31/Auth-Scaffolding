import React from 'react'
import {daysToWater} from './Timer'
import {WateredButton} from './WateredButton'
import {cardStyle} from './CardColor'
import {DeleteButton} from './DeleteButton'
/* reusable plant component for displaying a single plant & its needs:
   waterDate
   feedDate
   
   Create JSON Object with Plant Name, Feeding Schedule and Description
*/

export class PlantTimer extends React.Component {
  render(){
    var container = {
      padding:10,
      margin:10,
      maxWidth:100,
      backgroundColor: cardStyle(this.props.days),
      color: "#333",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: 8,
      textAlign: "center",
      borderRadius: 8 
    }
  
    return (
    <div style={container}>
      <h1>{this.props.plant} Plant</h1>
      <h2>{daysToWater(this.props.days)}</h2>
      //Feed Date Needed
      <h1>Feed Date:</h1>
      <WateredButton />
      <DeleteButton />
    </div>
     )
  }
}
