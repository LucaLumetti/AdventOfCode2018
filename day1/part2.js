let fs = require('fs')
let input = fs.readFileSync(__dirname + '/input', 'utf-8').split('\n').map(Number)
input.pop()

let freqs = [0]

for(let i = 1; true; i++){
	let s = input[(i-1)%input.length]+freqs[i-1]
	if(freqs.indexOf(s) > -1){
		console.log(s)
    break
	}
	freqs[i] = s
}

