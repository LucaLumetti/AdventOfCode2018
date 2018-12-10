let fs = require('fs')
let input = fs.readFileSync('test','utf-8').trim().split(' ').map(Number)


function readTree(i){
  let ch = Number(input[i])
  i+=1
  let md = Number(input[i])
  i+=1
  let n = {
    child: ch,
    data: []
  }
  if(ch === 0){
    for(let j = 0; j < md; j++){
      n.data.push(input[i])
      i+=1
    }
    return {n: n.data, i: i}
  }else{
    for(let j = 0; j < ch; j++){
      let rT = readTree(i)
      i = rT.i
      n.data.push(rT.n)
    }
    for(let j = 0; j < md; j++){
      n.data.push(input[i])
      i+=1
    }
    return {n: n.data, i: i}
  }
}

let exTree = readTree(0).n

function redArray(a){
  let tot = 0
  a.forEach((e)=>{
    if(typeof e !== 'object'){
      tot+=e
      return e
    }
  })
  a = a.filter(e=>typeof e === 'object')
  a.push(tot)
  return a
}

console.log(redArray(exTree))
