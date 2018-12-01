let fs = require('fs')
let input = fs.readFileSync(__dirname + '/input', 'utf-8').split('\n').map(Number)

let res = input.reduce((a,b)=>a+b)
console.log(res)
