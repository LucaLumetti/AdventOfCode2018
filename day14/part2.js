let fs = require('fs')
let input = '260321'

let minlen = Number(input)+10
let p2solved = 0
let elfA = 0
let elfB = 1
let recipes = [3, 7]
let slice = 0
let slice_size = 1000000
let index = -1

while(index === -1){
  let nr = recipes[elfA]+recipes[elfB]
  if(nr > 9){
    recipes.push((nr-nr%10)/10)
    recipes.push(nr%10)
  }else{
    recipes.push(nr)
  }
  elfA = (elfA+recipes[elfA]+1)%recipes.length
  elfB = (elfB+recipes[elfB]+1)%recipes.length
  if(recipes.length >= slice+slice_size){
    index = recipes.slice(slice, recipes.length).join('').indexOf(input)
    slice += slice_size
  }
}

console.log(index+slice-slice_size)

