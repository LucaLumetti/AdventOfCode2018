function getResult(players, lastMarble){
  let current = { n: 0}
  current.prev = current
  current.next = current

  scores = new Array(players).fill(0)

  let currPlayer = 0
  for(let marbleIndex = 1; marbleIndex <= lastMarble; marbleIndex++) {
    if(marbleIndex % 23 === 0) {
      let target = current
      for(let i = 0; i < 7; i++)
        target = target.prev
      scores[currPlayer] += marbleIndex
      scores[currPlayer] += target.n
      target.next.prev = target.prev
      target.prev.next = target.next
      current = target.next
    }
    else {
      let target = current.next
      let newMarble = {
        n: marbleIndex,
        prev: target,
        next: target.next
      }
      target.next.prev = newMarble
      target.next = newMarble
      current = newMarble
    }
    currPlayer = (currPlayer + 1) % players
  }

  return (Math.max.apply(null, scores))
}

let fs = require('fs')
let input = fs.readFileSync('input', 'utf-8').trim()
let rgx = /(\d+)[\ a-zA-Z\;]+(\d+)/g

let data = rgx.exec(input)
data[1] = Number(data[1])
data[2] = Number(data[2])

console.log(getResult(data[1], data[2]))
console.log(getResult(data[1], data[2]*100))
