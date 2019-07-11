/*
	load.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence
*/

"use strict";

var browser = browser || chrome;

console.log("Bootstrapping noimperial");

var injectScript = document.createElement("script");

function urlExchange(url) {
	var injectURL = document.createElement("div");
	injectURL.setAttribute("type",url);
	injectURL.id = "urlExchange";
	document.head.appendChild(injectURL);
	console.log("injected url exchange with id " + injectURL.id);
}

urlExchange(browser.extension.getURL(""));
injectScript.src = browser.extension.getURL("noimperial.js");

injectScript.type = "text/javascript";
document.head.appendChild(injectScript);
