let fs = require('fs')
let input = fs.readFileSync('input','utf-8')

input = input.split('\n').filter((el)=>el!=='').map((pair)=>pair.split(', '))

let size = 500
let areas = new Array(input.length).fill(0)
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
    let min = {
      dist: Infinity,
      element: -1
    }

    input.forEach((coord, index)=>{
      let pCoord = {x:coord[0],y:coord[1]}
      let dist = manhDist(point, pCoord)
      if(dist < min.dist){
        min.dist = dist
        min.element = index
      }
    })
    input.forEach((coord, index)=>{
      let pCoord = {x:coord[0],y:coord[1]}
      let dist = manhDist(point, pCoord)
      if(dist === min.dist && min.element != index){
        min.dist = -1
        min.element = -1
      }
    })
    grid[i][j] = min.element
  }
}

grid.forEach((row)=>{
  row.forEach((cell)=>{
    areas[cell] +=1
  })
})

//check for infinitely large area

let bounds = [-1, size+1]
bounds.forEach((kk)=>{
  for(let i = -1; i < size+1; i++){
    let point = {x: kk, y:i}
    let min = {
      dist: Infinity,
      element: -1
    }
    input.forEach((coord, index)=>{
      let pCoord = {x:coord[0],y:coord[1]}
      let dist = manhDist(point, pCoord)
      if(dist < min.dist){
        min.dist = dist
        min.element = index
      }
    })

    areas[min.element] = -Infinity
  }
})

bounds.forEach((kk)=>{
  for(let i = -1; i < size+1; i++){
    let point = {y: kk, x:i}
    let min = {
      dist: Infinity,
      element: -1
    }
    input.forEach((coord, index)=>{
      let pCoord = {x:coord[0],y:coord[1]}
      let dist = manhDist(point, pCoord)
      if(dist < min.dist){
        min.dist = dist
        min.element = index
      }
    })

    areas[min.element] = -Infinity
  }
})
//--------------------

areas = areas.filter(n=>!isNaN(n))
areas = areas.filter(n=>n!==-Infinity)
console.log(Math.max.apply(null, areas))
