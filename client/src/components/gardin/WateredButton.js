import React from 'react'

/* create a button that saves the current date to the server
   this button should also reset the CSS box coloring to green
*/

export class WateredButton extends React.Component {

  render() {
    return (
      <button onClick={() => alert(Date.now())}>Just Watered</button>
    )
  } 
  //save date to local storage 
  saveWatered() {
    
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('water_date', Date.now());
    }
    else {
      document.getElementById('.error').innerHTML = 'Sorry your browser does not support this feature.'
    }
  }
}
