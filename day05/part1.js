let fs = require('fs')
let input = fs.readFileSync('input','utf-8').replace('\n','').trim()

let str = input
let a = 'a'.charCodeAt(0)
let z = 'z'.charCodeAt(0)
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

console.log(str.length)
