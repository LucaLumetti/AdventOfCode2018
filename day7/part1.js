let fs = require('fs')
let input = fs.readFileSync('input', 'utf-8').trim().split('\n').filter(a => a!=='')

let steps = {}
input.forEach(row=>{
  row = row.split(' ')
  let a = row[1]
  let b = row[7]
  steps[a] = steps[a] || {n:a, b:{}}
  steps[b] = steps[b] || {n:b, b:{}}
  steps[b].b[a] = true
})

let result = ''
while(true){
  let vals = Object.values(steps).filter(o=>!Object.keys(o.b).length).sort((a,b)=> a.n < b.n ? -1 : 1)
  if(!vals[0]) break
  let n = vals[0].n
  result += n
  delete steps[n]
  Object.values(steps).forEach(o=>delete o.b[n])
}

console.log(result)
