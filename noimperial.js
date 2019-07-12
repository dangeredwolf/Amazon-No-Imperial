/*
	noimperial.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/

'use strict';

let baseUrl;
let matchStr = ".shelf-label-variant-name,#aplus,#importantInformation .content,.textContainer__text,#hero-quick-promo a,#product-specification-table td,.a-color-price,.sponsored-products-truncator-truncated,.twisterShelf_swatch_text,.a-color-price>span,.a-list-item,.disclaim>strong,.content li:not(#SalesRank),.giveaway-product-title span,.a-size-base-plus,.description,#productDescription,.p13n-sc-truncated,.a-size-base,#productTitle,.a-row>.selection,.a-button-text .a-size-base,.a-link-normal,.a-spacing-base,.ivVariations,#ivTitle,.sponsored-products-truncator-truncated,.a-spacing-mini,#prodDetails strong,#productDescription strong";
let excludeStr = ".p13n-asin>span,.p13n-asin>span>span,.sims-fbt-seller-info,.sims-fbt-checkbox-label,.sims-fbt-image-box>li,.sims-fbt-image-box>li>span,.sims-fbt-image-box>li>span>a,.feed-carousel-card>span,.feed-carousel-card>span>a,.feed-carousel-card,.feed-carousel-shelf,.issuance-banner a,span[data-component-type=\"s-in-cart-badge-component\"],.sims-fbt-image-box,.zg-text-center-align,.a-section,.issuance-banner li,#ap-options,[data-action=\"main-image-click\"],.a-button-input,.a-button,.a-button-inner,.a-price,.a-profile,.abb-selected-variation,.abb-option>.a-list-item,.a-radio";
let disabled = false;
let pollingRate = 1000; // 1s

if (typeof urlExchange === "object" && typeof urlExchange.getAttribute === "function") {
	baseUrl = urlExchange.getAttribute("type");
	console.info("urlExchange completed with URL " + baseUrl);
}

function findNumbers(str) {
	return str.match(/(\d|\.|½)+/g)
}

function findMil(str) {
	return str.match(/(\d|\.)+(\s|-)?(mil)[^l]/g)
}

function findInch(str) {
	if (str.match(/\d\d\d\d in/g) !== null) { // no years in
		return null;
	}
	return str.match(/(\d|\.| ?½)+(\s|-)?(inches|inch|in|Inches|Inch|”|\")/g)
}

function findGallon(str) {
	return str.match(/(\d|\.)+(\s|-)?(Gallons?|gallons?|gal.?|Gal.?)/g)
}

function findQuart(str) {
	return str.match(/(\d|\.)+(\s|-)?(quarts?|qt.?|Quarts?)/g)
}

function findInchArray(str) {
	return str.match(/((\d|\.)+\s?(\*|x|by)\s?)?(\d|\.)+\s?(\*|x|by)\s?(\d|\.)+\s?(inches|inch|in|Inches|Inch)/g)
}

function findFeet(str) {
	return str.match(/((\d|\.)+(\'))|((\d|\.)+\s?(x|\*|by)\s?)?((\d|\.)+ ?(x|\*\ ) ?)?(\d|\.)+(\s|-)?(feet|foot|ft|Feet|Foot|\')/g)
}

function findOunce(str) {
	return str.match(/(\d|\.)+(\s|-)?(oz\.?|ounces?|Ounces?|Oz\.?|OZ\.?)/g)
}

function findFluidOunce(str) {
	return str.match(/(\d|\.)+\s?(fl.? oz.?|floz|fluid oz.?|fluid ounc?e?s?|Fluid ounc?e?s?|fluid Ounc?e?s?|Fluid Ounc?e?s?|fl\.? ounc?e?s?|Fl\.? ?Oz\.?|Fl\.? ?oz\.?|FL\.? OZ\.?)/g)
}

function findCubicFoot(str) {
	return str.match(/(\d|\.)+.?(cu ft|cubic.feet|cubic.foot|Cubic.foot|Cubic.feet|Cubic.Foot|Cubic.Feet)/g)
}

function findCubicInch(str) {
	return str.match(/(\d|\.)+.?(cu in|cubic.inches|cubic.inch|Cubic.inches|Cubic.inch|Cubic.inches|Cubic.inch)/g)
}

function findSquareFoot(str) {
	return str.match(/(\d|\.)+.?(sq ft|square.feet|square.foot|Square.foot|Square.feet|Square.Foot|Square.Feet|SQ FT|Sq Ft)/g)
}

function findSquareInch(str) {
	return str.match(/(\d|\.)+.?(sq\.? in\.?|square.inches|square.inch|Square.inches|Square.inch|Square.inches|Square.inch|SQ IN|Sq\.? In\.?)/g)
}

function findPound(str) {
	return str.match(/(\d|\.)+.?(lbs?|pounds?|Pounds?|LBS?|Lbs?)/g)
}

function findPerPound(str) {
	return str.match(/\(\$(\d|\.)+ \/  ?Pound\)/g)
}

function findPerOunce(str) {
	return str.match(/\(\$(\d|\.)+ ?\/ ? ?Ounce\)/g)
}

function findPerFluidOunce(str) {
	return str.match(/\(\$(\d|\.)+ ? ?\/ ? ?(Fl Oz|oz)\)/g)
}

function convertCubicFoot(cuft) {
	console.log(cuft)
	let conversion = (cuft * 28316.8);

	if (conversion >= 1000) {
		return roundMe10(conversion/1000) + " L"
	} else {
		return Math.floor(conversion + .5) + " mL"
	}
}

function convertCubicInch(cuin) {
	console.log(cuin)
	let conversion = (cuin * 16.387);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " L"
	} else {
		return Math.floor(conversion  + .5) + " mL"
	}
}

function convertSquareFoot(sqft) {
	console.log(sqft)
	let conversion = (sqft * 0.092903);

	if (conversion >= 1) {
		return roundMe(conversion) + " m²"
	} else {
		return roundMe10(conversion*100 + .5) + " cm²"
	}
}

function convertSquareInch(sqin) {
	console.log(sqin)
	let conversion = (sqin * 0.00064516);

	if (conversion >= 1) {
		return roundMe(conversion) + " m²"
	} else {
		return roundMe10(conversion*100 + .5) + " cm²"
	}
}

function convertGallon(gal) {
	console.log(gal)
	let conversion = roundMe10(gal * 3.78541);

	if (conversion >= 1) {
		return conversion + " L "
	} else {
		return Math.floor(conversion*1000) + " mL "
	}
}

function convertQuart(qt) {
	console.log(qt)
	let conversion = roundMe10(qt * 0.946353);

	if (conversion >= 1) {
		return conversion + " L "
	} else {
		return Math.floor(conversion*1000) + " mL "
	}
}

function convertFluidOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce * 29.5735);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " L "
	} else {
		let temp = Math.ceil(conversion) + " mL ";

		if (temp === "148 mL ") { // hack to get around rounding errors
			return "150 mL ";
		}
		if (temp === "252 mL ") { // hack to get around rounding errors
			return "250 mL ";
		}
		if (temp === "651 mL ") { // hack to get around rounding errors
			return "650 mL ";
		}
		if (temp === "681 mL ") { // hack to get around rounding errors
			return "680 mL ";
		}
		if (temp === "202 mL ") { // hack to get around rounding errors
			return "200 mL ";
		}
		if (temp === "249 mL ") { // hack to get around rounding errors
			return "250 mL ";
		}
		if (temp === "237 mL ") { // hack to use US legal cup
			return "240 mL ";
		}
		if (temp === "1000 mL ") { // not sure why my code @ if(conversion >= 1000) ignores me so here
			return "1 L ";
		}
		return temp;
	}
}

function convertOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce * 28.35);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " kg"
	} else {
		return Math.floor(conversion+.4) + "g"
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

	return ("($" + conversion + " / kg)")
}

function convertPerPound(pound) {
	console.log(pound)
	let conversion = roundMe(pound / 0.453592);

	return "($" + roundMe(conversion) + " / kg)"
}

function convertLbs(lbs) {
	console.log(lbs)
	let conversion = roundMe(lbs * 453.6);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " kg "
	} else {
		return Math.floor(conversion+.5) + "g "
	}
}

function convertInch(inch) {
	let conversion = roundMe(inch * 25.4);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " m "
	} else if (conversion > 100) {
		return roundMe10(conversion/10) + " cm "
	} else {
		return Math.floor(conversion) + " mm "
	}
}

function convertMil(mil) {
	let conversion = roundMe(mil * 25.4);

	return Math.floor(conversion+.5) + " µm"
}

function convertFeet(feet) {
	let conversion = roundMe(feet * 0.3048);

	if (conversion >= 1) {
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

	jQuery(findInchArray(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		console.log(str)

		b = b.replace(/\s?(inches|inch|in)/g,"");

		jQuery(b.match(/(\d|\.)+/g)).each((c,d) => {
			let num2 = parseFloat(d.replace(/½/g,".5").match(/(\d|\.)+/g));
			str = str.replace(d,convertInch(num2));
		})

		console.log(str)
	})

	jQuery(findPerPound(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerPound(num));
		console.log(str);
	})

	jQuery(findPerOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerOunce(num));
		console.log(str);
	})

	jQuery(findPerFluidOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerFluidOunce(num))
	})

	jQuery(findFluidOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertFluidOunce(num))
	})

	jQuery(findQuart(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertQuart(num))
	})

	jQuery(findGallon(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertGallon(num))
	})

	jQuery(findMil(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertMil(num))
	})

	jQuery(findInch(str)).each((a,b) => {
		let num = parseFloat(b.replace(/ ?½/g,".5").match(/(\d|\.)+/g));

		str = str.replace(b,convertInch(num))
	})

	jQuery(findCubicInch(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicInch(num))
	})

	jQuery(findCubicFoot(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicFoot(num))
	})

	jQuery(findSquareInch(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertSquareInch(num))
	})

	jQuery(findSquareFoot(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertSquareFoot(num))
	})

	jQuery(findFeet(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertFeet(num))
	})

	jQuery(findOunce(str)).each((a,b) => {

		let num = parseFloat(b.match(/(\d|\.)+/g));

		if ( // We have to do some inferencing because "ounce" is ambiguous
		str.match(/(tea|Tea|bottle|Bottle|soda|Soda|Cola|Coke|cola|coke|drink|Drink|Cans?|cans?|Water|water|Pepsi|Gatorade|Soap|soap|Toilet Bowl Cleaner|Spray|Bathroom Cleaner|Cups?|cups?|Broth|milk|Milk|Juice|juice|Cream(er)?|Conditioner|Smoothie|Moisturizer|CC Creme|Gel|gel)/g) !== null
		&&
		str.match(/(powder|Powder|Candy|Candies|candies|candy|gum|Gum|Canister|canister|Ground Coffee|Steak|Slices)/g) === null
		) {
			str = str.replace(b,convertFluidOunce(num));
		}

		str = str.replace(b,convertOunce(num));
		console.log(convertOunce(num))
	})

	jQuery(findPound(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertLbs(num));
	})


	str = str.replace(/\s?(inches|inch)/g,"").replace(/cm  ?in/g,"cm").replace(/cm  ?Inch(es)?/g,"cm").replace(/cm  ?inch(es)?/g,"cm").replace(/mm  ?in/g,"mm").replace(/50 mm ? 1/g,"2 in 1").replace(/50 mm ? ?-1/g,"2-in-1").replace(/76 mm ? 1/g,"3 in 1").replace(/76 mm ? ?-1/g,"3-in-1");

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
	if (disabled) {
		return;
	}

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
	},pollingRate)
}

onjQueryAvailable();
