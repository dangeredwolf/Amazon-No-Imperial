"use strict";

function init() {

	$("#enabled").change((e) => {
		console.log($("#enabled").is(":checked"));
		chrome.storage.sync.set({"enabled":$("#enabled").is(":checked") ? "true" : "false"});
	})

	$("#page_issue").click(() => {

		chrome.tabs.query({active:true,currentWindow:true},(a) => {
			console.log(a[0]);
			open("https://github.com/dangeredwolf/No-Imperial-Amazon/issues/new?title=Page%20Issue&body="+encodeURI("<!--  \nDon't forget to fill out the \"What's wrong with this page\" section below :)\n -->\n\nProduct Page Title: " + a[0].title + "\n\nProduct URL: " + a[0].url).replace(/\&/g,"%26")+encodeURI("\n\nWhat's wrong with running Amazon No Imperial in this page?\n\n"));
		});

	})
}

chrome.storage.sync.get({"enabled":"true"},(i) => {
	console.log(i);
	setTimeout(() => {
		$("#enabled").attr("checked", i.enabled === "true");
	},0)
})

chrome.tabs.query({active:true,currentWindow:true},(a) => {
	if (a[0].url.match(/https?\:\/\/((\w+)?\.?)amazon.\w+/g) === null) {
		$("#page_issue").remove();
	}

});

setTimeout(init,0);
