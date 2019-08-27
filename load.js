/*
	load.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence
*/

"use strict";

var browser = browser || chrome;

console.log("Bootstrapping noimperial");

function checkIfHeadReady() {

	if (document === null || typeof document === "undefined" || document.head === null || typeof document.head === "undefined") {
		setTimeout(checkIfHeadReady,50);
		return;
	}

	function urlExchange(url) {
		var injectURL = document.createElement("div");
		injectURL.setAttribute("type",url);
		injectURL.id = "urlExchange";
		document.head.appendChild(injectURL);
		console.log("injected url exchange with id " + injectURL.id);
	}

	urlExchange(browser.extension.getURL(""));

	var injectScript = document.createElement("script");
	injectScript.src = browser.extension.getURL("jquery.min.js");
	injectScript.type = "text/javascript";
	document.head.appendChild(injectScript);

	var injectScript2 = document.createElement("script");
	injectScript2.src = browser.extension.getURL("noimperial.js");
	injectScript2.type = "text/javascript";
	document.head.appendChild(injectScript2);

}
chrome.storage.sync.get({"enabled":true},(i) => {
	if (i.enabled === "true")
		checkIfHeadReady();
})
