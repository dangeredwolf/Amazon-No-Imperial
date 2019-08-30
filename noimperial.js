/*
	metricamazon.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/
"use strict";

import { assert, findHelper, validate } from "./class/UtilityHelperFuncs.js";
import { ProviderMile } from "./class/ProviderMile.js";
import { ProviderYard } from "./class/ProviderYard.js";
import { ProviderFeet } from "./class/ProviderFeet.js";
import { ProviderInch } from "./class/ProviderInch.js";
import { ProviderMil } from "./class/ProviderMil.js";

import { ProviderGallonPerMinute } from "./class/ProviderGallonPerMinute.js";

import { ProviderGallon } from "./class/ProviderGallon.js";
import { ProviderQuart } from "./class/ProviderQuart.js";
import { ProviderPint } from "./class/ProviderPint.js";
import { ProviderCup } from "./class/ProviderCup.js";
import { ProviderFluidOunce } from "./class/ProviderFluidOunce.js";

import { ProviderPound } from "./class/ProviderPound.js";
import { ProviderOunce } from "./class/ProviderOunce.js";

import { ProviderFahrenheit } from "./class/ProviderFahrenheit.js";

import { ProviderFraction } from "./class/ProviderFraction.js";

import { roundMe, roundMe10, roundMe100 } from "./class/UtilityRounding.js";


let baseUrl;
let matchStr = ".askAnswersAndComments span,span.a-size-base-plus.a-color-base.a-text-normal,td.bucket>.content>ul>li,.size-weight>td.value,.shipping-weight>td.value,.textContainer__text,.a-dropdown-item,.aplus-module-wrapper>.apm-sidemodule,p,.a-expander-content,.sims-fbt-checkbox-label>span:not(.sims-fbt-this-item),.aplus-module-wrapper tbody>tr>td p,title,.shelf-label-variant-name,#aplus,#importantInformation .content,.textContainer__text,#hero-quick-promo a,#product-specification-table td,.a-color-price,.sponsored-products-truncator-truncated,.twisterShelf_swatch_text,.a-color-price>span,.a-list-item,.disclaim>strong,.content li:not(#SalesRank),.giveaway-product-title span,.a-size-base-plus,.description,#productDescription,.p13n-sc-truncated,.a-size-base,#productTitle,.a-row>.selection,.a-button-text .a-size-base,.a-link-normal,.a-spacing-base,.ivVariations,#ivTitle,.a-spacing-mini,#prodDetails strong,#productDescription strong";
let excludeStr =
// ".a-expander-content," +
// ".a-expander-container," +
".a-text-beside-button," +
".twister-dropdown-highlight," +
"#variation_size_name," +
"#product-specification-table," +
".p13n-asin>span," +
".p13n-asin>span>span," +
".sims-fbt-seller-info," +
".sims-fbt-checkbox-label," +
".sims-fbt-image-box>li," +
".sims-fbt-image-box>li>span," +
".sims-fbt-image-box>li>span>a," +
".feed-carousel-card>span," +
".feed-carousel-card>span>a," +
".feed-carousel-card," +
".feed-carousel-shelf," +
".issuance-banner a," +
"span[data-component-type=\"s-in-cart-badge-component\"]," +
".sims-fbt-image-box," +
".zg-text-center-align," +
// ".a-section," +
".issuance-banner li," +
"#ap-options," +
"[data-action=\"main-image-click\"]," +
".a-button-input," +
".a-button," +
".a-button-inner," +
".a-price," +
".a-profile," +
".abb-selected-variation," +
".abb-option>.a-list-item," +
".a-radio";
let matchStrInline = ".a-list-item,.selection,.a-dropdown-item";
let disabled = false;
let pollingRate = 1000; // 1s
let isFluid = false;
let fluidInclude = /(SPRAY|Mascara|Sunscreen|water|Water|Water Bottle|tea|Tea|bottle|Bottle|soda|Soda|Cola|Coke|cola|coke|drink|Drink|Cans?|cans?|Water|water|Pepsi|Gatorade|Soap|soap|Detergent|detergent|Toilet Bowl Cleaner|Spray|Bathroom Cleaner|Cups?|cups?|Broth|milk|Milk|Juice|juice|Cream(er)?|Conditioner|Smoothie|Moisturizer|CC Creme|Gel|gel|Cleaner|cleaner|Spotter|spotter)/g;
let fluidExclude = /(Bunches of Oats|cereal|Cereal|Kellogg\'s|Residual|Stick|Pudding|Shells & Cheese|Easy Mac|Cookie|Cracker|Ketchup|Sheer Physical|UltiMATTE|Face Stick|Ultra Sport Sunscreen Spray|Sunscreen Sport Performance|Continuous( Sunscreen)? Spray( Broad Spectrum)?|Candy|Candies|candies|candy|gum|Gum|Canister|canister|Ground Coffee|Steak|Slices)/g;

var g_bannedtags = [
	'STYLE',
	'SCRIPT',
	'NOSCRIPT',
	'TEXTAREA',
	'IFRAME',
	'IMG',
	'I',
	'DIV',
	'TBODY',
	'IMG',
	'LABEL'
];

if (typeof urlExchange === "object" && typeof urlExchange.getAttribute === "function") {
	baseUrl = urlExchange.getAttribute("type");
	console.info("urlExchange completed with URL " + baseUrl);
} else {
	throw "uh... where is urlExchange?";
}

function findGPM(str) {
	return str.match(/(\d|\.)+(\s|-)?(GPM|gpm|Gpm)/g)
}

function findOunce(str) {
	return str.match(/(\d|\.)+(\s|-)?(oz\.?|ounces?|Ounces?|Oz\.?|OZ\.?)/g)
}

function findCubicFoot(str) {
	return str.match(/(\d|\.)+.?(cu\.? ?ft\.?|cubic.feet|cubic.foot|Cubic.feet|Cubic.foot|Cubic.Feet|Cubic.Foot|Cu\.? ?ft\.?|Cu\. ?Ft\.?)/g)
}

function findCFM(str) {
	return str.match(/(\d|\.)+.?(cfm|CFM|C\.F\.M\.?|c\.f\.m\.?)/g)
}

function findCubicInch(str) {
	return str.match(/(\d|\.)+.?(cu\.? ?in\.?|cubic.inches|cubic.inch|Cubic.inches|Cubic.inch|Cubic.Inches|Cubic.Inch|Cu\.? ?in\.?|Cu\. ?In\.?)/g)
}

function findSquareFoot(str) {
	return str.match(/(\d|\.)+.?(sq\.? ft\.?|square.feet|square.foot|Square.foot|Square.feet|Square.Foot|Square.Feet|SQ\.? FT\.?|Sq\.? Ft\.?)/g)
}

function findSquareInch(str) {
	return str.match(/(\d|\.)+.?(sq\.? in\.?|square.inches|square.inch|Square.inches|Square.inch|Square.inches|Square.inch|SQ IN|Sq\.? In\.?)/g)
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

function findMilesPerHour(str) {
	return str.match(/(\d|\.)+ ?(mph|MPH|miles? per hour|miles?\/hour|mi\/h|miles? an hour|Miles? Per Hour|Miles? per Hour|Miles? per hour)/g)
}

function findFahrenheit(str) {
	return str.match(/((\-|\-|\d|\.)+ ?(-|to) ?)?(\-|\-|\d|\.)+ ?((°|degrees?|Degrees?|degs?|Degs?) ?F(ahrenheit)?|℉)/g)
}

function findPSI(str) {
	return str.match(/(\d)+ ?(PSIG?|psig?|Psig?|p\.s\.i\.?(g\.)?)/g)
}

function findBTU(str) {
	return str.match(/((\d|,| )+(k|K)? ?(btus?|BTUS?|Btus?|BTUs?)|([^A-Za-z](btus?|BTUS?|Btus?|BTUs?) ?(\d|,| )+(k|K)?))/g)
}

function convertFahrenheit(f) {
	let conversion = (f - 32) * (5/9);

	return Math.floor(conversion + .5) + " °C"
}

function convertBTU(btu) {
	let conversion = btu /3.412;
	conversion = Math.floor(conversion + .5)

	if (conversion >= 10000) {
		return " " + Math.floor(conversion/1000) + " kW"
	} else {
		return " " + Math.floor(conversion + .5) + " W"
	}
}

function convertPSI(psi) {
	let conversion = psi * 6.894;

	return Math.floor(conversion/50)*50 + " kPa"
}

function convertMilesPerHour(mph) {
	let conversion = (mph * 1.60934);

	return Math.floor(conversion + .5) + " km/h"
}

function convertCFM(cuft) {
	let conversion = (cuft * 28316.8);

	return Math.floor(conversion/100000)*100 + " L/min"

}

function convertCubicFoot(cuft) {
	let conversion = (cuft * 28316.8);

	if (conversion >= 1000) {
		return roundMe10(conversion/1000) + " L"
	} else {
		return Math.floor(conversion + .5) + " mL"
	}
}

function convertCubicInch(cuin) {
	let conversion = (cuin * 16.387);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " L"
	} else {
		return Math.floor(conversion  + .5) + " mL"
	}
}

function convertSquareFoot(sqft) {
	let conversion = (sqft * 0.092903);

	if (conversion >= 1) {
		return roundMe(conversion) + " m²"
	} else {
		return roundMe10(conversion*100 + .5) + " cm²"
	}
}

function convertSquareInch(sqin) {
	let conversion = (sqin * 0.00064516);

	if (conversion >= 1) {
		return roundMe(conversion) + " m²"
	} else {
		return roundMe10(conversion*100 + .5) + " cm²"
	}
}

function convertGPM(gal) {
	let conversion = roundMe(gal * 3.7854);

	return conversion + " L/min "
}

function convertPerFluidOunce(ounce) {
	console.log(ounce)
	let conversion = ounce / 0.029573509718662;

	if (conversion > 100) {
		return ("($" + roundMe100(conversion/10) + " / 100mL)");
	} else {
		return ("($" + roundMe100(conversion) + " / L)");
	}
}

function convertPerOunce(ounce) {
	console.log(ounce)
	let conversion = ounce / 0.0283495;


	if (conversion > 100) {
		return ("($" + roundMe100(conversion/10) + " / 100g)");
	} else {
		return ("($" + roundMe100(conversion) + " / kg)");
	}

	return
}

function convertPerPound(pound) {
	console.log(pound)
	let conversion = roundMe100(pound / 0.453592);

	return "($" + roundMe(conversion) + " / kg)"
}

function metricateStr(str, forceFluid) {

	// get rid of fractions
	console.log(str);

	str = new ProviderFraction().find(str);

	let oldStr = str;

	str = new ProviderMile().find(str);
	str = new ProviderYard().find(str);
	str = new ProviderFeet().find(str);
	str = new ProviderInch().find(str);
	str = new ProviderMil().find(str);

	str = new ProviderGallonPerMinute().find(str);

	str = new ProviderGallon().find(str);
	str = new ProviderQuart().find(str);
	str = new ProviderPint().find(str);
	str = new ProviderCup().find(str);
	str = new ProviderFluidOunce().find(str);

	str = new ProviderPound().find(str);
	str = new ProviderOunce().find(str);

	str = new ProviderFahrenheit().find(str);

	jQuery(findBTU(str)).each((a,b) => {
		let num = parseFloat(b.replace(/(k|K)/g,"000").replace(/( |,)/g,"").match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		let test = convertBTU(num);

		if (test.match("NaN") !== null)
			return;

		str = str.replace(b,test);
	})

	jQuery(findPSI(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertPSI(num));
	})

	jQuery(findMilesPerHour(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertMilesPerHour(num));
	})

	jQuery(findCubicInch(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertCubicInch(num))
	})

	jQuery(findCFM(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertCFM(num))
	})

	jQuery(findCubicFoot(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertCubicFoot(num))
	})

	jQuery(findPerPound(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertPerPound(num));
	})

	jQuery(findPerOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		// We have to do some inferencing because "ounce" is ambiguous between fluid ounce and ounce
		if (forceFluid) {
			// str = str.replace(b,convertFluidOunce(num));
		}

		str = str.replace(b,convertPerOunce(num));
	})

	jQuery(findPerFluidOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertPerFluidOunce(num))
	})

	jQuery(findGPM(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertGPM(num))
	})

	jQuery(findSquareInch(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertSquareInch(num))
	})

	jQuery(findSquareFoot(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		str = str.replace(b,convertSquareFoot(num))
	})

	jQuery(findOunce(str)).each((a,b) => {

		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (isNaN(num)) {
			return;
		}

		// We have to do some inferencing because "ounce" is ambiguous between fluid ounce and ounce
		if ((str.match(fluidInclude) !== null && str.match(fluidExclude) === null) || forceFluid) {
			// str = str.replace(b,convertFluidOunce(num));
		}

		// str = str.replace(b,convertOunce(num));
		// console.log(convertOunce(num))
	})


	str = str.replace(/\s?(inches|inch)/g,"").replace(/cm  ?in/g,"cm").replace(/cm  ?Inch(es)?/g,"cm").replace(/cm  ?inch(es)?/g,"cm").replace(/mm  ?in/g,"mm").replace(/50 mm ? 1/g,"2 in 1").replace(/50 mm ? ?-1/g,"2-in-1").replace(/76 mm ? 1/g,"3 in 1").replace(/76 mm ? ?-1/g,"3-in-1").replace(/76 mm ? the/g,"3 in the").replace(/30.12.7  ?cm  ?cm/g,"30.5 cm");

	return str;
}

function canMetricate(str) {
	return true
}

function metricateObj(obj, forceFluid) {
	if (typeof obj === "undefined") {
		return;
	}

	if (!jQuery(obj).is(matchStr)) {
		//return
	}

	if (typeof obj.attributeName !== "undefined") {
		jQuery(obj.addedNodes).each((a,b) => metricateObj(jQuery(b), forceFluid));
		return;
	}

	if (typeof obj.attr("title") !== "undefined") {
		obj.attr("title",metricateStr(obj.attr("title")));
	}

	if (typeof jQuery(obj).contents() === "undefined" || jQuery(obj).contents().length <= 0) {
		return;
	}

	jQuery(obj).contents().each((a,b) => {

		try {
			if (typeof b !== "string" && jQuery(b).is(excludeStr)) {
				console.log("Excluded item: ",b);
				return;
			}
		} catch(e) {
			//console.error(b)
		}

		if (typeof b.textContent !== "undefined") {

			if ($.inArray(b.tagName, g_bannedtags) !== -1 ) return;

			if (canMetricate(b.textContent))
				b.textContent = metricateStr(b.textContent, forceFluid)
				//jQuery(b).html(metricateStr(jQuery(b).html()))
			} else {
				metricateObj(jQuery(b), forceFluid);
			}
		}
	)
}

function onjQueryAvailable() {
	if (disabled) {
		return;
	}

	let isProductPage = document.location.pathname.substr(0,3) === "/dp";

	if (typeof jQuery === "undefined") {
		setTimeout(onjQueryAvailable,10);
		return;
	}

	if ($("#productTitle").length <= 0 && isProductPage) {
		console.log("waiting for product title...");
		setTimeout(onjQueryAvailable,10);
		return;
	}

	let title = $("#productTitle").html();

	// We have to do some inferencing because "ounce" is ambiguous between fluid ounce and ounce
	if (isProductPage && title.match(fluidInclude) !== null && title.match(fluidExclude) === null) {
		isFluid = true;
		console.log("Detecting that it's a fluid")
	}

	jQuery(matchStrInline).each(
		(a,b) => metricateObj(jQuery(b), isFluid)
	)

	jQuery(matchStr).each(
		(a,b) => metricateObj(jQuery(b),isFluid && jQuery(b).is(matchStrInline))
	)

	setInterval(() => {
		window.$ = jQuery;
		var $ = jQuery;
		jQuery(matchStr).each(
			(a,b) => {
				if (jQuery(b).is("[data-metricated]:not(.selection)")) {
					return;
				}
				metricateObj(jQuery(b),isFluid && jQuery(b).is(matchStrInline));
				$(b).attr("data-metricated","true")
			}
		)
	},pollingRate)
}

onjQueryAvailable();
