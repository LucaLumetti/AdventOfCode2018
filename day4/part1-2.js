let fs = require('fs')
let input = fs.readFileSync('input', 'utf-8')

let regex = /\[([0-9]{4})\-([0-9]{2})\-([0-9]{2})\ ([0-9]{2})\:([0-9]{2})\]\ ([a-zA-Z]{5})\ (#[0-9]+)?/g 
let scheduler = []

input = input.replace(/1518/g,'2000').split('\n').map((line)=>{

  while ((m = regex.exec(line)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let action = {
      date: new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:00Z`),
      type: m[6],
      id: m[7]
    }
    scheduler.push(action)
  }
})

scheduler.sort((a, b)=>a.date.getTime()-b.date.getTime())
fs.writeFileSync('ordered_input', JSON.stringify(scheduler))

let map = {}
let cDay
let cId

for(let i = 0; i < scheduler.length; i++){
  if(scheduler[i].id){
    cId = scheduler[i].id
    cDay = scheduler[i].date
    map[cDay] = {}
    map[cDay][cId] = new Array(60).fill(0)
  }else{
    i++
    let obj = {
      sleep: scheduler[i-1].date,
      wake: scheduler[i].date,
      min: (scheduler[i].date.getTime() - scheduler[i-1].date.getTime())/60000-1
    }
    for(let m = obj.sleep.getMinutes(); m < obj.wake.getMinutes(); m++){
      map[cDay][cId][m] = 1
    }
  }
}

let totalSleepTime = {}

Object.keys(map).forEach((day)=>{
  Object.keys(map[day]).forEach(id=>{
    totalSleepTime[id] = totalSleepTime[id] || 0
    map[day][id].forEach((v)=>{
      totalSleepTime[id] += v
    })
  })
})

let maxSleepTime = {
  id: '',
  value: 0
}
Object.keys(totalSleepTime).forEach((id)=>{
  if(totalSleepTime[id] > maxSleepTime.value){
    maxSleepTime.id=id
    maxSleepTime.value=totalSleepTime[id]
  }
})

let minutesSleep = {}
Object.keys(map).forEach((day)=>{
  Object.keys(map[day]).forEach((id)=>{
    minutesSleep[id] = minutesSleep[id] || new Array(60).fill(0)
    for(let i = 0; i < map[day][id].length; i++){
      minutesSleep[id][i] += map[day][id][i]
    }
  })
})

console.log(Number(maxSleepTime.id.replace('#',''))*minutesSleep[maxSleepTime.id].indexOf(Math.max(...minutesSleep[maxSleepTime.id])))

let maxSleep = {
  id: '',
  value: 0,
  index: -1
}
Object.keys(minutesSleep).forEach((id)=>{
  if(Math.max(...minutesSleep[id]) > maxSleep.value){
    maxSleep.id = id
    maxSleep.value = Math.max(...minutesSleep[id])
    maxSleep.index = minutesSleep[id].indexOf(maxSleep.value)
  }
})

console.log(Number(maxSleep.id.replace('#',''))*maxSleep.index)
