/*
	noimperial.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/

'use strict';

let baseUrl;
let matchStr = ".a-color-price,.sponsored-products-truncator-truncated,.twisterShelf_swatch_text,.a-color-price>span,.a-list-item,.disclaim>strong,.content li:not(#SalesRank),.giveaway-product-title span,.a-size-base-plus,.description,#productDescription,.p13n-sc-truncated,.a-size-base,#productTitle,.a-row>.selection,.a-button-text .a-size-base,.a-link-normal,.a-spacing-base,.ivVariations,#ivTitle,.sponsored-products-truncator-truncated,.a-spacing-mini,#prodDetails strong,#productDescription strong";
let excludeStr = ".sims-fbt-image-box,.a-section,.issuance-banner li,#ap-options,[data-action=\"main-image-click\"],.a-button-input,.a-button,.a-button-inner,.a-price,.a-profile,.abb-selected-variation,.abb-option>.a-list-item,.a-radio";
const SystemVersion = "7.3.7";

if (typeof urlExchange === "object" && typeof urlExchange.getAttribute === "function") {
	baseUrl = urlExchange.getAttribute("type");
	console.info("urlExchange completed with URL " + baseUrl);
}

function convertLbs(lbs) {

}

function findNumbers(str) {
	return str.match(/(\d|\.)+/g)
}

function findInch(str) {
	return str.match(/(\d|\.)+(\s|-)?(inches|inch|in|Inches|Inch|”|\")/g)
}

function findInchArray(str) {
	return str.match(/((\d|\.)+\s?(\*|x|by)\s?)?(\d|\.)+\s?(\*|x|by)\s?(\d|\.)+\s?(inches|inch|in|Inches|Inch)/g)
}

function findFeet(str) {
	return str.match(/((\d|\.)+(\'))|((\d|\.)+\s?(x|\*|by)\s?)?((\d|\.)+ ?(x|\*\ ) ?)?(\d|\.)+(\s|-)?(feet|foot|ft|Feet|Foot|\')/g)
}

function findOunce(str) {
	return str.match(/(\d|\.)+.?(oz|ounces?|Ounces?|Oz|OZ)/g)
}

function findFluidOunce(str) {
	return str.match(/(\d|\.)+\s?(fl.? oz.?|floz|fluid oz.?|fluid ounces?|Fluid ounces?|Fluid Ounces?|fl.? ounces?|Fl.? ?Oz.?)/g)
}

function findCubicFoot(str) {
	return str.match(/(\d|\.)+.?(cu ft|cubic.feet|cubic.foot|Cubic.foot|Cubic.feet|Cubic.Foot|Cubic.Feet)/g)
}

function findCubicInch(str) {
	return str.match(/(\d|\.)+.?(cu in|cubic.inches|cubic.inch|Cubic.inches|Cubic.inch|Cubic.inches|Cubic.inch)/g)
}

function findPound(str) {
	return str.match(/(\d|\.)+.?(lbs?|pounds?|Pounds?|LBS?|Lbs?)/g)
}

function findPerPound(str) {
	return str.match(/\(\$(\d|\.)+ \/  ?Pound\)/g)
}

function findPerOunce(str) {
	return str.match(/\(\$(\d|\.)+ \/  ?Ounce\)/g)
}

function findPerFluidOunce(str) {
	return str.match(/\(\$(\d|\.)+ ? ?\/ ? ?Fl Oz\)/g)
}

function convertCubicFoot(cuft) {
	console.log(cuft)
	let conversion = (cuft * 28316.8);

	if (conversion > 1000) {
		return roundMe10(conversion/1000) + " L"
	} else {
		return Math.floor(conversion + .5) + " mL"
	}
}

function convertCubicInch(cuin) {
	console.log(cuin)
	let conversion = (cuin * 16.387);

	if (conversion > 1000) {
		return roundMe(conversion/1000) + " L"
	} else {
		return Math.floor(conversion  + .5) + " mL"
	}
}

function convertFluidOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce * 29.5735);

	if (conversion > 1000) {
		return roundMe(conversion/1000) + " L "
	} else {
		return Math.floor(conversion+.5) + " mL "
	}
}

function convertOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce * 28.35);

	if (conversion > 1000) {
		return roundMe(conversion/1000) + " kg"
	} else {
		return Math.floor(conversion+.5) + " g"
	}
}

function convertPerFluidOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce / 0.029573509718662);

	return "($" + roundMe(conversion) + " / L)"
}

function convertPerOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce / 0.0283495);

	return "($" + roundMe(conversion) + " / kg)"
}

function convertPerPound(pound) {
	console.log(pound)
	let conversion = roundMe(pound / 0.453592);

	return "$" + roundMe(conversion) + " / kg"
}

function convertLbs(lbs) {
	console.log(lbs)
	let conversion = roundMe(lbs * 453.6);

	if (conversion > 1000) {
		return roundMe(conversion/1000) + " kg "
	} else {
		return Math.floor(conversion+.5) + " g "
	}
}

function convertInch(inch) {
	let conversion = roundMe(inch * 25.4);

	if (conversion > 1000) {
		return roundMe(conversion/1000) + " m "
	} else if (conversion > 400) {
		return roundMe10(conversion/10) + " cm "
	} else {
		return Math.floor(conversion) + " mm "
	}
}

function convertFeet(feet) {
	let conversion = roundMe(feet * 0.3048);

	if (conversion > 1) {
		return conversion + " m "
	} else {
		return roundMe10(conversion/100) + " cm "
	}
}

function roundMe(val) {
	return Math.floor((val * 100) + .5)/100;
}

function roundMe10(val) {
	return Math.floor((val * 10) + .5)/10;
}

function metricateStr(str) {
	let findInArray = findInchArray(str);

	jQuery(findInArray).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		console.log(str)

		b = b.replace(/\s?(inches|inch|in)/g,"");

		jQuery(b.match(/(\d|\.)+/g)).each((c,d) => {
			let num2 = parseFloat(d.match(/(\d|\.)+/g));
			str = str.replace(d,convertInch(num2));
		})

		console.log(str)
	})

	let findPPOz = findPerOunce(str);

	jQuery(findPPOz).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerOunce(num))
	})

	let findPPFlOz = findPerFluidOunce(str);

	jQuery(findPPFlOz).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerFluidOunce(num))
	})

	let findFlOz = findFluidOunce(str);

	jQuery(findFlOz).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertFluidOunce(num))
	})

	let findIn = findInch(str);

	jQuery(findIn).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertInch(num))
	})

	let findCuIn = findCubicInch(str);

	jQuery(findCuIn).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicInch(num))
	})

	let findCuFt = findCubicFoot(str);

	jQuery(findCuFt).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicFoot(num))
	})

	let findFt = findFeet(str);

	jQuery(findFt).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertFeet(num))
	})

	let findOz = findOunce(str);

	jQuery(findOz).each((a,b) => {

		let num = parseFloat(b.match(/(\d|\.)+/g));

		if ( // We have to do some inferencing because "ounce" is ambiguous
		str.match(/(tea|Tea|bottle|Bottle|soda|Soda|Cola|Coke|cola|coke|drink|Drink|Cans?|cans?|Water|water|Pepsi)/g) !== null
		&&
		str.match(/(powder|Powder|Candy|Candies|candies|candy|gum|Gum)/g) === null
		) {
			str = str.replace(b,convertFluidOunce(num));
		}

		str = str.replace(b,convertOunce(num));
		console.log(convertOunce(num))
	})

	let findLb = findPound(str);

	jQuery(findLb).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertLbs(num));
	})


	str = str.replace(/\s?(inches|inch)/g,"").replace(/cm  ?in/g,"cm").replace(/cm  ?Inch(es)?/g,"cm").replace(/cm  ?inch(es)?/g,"cm").replace(/mm  ?in/g,"mm");

	return str;
}

function canMetricate(str) {
	return true
	// return findInch(str) !== null ||
	// findOunce(str) !== null ||
	// findFluidOunce(str) !== null ||
	// findPound(str) !== null ||
	// findFeet(str) !== null || false
}


var g_bannedtags = ['STYLE', 'SCRIPT', 'NOSCRIPT', 'TEXTAREA', 'IFRAME', 'IMG', 'I', 'DIV', 'TBODY', 'IMG', 'LABEL'];

function metricateObj(obj) {
	if (typeof obj === "undefined") {
		return;
	}

	if (!jQuery(obj).is(matchStr)) {
		//return
	}

	if (typeof obj.attributeName !== "undefined") {
		jQuery(obj.addedNodes).each((a,b) => metricateObj(jQuery(b)));
		return;
	}

	if (typeof jQuery(obj).contents() === "undefined" || jQuery(obj).contents().length <= 0) {
		return;
	}

	jQuery(obj).contents().each((a,b) => {

		try {
			if (typeof b !== "string" && jQuery(b).is(excludeStr)) {
				return;
			}
		} catch(e) {
			//console.error(b)
		}

		if (typeof b.textContent !== "undefined") {

			if ($.inArray(b.tagName, g_bannedtags) !== -1 ) return;

			if (canMetricate(b.textContent))
				b.textContent = metricateStr(b.textContent)
				//jQuery(b).html(metricateStr(jQuery(b).html()))
			} else {
				metricateObj(jQuery(b));
			}
		}
	)
}

function onjQueryAvailable() {
	if (typeof jQuery === "undefined") {
		setTimeout(onjQueryAvailable,10);
		return;
	}

	jQuery(matchStr).each(
		(a,b) => metricateObj(jQuery(b))
	)

	setInterval(() => {
		window.$ = jQuery;
		var $ = jQuery;
		jQuery(matchStr).each(
			(a,b) => metricateObj(jQuery(b))
		)
	},1000)
}

onjQueryAvailable();
