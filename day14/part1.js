let fs = require('fs')
let input = '260321'

input = Number(input)
let minlen = input+10
let elfA = 0
let elfB = 1
let recipes = [3, 7]

while(recipes.length < minlen){
  let nr = recipes[elfA]+recipes[elfB]
  if(nr > 9){
    recipes.push((nr-nr%10)/10)
    recipes.push(nr%10)
  }else{
    recipes.push(nr)
  }
  elfA = (elfA+recipes[elfA]+1)%recipes.length
  elfB = (elfB+recipes[elfB]+1)%recipes.length
}

let res = []

for(let i = 0; i < 10; i++){
  res.push(recipes[i+input])
}

console.log(res.join(''))
