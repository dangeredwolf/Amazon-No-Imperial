/*
	noimperial.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/

'use strict';

let baseUrl;
let matchStr = ".sims-fbt-checkbox-label>span:not(.sims-fbt-this-item),.aplus-module-wrapper tbody>tr>td p,title,.shelf-label-variant-name,#aplus,#importantInformation .content,.textContainer__text,#hero-quick-promo a,#product-specification-table td,.a-color-price,.sponsored-products-truncator-truncated,.twisterShelf_swatch_text,.a-color-price>span,.a-list-item,.disclaim>strong,.content li:not(#SalesRank),.giveaway-product-title span,.a-size-base-plus,.description,#productDescription,.p13n-sc-truncated,.a-size-base,#productTitle,.a-row>.selection,.a-button-text .a-size-base,.a-link-normal,.a-spacing-base,.ivVariations,#ivTitle,.sponsored-products-truncator-truncated,.a-spacing-mini,#prodDetails strong,#productDescription strong";
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
	return str.match(/(\d|\.)+(\s|-)?(mil)[^le]/g)
}

function findInch(str) {
	if (str.match(/\d\d\d\d in/g) !== null) { // no years in
		return null;
	}
	return str.match(/(\d|\.| ?½)+(\s|-)?(inches|inch|in\.?|Inches|Inch|”|In\.?|\")/g)
}

function findGallon(str) {
	return str.match(/(\d|\.)+(\s|-)?(Gallons?|gallons?|gal\.?|Gal\.?)/g)
}

function findGPM(str) {
	return str.match(/(\d|\.)+(\s|-)?(GPM|gpm|Gpm)/g)
}

function findQuart(str) {
	return str.match(/(\d|\.)+(\s|-)?(quarts?|qt\.?|Quarts?)/g)
}

function findInchArray(str) {
	return str.match(/(((\d|\.)+\s?(\*|x|by)\s?)?(\d|\.)+\s?(\*|x|by)\s?(\d|\.)+\s?(((i|I)nch(es)?)|in)|((\(?(i|I)nch(es)?))\s?\s?((\d|\.)+\s?(\*|x|by)\s?)?((\d|\.)+\s?(\*|x|by)\s?)(\d|\.)+)/g)
}

function findFeet(str) {
	return str.match(/((\d|\.)+(\'))|((\d|\.)+\s?(x|\*|by)\s?)?((\d|\.)+ ?(x|\*\ ) ?)?(\d|\.)+(\s|-)?(feet|foot|ft|Feet|Foot|\'|FT|Ft)/g)
}

function findOunce(str) {
	return str.match(/(\d|\.)+(\s|-)+?(oz\.?|ounces?|Ounces?|Oz\.?|OZ\.?)/g)
}

function findFluidOunce(str) {
	return str.match(/(\d|\.)+\s?(fl\.? oz\.?|floz|fluid oz\.?|fluid ounc?e?s?|Fluid ounc?e?s?|fluid Ounc?e?s?|Fluid Ounc?e?s?|fl\.? ounc?e?s?|Fl\.? ?Oz\.?|Fl\.? ?oz\.?|FL\.? OZ\.?)/g)
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

function findPound(str) {
	return str.match(/(\d|\.)+(\s)+?(lbs?|pounds?|Pounds?|LBS?|Lbs?)/g)
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

function findMiles(str) {
	return str.match(/(\d|\.)+ ?(miles?|Miles?|mi\.|Mi\.(^\.\.))/g)
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

function convertMiles(mph) {
	let conversion = (mph * 1.60934);

	return Math.floor(conversion + .5) + " km"
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

function convertGallon(gal) {
	let conversion = roundMe(gal * 3.7854);

	if (conversion >= 1) {
		return conversion + " L "
	} else {
		return Math.floor(conversion*1000) + " mL "
	}
}

function convertGPM(gal) {
	let conversion = roundMe(gal * 3.7854);

	return conversion + " L/min "
}

function convertQuart(qt) {
	console.log(qt)
	let conversion = roundMe10(qt * 946.353);

	if (conversion >= 1) {
		return conversion + " L"
	} else {
		return Math.floor(conversion) + " mL"
	}
}

function convertFluidOunce(ounce) {
	console.log(ounce)
	let conversion = roundMe(ounce * 29.5735);

	if (conversion >= 1000) {
		return roundMe(conversion/1000) + " L"
	} else {
		let temp = Math.ceil(conversion) + " mL";

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
		let asdf = Math.floor(conversion+.5);
		if (asdf.toString().substring(1,2) === "99") {
			asdf = asdf + 1;
		}
		console.log(asdf.toString().substring(1,2))
		return asdf + "g "
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

	if (conversion >= 998) {
		return roundMe(conversion/1000) + " kg"
	} else {
		let asdf = Math.floor(conversion+.5);
		if (asdf.toString().substring(1,2) === "99") {
			asdf = asdf + 1;
		}
		console.log(asdf.toString().substring(1,2))
		return asdf + "g "
	}
}

function convertInch(inch) {
	let conversion = roundMe(inch * 25.4);
	let result = "";
	if (conversion >= 1000) {
		result = roundMe(conversion/1000) + " m "
	} else if (conversion > 100) {
		result = roundMe10(conversion/10) + " cm "
	} else {
		result = Math.floor(conversion) + " mm "
	}

	if (result === "9 mm ") { // hack to get around rounding errors
		return "10 mm ";
	}
	if (result === "99 mm ") { // hack to get around rounding errors
		return "100 mm ";
	}
	return result
}

function convertMil(mil) {
	let conversion = roundMe(mil * 25.4);

	return Math.floor(conversion+.5) + " µm"
}

function convertFeet(feet) {
	let conversion = roundMe(feet * 0.3048);

	let result = ""

	if (conversion >= 1) {
		result = roundMe10(conversion) + " m "
	} else {
		result = roundMe10(conversion*100) + " cm "
	}

	if (result === "3.05 m ") { // 10 ft -> 3 m
		return "3 m"
	}

	return result;
}

function roundMe(val) {
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

	if (rounded === NaN) {
		console.error('what (roundMe)');
		console.error(val);
	}
	return rounded;
}

function roundMe10(val) {
	let rounded = Math.floor((val * 10) + .05)/10;

	if (rounded.toString().match(/9\.9/g) !== null) {
		rounded = rounded + .1
	}

	if (rounded === NaN) {
		console.error('what (roundMe10)');
		console.error(val);
	}

	return rounded;
}

function metricateStr(str) {

	// get rid of fractions
	if (findInch(str) !== null || findGallon(str) !== null) {
		console.log(str)

		str = str.replace(/\-?(1 ?\/ ?2|½)/g,".5");
		str = str.replace(/\-?(1 ?\/ ?3|⅓)/g,".333333");
		str = str.replace(/\-?(2 ?\/ ?3|⅔)/g,".666666");
		str = str.replace(/\-?(1 ?\/ ?4|¼)/g,".25");
		str = str.replace(/\-?(3 ?\/ ?4|¾)/g,".75");
		str = str.replace(/\-?(1 ?\/ ?5|⅕)/g,".2");
		str = str.replace(/\-?(2 ?\/ ?5|⅖)/g,".4");
		str = str.replace(/\-?(3 ?\/ ?5|⅗)/g,".6");
		str = str.replace(/\-?(4 ?\/ ?5|⅘)/g,".8");
		str = str.replace(/\-?(1 ?\/ ?6|⅙)/g,".166667");
		str = str.replace(/\-?(5 ?\/ ?6|⅚)/g,".833333");
		str = str.replace(/\-?(1 ?\/ ?7|⅐)/g,".142857");
		str = str.replace(/\-?(2 ?\/ ?7)/g,".285714");
		str = str.replace(/\-?(3 ?\/ ?7)/g,".428571");
		str = str.replace(/\-?(4 ?\/ ?7)/g,".571428");
		str = str.replace(/\-?(5 ?\/ ?7)/g,".714285");
		str = str.replace(/\-?(6 ?\/ ?7)/g,".857143");
		str = str.replace(/\-?(1 ?\/ ?8|⅛)/g,".125");
		str = str.replace(/\-?(2 ?\/ ?8)/g,".25");
		str = str.replace(/\-?(3 ?\/ ?8|⅜)/g,".375");
		str = str.replace(/\-?(5 ?\/ ?8|⅝)/g,".625");
		str = str.replace(/\-?(7 ?\/ ?8|⅞)/g,".875");
		str = str.replace(/\-?(1 ?\/ ?9|⅑)/g,".11111");
		str = str.replace(/\-?(1 ?\/ ?10|⅒)/g,".1");
		str = str.replace(/\-?(1 ?\/ ?12)/g,".083333");
		str = str.replace(/\-?(5 ?\/ ?12)/g,".416667");
		str = str.replace(/\-?(7 ?\/ ?12)/g,".583333");
		str = str.replace(/\-?(11 ?\/ ?12)/g,".916667");
		str = str.replace(/\-?(1 ?\/ ?16)/g,".0625");
		str = str.replace(/\-?(2 ?\/ ?16)/g,".125");
		str = str.replace(/\-?(3 ?\/ ?16)/g,".1875");
		str = str.replace(/\-?(4 ?\/ ?16)/g,".25");
		str = str.replace(/\-?(5 ?\/ ?16)/g,".3125");
		str = str.replace(/\-?(6 ?\/ ?16)/g,".375");
		str = str.replace(/\-?(7 ?\/ ?16)/g,".4375");
		str = str.replace(/\-?(8 ?\/ ?16)/g,".5");
		str = str.replace(/\-?(9 ?\/ ?16)/g,".5625");
		str = str.replace(/\-?(10 ?\/ ?16)/g,".625");
		str = str.replace(/\-?(11 ?\/ ?16)/g,".6825");
		str = str.replace(/\-?(12 ?\/ ?16)/g,".75");
		str = str.replace(/\-?(13 ?\/ ?16)/g,".75");
		str = str.replace(/\-?(13 ?\/ ?16)/g,".8125");
		str = str.replace(/\-?(14 ?\/ ?16)/g,".875");
		str = str.replace(/\-?(15 ?\/ ?16)/g,".9375");

	}

	jQuery(findFahrenheit(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\-|\-|\d|\.)+/g));


		b = b.replace(/ ?((°|degrees?|Degrees?) ?F|℉)/g,"");

		jQuery(b.match(/(\-|\d)+/g)).each((c,d) => {
			let num2 = parseFloat(d.replace(/ ?((°|degrees?|Degrees?) ?F|℉)/g,"").match(/(\-|\-|\d|\.)+/g));
			str = str.replace(d,convertFahrenheit(num2));
		})

		str = str.replace(/ ?((°|degrees?|Degrees?) ?F|℉)/g,"");

	})

	jQuery(findInchArray(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));
		console.log(str)

		b = b.replace(/\s?(inches|inch|in)/g,"");
		console.log(b)

		let newStr = ""

		jQuery(b.match(/(\d|\.)+/g)).each((c,d) => {
			let num2 = parseFloat(d.match(/(\d|\.)+/g));
			let replaceMe = convertInch(num2);
			console.log(d);
			console.log(num2);
			console.log(replaceMe);
			//str = str.replace(d,replaceMe);
			newStr += replaceMe + " x "
		})

		newStr = newStr.substring(0,newStr.length-3);

		str = newStr;

	})

	jQuery(findBTU(str)).each((a,b) => {
		let num = parseFloat(b.replace(/(k|K)/g,"000").replace(/( |,)/g,"").match(/(\d|\.)+/g));

		if (num === NaN) {
			return;
		}

		let test = convertBTU(num);

		if (test.match("NaN") !== null)
			return;

		str = str.replace(b,test);
	})

	jQuery(findPSI(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		if (num === NaN) {
			return;
		}

		str = str.replace(b,convertPSI(num));
	})

	jQuery(findMilesPerHour(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertMilesPerHour(num));
	})

	jQuery(findMiles(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertMiles(num));
	})

	jQuery(findCubicInch(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicInch(num))
	})

	jQuery(findCFM(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCFM(num))
	})

	jQuery(findCubicFoot(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertCubicFoot(num))
	})

	jQuery(findPerPound(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerPound(num));
	})

	jQuery(findPerOunce(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertPerOunce(num));
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

	jQuery(findGPM(str)).each((a,b) => {
		let num = parseFloat(b.match(/(\d|\.)+/g));

		str = str.replace(b,convertGPM(num))
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
		str.match(/(tea|Tea|bottle|Bottle|soda|Soda|Cola|Coke|cola|coke|drink|Drink|Cans?|cans?|Water|water|Pepsi|Gatorade|Soap|soap|Detergent|detergent|Toilet Bowl Cleaner|Spray|Bathroom Cleaner|Cups?|cups?|Broth|milk|Milk|Juice|juice|Cream(er)?|Conditioner|Smoothie|Moisturizer|CC Creme|Gel|gel|Cleaner|cleaner|Spotter|spotter)/g) !== null
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


	str = str.replace(/\s?(inches|inch)/g,"").replace(/cm  ?in/g,"cm").replace(/cm  ?Inch(es)?/g,"cm").replace(/cm  ?inch(es)?/g,"cm").replace(/mm  ?in/g,"mm").replace(/50 mm ? 1/g,"2 in 1").replace(/50 mm ? ?-1/g,"2-in-1").replace(/76 mm ? 1/g,"3 in 1").replace(/76 mm ? ?-1/g,"3-in-1").replace(/76 mm ? the/g,"3 in the").replace(/30.12.7  ?cm  ?cm/g,"30.5 cm");

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
			(a,b) => {
				if (jQuery(b).is("[data-metricated]:not(.selection)")) {
					return;
				}
				metricateObj(jQuery(b));
				$(b).attr("data-metricated","true")
			}
		)
	},pollingRate)
}

onjQueryAvailable();
