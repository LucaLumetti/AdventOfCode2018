const fs = require('fs')
let input = fs.readFileSync('input', 'utf-8')
input = input.split('\n')
input.pop()
let strs = input.splice(0)

for(let i = 0; i < strs.length; i++){
  for(let j = i+1; j < strs.length; j++){
    let diff = 0
    let index = -1
    for(let c in strs[i]){
      diff += strs[i][c] !== strs[j][c]
      if(diff > 1)
        break
      index = c
    }
    if(diff === 1){
      let result = strs[i].split('').filter((a,i)=>i!==index).join('')
      console.log(result)
      return
    }
  }
}
