let fs = require('fs')
let input = fs.readFileSync('input','utf-8')

input = input.split('\n').filter((el)=>el!=='').map((pair)=>pair.split(', '))

let maxDist = 10000
let size = 500
let grid = new Array(size).fill(-1)
for(let i = 0; i < size; i++){
  grid[i] = new Array(size).fill(-1)
}

function manhDist(a, b){
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    let point = {x:i, y:j}
    minDist = 0

    input.forEach((coord, index)=>{
      let pCoord = {x:coord[0],y:coord[1]}
      let dist = manhDist(point, pCoord)
      minDist += dist
    })
    if(minDist < maxDist)
      grid[i][j] = 1
  }
}

let safeAreas=0
grid.forEach((row)=>{
  row.forEach((cell)=>{
    if(cell === 1)
      safeAreas += 1
  })
})

console.log(safeAreas)
