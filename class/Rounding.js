export function roundMe100(val) {
	let a = roundMe(val, true);

	if (a.toString().match(/\.\d$/gm) !== null) { // add a trailing zero if only 1 decimal place (ie $3.7 -> $3.70)
		return a.toString() + "0"
	}
	if (a.toString().match(/^[^\.]\d[^\.]$/gm) !== null) { // add decimal if none there (ie $3 -> $3.00)
		return a.toString() + ".00"
	}
	return roundMe(val);
}

export function roundMe(val, force100) {

	if (val > 10) {
		return roundMe10(val)
	}

	let rounded = Math.floor((val * 100) + .5)/100;

	if (rounded.toString().match(/9\.99/g) !== null) {
		rounded = rounded + .01
	}

	if (rounded.toString().match(/9\.9/g) !== null) {
		rounded = rounded + .1
	}

	if (rounded.toString().match(/\d9 k?g/g) !== null) {
		rounded = rounded + 1
	}

	if (isNaN(rounded)) {
		console.error('what (roundMe)');
		console.error(val);
	}
	return rounded;
}

export function roundMe10(val) {
	let rounded = Math.floor((val * 10) + .05)/10;

	if (rounded.toString().match(/9\.9/g) !== null) {
		rounded = rounded + .1
	}

	if (isNaN(rounded)) {
		console.error('what (roundMe10)');
		console.error(val);
	}

	return rounded;
}
