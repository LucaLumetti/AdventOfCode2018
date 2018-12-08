let fs = require('fs')
let input = fs.readFileSync('input', 'utf-8').trim().split('\n').filter(a => a!=='')

let steps = {}
input.forEach(r=>{
  r = r.split(' ')
  const a = r[1]
  const b = r[7]
  steps[a] = steps[a] || {n:a, b:{}, d: 60 + a.charCodeAt(0) - 64}
  steps[b] = steps[b] || {n:b, b:{}, d: 60 + b.charCodeAt(0) - 64}
  steps[b].b[a] = true
})
let t = 0
let ws = Array(5).fill('')
let d = ''
for(;;t++){
  let fs = Object.values(steps)
    .filter(o=> !Object.keys(o.b).length)
    .sort((a,b)=> a.n < b.n ? -1 : 1)
  if(!fs[0]) break
  fs = fs.filter(o=> !ws.includes(o.n))
  let i = -1
  ws = ws.map(w => w || (fs[++i]||{}).n || '')
  ws.forEach((w,i) => {
    if(!steps[w]) return
    steps[w].d -= 1
    if(!steps[w].d){
      delete steps[w]
      d += w
      ws[i] = ''
      Object.values(steps).forEach(o=>{
        delete o.b[w]
      })
    }
  })
}
console.log(t)
