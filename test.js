import drs from ".";
const rand = drs("hello");

const calls = () => {
	const time = Date.now();
	for (let j = 0; j < 10000000; j++) {
		rand();
	}
	return Date.now() - time;
}

const callsPushedToArray = () => {
	const time = Date.now();
	const arr = [];
	for (let j = 0; j < 10000000; j++) {
		arr.push(rand());
	}
	return Date.now() - time;
}

// 10 million calls to the rand() function, averaged of 100 times
let averageTimeCalls = 0;
for (let k = 0; k < 100; k++) {
	averageTimeCalls += calls();
}
averageTimeCalls /= 100;

// 10 million calls to the rand() function, pushed to an array, averaged of 100 times
let averageTimeCallsPushedToArray = 0;
for (let k = 0; k < 100; k++) {
	averageTimeCallsPushedToArray += callsPushedToArray();
}
averageTimeCallsPushedToArray /= 100;

// distribution of randomness
let average = 0;
const dist = {};
for (let j = 0; j < 10000000; j++) {
	const r = rand();
	const key = Math.floor(r * 100) / 100;
	const keyName = key.toFixed(2) + "-" + (key + 0.01).toFixed(2);
	if (dist[keyName]) {
		dist[keyName] = dist[keyName] + 1;
	} else {
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
