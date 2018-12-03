let fs = require('fs')
let input = fs.readFileSync('input','utf-8')
input = input.split('\n')
input.pop()

let fullFabric = new Array(1000)
for(let i = 0; i < 1000; i++){
  fullFabric[i] = new Array(1000)
}

let regex = /#([0-9]+)\ @\ ([0-9]+),([0-9]+):\ ([0-9]+)x([0-9]+)/g

let m
while ((m = regex.exec(input)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  let fabric = {
    id: Number(m[1]),
    x: Number(m[2]),
    y: Number(m[3]),
    width: Number(m[4]),
    height: Number(m[5])
  }

  for(let i = fabric.x; i < fabric.x+fabric.width; i++){
    for(let j = fabric.y; j < fabric.y+fabric.height; j++){
      if(!fullFabric[i][j]) fullFabric[i][j] = []
      fullFabric[i][j].push(fabric.id)
    }
  }
}

let twoOrMore = 0
for(let i = 0; i < 1000; i++){
  for(let j = 0; j < 1000; j++){
    if(fullFabric[i][j] && fullFabric[i][j].length > 1){
      twoOrMore++
    }
  }
}

console.log('Part1:' + twoOrMore)

for(let id = 1; id < 1357; id++){
  let overlap = 0
  for(let i = 0; i < 1000; i++){
    for(let j = 0; j < 1000; j++){
      if(fullFabric[i][j] !== undefined &&
         fullFabric[i][j].indexOf(id) > -1 &&
        fullFabric[i][j].length > 1){
        overlap = 1
        i = 1000
        break
      }
    }
  }
  if(!overlap)
    console.log('Part2: ' + id)
}
