export function assert(thing, msg) {
	if (typeof thing !== "undefined" && thing !== null) {
		return true;
	} else {
		throw msg || "Assertion failed";
	}
}

export function findHelper(str, regex, callback) {
	assert(str, "String str is a required argument");
	assert(regex, "RegExp regex is a required argument");
	assert(callback, "function callback is a required argument");

	let matches = str.match(regex);

	if (matches !== null && typeof matches !== "undefined") {
		return callback(matches, str);
	}
	
	return str;
}

export function validate(str) {
	assert(str, "String str is a required argument");
	return str.match(/\d/g) !== null;
}
