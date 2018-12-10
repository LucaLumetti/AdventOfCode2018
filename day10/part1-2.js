let fs = require('fs')
let input = fs.readFileSync('input','utf-8').trim().split('\n')

let size = 100
let map = {}

input.forEach((s,i)=>{
  map[i] = {}
  let regex = /<[\ ]*([\-]?\d+)\,[\ ]*([\-]?\d+)>/g
  let m = regex.exec(s).map(Number)
  map[i].p = {x: m[1], y: m[2]}
  regex.lastIndex++
  m = regex.exec(s).map(Number)
  map[i].v = {x: m[1], y: m[2]}
})


function goodMap(map){
  let minx = Infinity
  let miny= Infinity
  let maxx = -Infinity
  let maxy = -Infinity
  Object.keys(map).forEach(key=>{
    if(map[key].p.x > maxx)
      maxx = map[key].p.x
    if(map[key].p.y > maxy)
      maxy = map[key].p.y
    if(map[key].p.x < minx)
      minx = map[key].p.x
    if(map[key].p.y < miny)
      miny = map[key].p.y
  })


  Object.keys(map).forEach(key=>{
    map[key].p.x += -minx
    map[key].p.y += -miny
  })

  maxx += -minx+1
  maxy += -miny+1
  minx += -minx
  miny += -miny

  return {map: map, minx: minx, miny: miny, maxx: maxx, maxy: maxy}
}

function tick(map){
  Object.keys(map).forEach(key=>{
    map[key].p.x += map[key].v.x
    map[key].p.y += map[key].v.y
  })
  return map
}

function has(map, point){
  let st = false
  Object.keys(map).forEach(key=>{
    if(map[key].p.x === point.x && map[key].p.y === point.y)
      st = true
  })
  return st
}

function print(map, minx, miny, maxx, maxy){
  for(let i = minx; i < maxx; i++){
    let line = ''
    for(let j = miny; j < maxy; j++){
      if(has(map, {x: i, y: j}))
        line += '#'
      else
        line += '.'
    }
    console.log(line)
  }
}

for(let i = 1; true; i++){
  let minx, miny, maxx, maxy
  map = tick(map)
  let gMap = goodMap(map)
  map = gMap.map
  maxx = gMap.maxx
  maxy = gMap.maxy
  if(maxy > 10) continue
  
  print(map, 0, 0, maxx, maxy)
  console.log(i)
  return
}
