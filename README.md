# deterministic random sequence
A function that returns a sequence of deterministic random numbers. Given the same seed the function will return the same order of random numbers.

This uses the [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash) hashing function and the [sfc32](http://pracrand.sourceforge.net/) (Simple Fast Counter) which is part of the [PractRand](http://pracrand.sourceforge.net/) random number testing suite (which it passes of course). sfc32 has a 128-bit state and is very fast in JS.

### usage

`npm i deterministic-random-sequence`

or 

`npm i -D deterministic-random-sequence`


```js
const drs = require("deterministic-random-sequence");

const rand = drs("hello");  // "hello" seed, optional (will seed with "" if not set)
const first = rand();       // 0.6173389465548098 
const second = rand();      // 0.8618584796786308
const third = rand();       // 0.18602279876358807

// creates the same sequence from same initial conditions.
const rand2 = drs("hello");
const fourth = rand2();     // 0.6173389465548098 
const fifth = rand2();      // 0.8618584796786308
const sixth = rand2();      // 0.18602279876358807
```

### performance and randomness

Stats for generating 10 million numbers eg. 

```js
const drs = require("deterministic-random-sequence");
const rand = drs("hello");

const calls = () => {
	const time = Date.now();
	for(let j = 0; j < 10000000; j++){
		rand();
	}
	return Date.now() - time;
}

const callsPushedToArray = () => {
	const time = Date.now();
	const arr = [];
	for(let j = 0; j < 10000000; j++){
		arr.push(rand());
	}
	return Date.now() - time;
}

// 10 million calls to the rand() function, averaged of 100 times
let averageTimeCalls = 0;
for(let k = 0; k < 100; k++){
	averageTimeCalls += calls();
}
averageTimeCalls /= 100;

// 10 million calls to the rand() function, pushed to an array, averaged of 100 times
let averageTimeCallsPushedToArray = 0;
for(let k = 0; k < 100; k++){
	averageTimeCallsPushedToArray += callsPushedToArray();
}
averageTimeCallsPushedToArray /= 100;

// distribution of randomness
let average = 0;
const dist = {};
for(let j = 0; j < 10000000; j++){
	const r = rand();
	const key = Math.floor(r * 100)/100;
	const keyName = key.toFixed(2) + "-" + (key + 0.01).toFixed(2);
	if(dist[keyName]){
		dist[keyName] = dist[keyName] + 1;
	}else{
		dist[keyName] = 1;
	}
	average += r;
}
average /= 10000000;

console.log({
	averageTimeCalls,
	averageTimeCallsPushedToArray,
	dist,
	average
});
```

#### results

10 million calls (Macbook pro 2017, 16Gb ram, i5 processor), Average of 100 runs.

```js
{ 
  averageTimeCalls: 35.53,               // 0.03553 seconds
  averageTimeCallsPushedToArray: 219.99, // 0.21999 seconds
  dist: { 
    '0.72-0.73': 99958,
    '0.83-0.84': 100553,
    '0.52-0.53': 100063,
    '0.56-0.57': 99678,
    '0.60-0.61': 100292,
    '0.87-0.88': 99739,
    '0.78-0.79': 99939,
    '0.46-0.47': 99975,
    '0.21-0.22': 99731,
    '0.97-0.98': 100231,
    '0.27-0.28': 100091,
    '0.62-0.63': 100112,
    '0.67-0.68': 99869,
    '0.11-0.12': 100378,
    '0.59-0.60': 99819,
    '0.70-0.71': 99457,
    '0.61-0.62': 100117,
    '0.99-1.00': 99615,
    '0.43-0.44': 100276,
    '0.19-0.20': 99686,
    '0.44-0.45': 100114,
    '0.17-0.18': 99790,
    '0.65-0.66': 99896,
    '0.73-0.74': 99668,
    '0.03-0.04': 100539,
    '0.89-0.90': 99506,
    '0.49-0.50': 99549,
    '0.71-0.72': 100020,
    '0.68-0.69': 99928,
    '0.12-0.13': 100131,
    '0.98-0.99': 100378,
    '0.16-0.17': 100245,
    '0.39-0.40': 99734,
    '0.93-0.94': 100071,
    '0.13-0.14': 100331,
    '0.80-0.81': 100200,
    '0.28-0.29': 99987,
    '0.47-0.48': 99730,
    '0.53-0.54': 100218,
    '0.35-0.36': 100209,
    '0.31-0.32': 100039,
    '0.06-0.07': 100321,
    '0.66-0.67': 100058,
    '0.76-0.77': 100152,
    '0.37-0.38': 99835,
    '0.00-0.01': 100340,
    '0.55-0.56': 99886,
    '0.88-0.89': 100105,
    '0.25-0.26': 99727,
    '0.58-0.59': 99819,
    '0.30-0.31': 99575,
    '0.18-0.19': 100106,
    '0.26-0.27': 99859,
    '0.85-0.86': 99875,
    '0.75-0.76': 99762,
    '0.94-0.95': 99846,
    '0.33-0.34': 99944,
    '0.38-0.39': 99790,
    '0.48-0.49': 100566,
    '0.74-0.75': 99909,
    '0.24-0.25': 100012,
    '0.20-0.21': 99633,
    '0.92-0.93': 99684,
    '0.15-0.16': 100058,
    '0.42-0.43': 100269,
    '0.41-0.42': 99463,
    '0.02-0.03': 99448,
    '0.07-0.08': 100346,
    '0.95-0.96': 100466,
    '0.04-0.05': 99505,
    '0.69-0.70': 99883,
    '0.81-0.82': 99587,
    '0.08-0.09': 100137,
    '0.50-0.51': 99707,
    '0.90-0.91': 100206,
    '0.54-0.55': 100296,
    '0.51-0.52': 99838,
    '0.09-0.10': 100034,
    '0.64-0.65': 99765,
    '0.32-0.33': 100026,
    '0.77-0.78': 99239,
    '0.84-0.85': 99884,
    '0.57-0.58': 100010,
    '0.45-0.46': 100505,
    '0.34-0.35': 99567,
    '0.86-0.87': 99842,
    '0.05-0.06': 100256,
    '0.23-0.24': 100428,
    '0.63-0.64': 99648,
    '0.82-0.83': 100151,
    '0.79-0.80': 100216,
    '0.01-0.02': 100072,
    '0.29-0.30': 100377,
    '0.91-0.92': 100296,
    '0.36-0.37': 100220,
    '0.40-0.41': 99927,
    '0.10-0.11': 100350,
    '0.22-0.23': 100491,
    '0.96-0.97': 100347,
    '0.14-0.15': 100474 
  },
  average: 0.4998805594122014 
}
```