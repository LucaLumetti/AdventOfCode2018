const fs = require('fs')
let input = fs.readFileSync('input', 'utf-8')
input = input.split('\n')
input.pop()

let strs = input.map((s) => {
  return s.split('').sort().join('')
})

let two = 0
let three = 0
let rgx_three = /([a-z]{1})\1\1/gm
let rgx_two = /([a-z]{1})\1/gm

strs.forEach((s,i)=>{
  let a = s.match(rgx_three) || []
  let b = s.match(rgx_two) || []
  three += !!(a.length)
  two += !!(b.length - a.length)
})

console.log(two*three)


