let fs = require('fs')
let input = 9005

function cellPow(serial, x, y){
  let rackId = x+10
  let powerLevel = (rackId*y+serial)*rackId
  powerLevel = powerLevel%1000
  powerLevel -= (powerLevel%100)
  powerLevel /= 100
  powerLevel -= 5
  return powerLevel
}

let max = {
  x: 0,
  y: 0,
  size: 0,
  sum: -Infinity
}

for (let y = 1; y <= 300; y += 1) {
  for (let x = 1; x <= 300; x += 1) {
    let maxSize = Math.min(301 - x, 301 - y);
    let totSum = 0;
    for (let s = 0; s < maxSize; s += 1) {
      for (let dx = 0; dx < s; dx += 1) {
        totSum += cellPow(input, x + dx, y + s);
      }
      for (let dy = 0; dy < s; dy += 1) {
        totSum += cellPow(input, x + s, y + dy);
      }
      totSum += cellPow(input, x + s, y + s);
      if (totSum > max.sum) {
        max.sum = totSum;
        max.x = x
        max.y = y
        max.size = s+1
      }
    }
  }
}
console.log(max)
