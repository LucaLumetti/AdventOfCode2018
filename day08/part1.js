let fs = require('fs')
let input = fs.readFileSync('test','utf-8').trim().split(' ').map(Number)

function readTree(i){
  let ch = Number(input[i])
  i+=1
  let md = Number(input[i])
  i+=1
  let n = {
    child: ch,
    meta: md,
    sumdata: 0
  }
  if(ch === 0){
    for(let j = 0; j < md; j++){
      n.sumdata+= input[i]
      i+=1
    }
    return {n: n.sumdata, i: i}
  }else{
    for(let j = 0; j < ch; j++){
      let rT = readTree(i)
      i = rT.i
      n.sumdata+=rT.n
    }
    for(let j = 0; j < md; j++){
      n.sumdata+= input[i]
      i+=1
    }
    return {n: n.sumdata, i: i}
  }
}

console.log(readTree(0).n)
