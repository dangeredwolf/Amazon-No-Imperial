/*
	MTDinject.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/

'use strict';

let baseUrl;

const SystemVersion = "7.3.7";

if (typeof urlExchange === "object" && typeof urlExchange.getAttribute === "function") {
	baseUrl = urlExchange.getAttribute("type");
	console.info("urlExchange completed with URL " + baseUrl);
}
