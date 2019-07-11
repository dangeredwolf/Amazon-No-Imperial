/*
	MTDinject.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/

'use strict';

let mtdBaseURL;

const SystemVersion = "7.3.7";

if (typeof MTDURLExchange === "object" && typeof MTDURLExchange.getAttribute === "function") {
	mtdBaseURL = MTDURLExchange.getAttribute("type");
	console.info("MTDURLExchange completed with URL " + mtdBaseURL);
}
