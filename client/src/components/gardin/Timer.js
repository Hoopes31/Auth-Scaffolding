
export const daysToWater = (days) => {

  let difference = Number(7 - days)
  
  if (difference > 0 && difference != 1) {
    return (difference + ' days')
  }
  
  else if (difference == 1) {
    return ('Tomorrow')
  }
  
  else if (difference <= -1) {
    return(Math.abs(difference))
  }
  
  else {
    return('Today')
  }
}

