let fs = require('fs')
let input = fs.readFileSync('input','utf-8').replace('\n','').trim()

let str = input
let min = Infinity
let a = 'a'.charCodeAt(0)
let z = 'z'.charCodeAt(0)
for(let j = a; j <= z; j++){
  let rem = String.fromCharCode(j)
  let uRem = rem.toUpperCase()
  let str = input.replace(new RegExp(`${rem}|${uRem}`,'g'),'')

  let reactions = 1
  while(reactions > 0){
    let len = str.length
    for(let i = a; i <= z; i++){
      let char = String.fromCharCode(i)
      let uChar = char.toUpperCase()
      str = str.replace(`${char}${uChar}`,'')
      str = str.replace(`${uChar}${char}`,'')
    }
    reactions = len - str.length
  }

  if(min > str.length){
    min = str.length
    letter = j
  }
}

console.log(min)
