# npm-deterministic-random-sequence
A function that returns a sequence of deterministic random numbers. Given the same seed the function will return the same order of random numbers.

This uses the [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash) hashing function and the [sfc32](http://pracrand.sourceforge.net/) (Simple Fast Counter) which is part of the [PractRand](http://pracrand.sourceforge.net/) random number testing suite (which it passes of course). sfc32 has a 128-bit state and is very fast in JS.

### usage

`npm i deterministic-random-sequence`

or 

`npm i -D deterministic-random-sequence`


```js
var drs = require("deterministic-random-sequence");

var rand = drs("hello");	// "hello" seed, optional (will seed with "" if not set)
var first = rand();		// 0.6173389465548098 
var second = rand();	// 0.8618584796786308
var third = rand();		// 0.18602279876358807

// creates the same sequesnce from same initial conditions.
var rand2 = drs("hello");
var fourth = rand2();	// 0.6173389465548098 
var fifth = rand2();	// 0.8618584796786308
var sixth = rand2();	// 0.18602279876358807
```

### performance and randomness

Stats for generating 10 million numbers eg. 

```js
var drs = require("deterministic-random-sequence");
var rand = drs("hello");
var av = 0;
var f0 = 0;
var f1 = 0;
var f2 = 0;
var f3 = 0;
var f4 = 0;
var f5 = 0;
var f6 = 0;
var f7 = 0;
var f8 = 0;
var f9 = 0;
var time = Date.now();
for(var j = 0; j < 10000000; j++){
	var r = rand();
	av += r;
	if(r < 0.1){
		f0++;
	}else if (r < 0.2) {
		f1++;
	}else if (r < 0.3) {
		f2++;
	}else if (r < 0.4) {
		f3++;
	}else if (r < 0.5) {
		f4++;
	}else if (r < 0.6) {
		f5++;
	}else if (r < 0.7) {
		f6++;
	}else if (r < 0.8) {
		f7++;
	}else if (r < 0.9) {
		f8++;
	}else if (r < 1) {
		f9++;
	}
}
console.log({
	time: Date.now() - time,
	f0,
	f1,
	f2,
	f3,
	f4,
	f5,
	f6,
	f7,
	f8,
	f9,
	average: av/10000000});
```

#### results

10 million calls (Macbook pro 2017, 16Gb ram, i5 processor), Average of 100 runs.

```js
{ 
  time: 202,	// 0.2 seconds
  f0: 999509,	// distribution 0 - 0.09999
  f1: 1000021,	// distribution 0.1 - 0.19999
  f2: 1000071,
  f3: 1000245,
  f4: 999910,
  f5: 1000230,
  f6: 999949,
  f7: 999450,
  f8: 999627,
  f9: 1000988,	// distribution 0.9 - 0.99999
  average: 0.5000368568708922 
}
```