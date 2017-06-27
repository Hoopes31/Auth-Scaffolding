
export const cardStyle = (days) => {

  let difference = Number(7-days)
  var color 

  if (difference == 1) {
    //set color to yellow
    color = "#feff79"
    return color
  }

  else if (difference > 1) {
    //set color to green
    color = "#79ff7b"
    return color
  }

  else {
    //set color to red
    color = "#fb6e6e"
    return color
  }
}

