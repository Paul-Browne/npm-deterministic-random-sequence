const drs = require(".");

// randomness
var t = drs("hello");
var av = 0;
var f0 = 0;	// 0 - 0.099999
var f1 = 0;	// 0.1 - 0.199999
var f2 = 0;
var f3 = 0;
var f4 = 0;
var f5 = 0;
var f6 = 0;
var f7 = 0;
var f8 = 0;
var f9 = 0;	// 0.9 - 0.99999
var time = Date.now();
for(var j = 0; j < 10000000; j++){
	var r = t();
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
console.log({t:Date.now()-time,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,average:av/10000000});




