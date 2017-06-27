import React from 'react'

export class DeleteButton extends React.Component {
  render(){
    return(
      <button onClick={() => alert('Plant Deleted')}>Delete</button>
    )
  }
}
