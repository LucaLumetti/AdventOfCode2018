const fs = require('fs')
let input = fs.readFileSync('input', 'utf-8')
input = input.split('\n')
input.pop()

let strs = input.splice(0)

let strs_cpy = [...strs]
let checks = []
let res = []

strs.forEach((s)=>{
  for(let i = 0; i < strs_cpy.length; i++){
    let k = s.split('').map((c,j)=>{
      return Math.abs(c.charCodeAt(0) - strs_cpy[i].split('')[j].charCodeAt(0))
    }).join('')
    if(k.replace(/[0]/g,'').length === 1)
      res.push(s)
  }
})

let fstr = []
res[1] = res[1].split('')
res[0].split('').forEach((c,i)=>{
  if(c === res[1][i]){
    fstr.push(c)
  }
})

console.log(fstr.join(''))
