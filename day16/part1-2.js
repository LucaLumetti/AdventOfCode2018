let fs = require('fs')
let input = fs.readFileSync('input','utf-8').trim().split('\n\n\n\n')

let bef_regex = /Before:\ +/g
let aft_regex = /After:\ +/g

input[0] = input[0].split('\n\n').map(a=>a.split('\n'))
input[0].map(a => {
  a[0] = JSON.parse(a[0].replace(bef_regex,''))
  a[1] = a[1].split(' ').map(Number)
  a[2] = JSON.parse(a[2].replace(aft_regex,''))
})

let Reg = new Array(4)
let Opc = []
let Opn = []

function setReg(a, b, c, d){
  Reg[0] = a
  Reg[1] = b
  Reg[2] = c
  Reg[3] = d
}

function checkReg(a, b, c, d){
  return Reg[0] === a && Reg[1] === b && Reg[2] === c && Reg[3] === d
}

/*  Add  */
function addr(a, b, c){
  Reg[c] = Reg[a] + Reg[b]
}

function addi(a, b, c){
  Reg[c] = Reg[a] + b
}

/*  Mul  */
function mulr(a, b, c){
  Reg[c] = Reg[a] * Reg[b]
}

function muli(a, b, c){
  Reg[c] = Reg[a] * b
}

/* Bitwise AND */
function banr(a, b, c){
  Reg[c] = Reg[a] & Reg[b]
}

function bani(a, b, c){
  Reg[c] = Reg[a] & b
}

/* Bitwise OR */
function borr(a, b, c){
  Reg[c] = Reg[a] | Reg[b]
}

function bori(a, b, c){
  Reg[c] = Reg[a] | b
}

/* Assignment */
function setr(a, b, c){
  Reg[c] = Reg[a]
}

function seti(a, b, c){
  Reg[c] = a
}

/* Greater than */
function gtir(a, b, c){
  Reg[c] = Number(a > Reg[b])
}

function gtri(a, b, c){
  Reg[c] = Number(Reg[a] > b)
}

function gtrr(a, b, c){
  Reg[c] = Number(Reg[a] > Reg[b])
}

/* Equal */
function eqir(a, b, c){
  Reg[c] = Number(a == Reg[b])
}

function eqri(a, b, c){
  Reg[c] = Number(Reg[a] ==  b)
}

function eqrr(a, b, c){
  Reg[c] = Number(Reg[a] == Reg[b])
}

Opc.push(addr)
Opc.push(addi)
Opc.push(mulr)
Opc.push(muli)
Opc.push(banr)
Opc.push(bani)
Opc.push(borr)
Opc.push(bori)
Opc.push(setr)
Opc.push(seti)
Opc.push(gtir)
Opc.push(gtri)
Opc.push(gtrr)
Opc.push(eqir)
Opc.push(eqri)
Opc.push(eqrr)

Opc.forEach(o => {
  for(let i = 0; i < 16; i++){
    Opn[i] = Opn[i] ? Opn[i] : []
    Opn[i].push(o.name)
  }
})

let three_or_more = 0
input[0].forEach(opr => {
  let possible_op = 0
  let op_names = []

  Opc.forEach(f => {
    setReg(opr[0][0], opr[0][1], opr[0][2], opr[0][3])
    f(opr[1][1], opr[1][2], opr[1][3])
    let r = checkReg(opr[2][0], opr[2][1], opr[2][2], opr[2][3])
    if(r){
      possible_op += 1
      op_names.push(f.name)
    }
  })

  if(possible_op > 2)
    three_or_more++

  Opn[opr[1][0]] = Opn[opr[1][0]].filter(v => -1 !== op_names.indexOf(v))
})

for(let k = 0; k < 6; k++)
Opn.forEach((on, i) => {
  if(on.length === 1){
    Opn.forEach((om, j) => {
      if(i !== j)
      Opn[j] = Opn[j].filter(v => v !== on[0])
    })
  }
})
setReg(0,0,0,0)
input[1] = input[1].split('\n').map(a=>a.split(' ').map(Number))
input[1].forEach(instr => {
  eval(`(${Opn[instr[0]]})(${instr[1]}, ${instr[2]}, ${instr[3]})`)
})

console.log(three_or_more)
console.log(Reg[0])
