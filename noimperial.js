/*
	metricamazon.js
	Copyright (c) 2019 dangeredwolf
	Released under the MIT licence

	made with love <3

*/
"use strict";


import { assert, findHelper, validate } from "./class/UtilityHelperFuncs.js";
import { roundMe, roundMe10, roundMe100 } from "./class/UtilityRounding.js";
import { checkStringForFluid } from "./class/UtilityFluidDetector.js";

import { ProviderMile } from "./class/ProviderMile.js";
import { ProviderYard } from "./class/ProviderYard.js";
import { ProviderFeet } from "./class/ProviderFeet.js";
import { ProviderInch } from "./class/ProviderInch.js";
import { ProviderMil } from "./class/ProviderMil.js";

import { ProviderSqFeet } from "./class/ProviderSqFeet.js";
import { ProviderSqInch } from "./class/ProviderSqInch.js";

import { ProviderCuFeet } from "./class/ProviderCuFeet.js";
import { ProviderCuInch } from "./class/ProviderCuInch.js";

import { ProviderCFM } from "./class/ProviderCFM.js";

import { ProviderMPH } from "./class/ProviderMPH.js";

import { ProviderGallonPerMinute } from "./class/ProviderGallonPerMinute.js";

import { ProviderGallon } from "./class/ProviderGallon.js";
import { ProviderQuart } from "./class/ProviderQuart.js";
import { ProviderPint } from "./class/ProviderPint.js";
import { ProviderCup } from "./class/ProviderCup.js";
import { ProviderFluidOunce } from "./class/ProviderFluidOunce.js";

import { ProviderPound } from "./class/ProviderPound.js";
import { ProviderOunce } from "./class/ProviderOunce.js";

import { ProviderPerPound } from "./class/ProviderPerPound.js";
import { ProviderPerOunce } from "./class/ProviderPerOunce.js";
import { ProviderPerFluidOunce } from "./class/ProviderPerFluidOunce.js";

import { ProviderFahrenheit } from "./class/ProviderFahrenheit.js";
import { ProviderBTU } from "./class/ProviderBTU.js";
import { ProviderPSI } from "./class/ProviderPSI.js";

import { ProviderFraction } from "./class/ProviderFraction.js";

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
".a-radio," +
".a-icon-star," +
"#SalesRank," +
"#SalesRank>*";
let matchStrInline = ".a-list-item,.selection,.a-dropdown-item";
let disabled = false;
let pollingRate = 1000; // 1s
let isFluid = false;

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

function metricateStr(str, forceFluid) {

	console.log(str);

	let superOldString = str;

	str = new ProviderFraction().find(str); // get rid of fractions

	let oldStr = str;

	let fluid = isFluid || checkStringForFluid(str);

	str = new ProviderMile().find(str);
	str = new ProviderYard().find(str);
	str = new ProviderFeet().find(str);
	str = new ProviderInch().find(str);
	str = new ProviderMil().find(str);

	str = new ProviderSqFeet().find(str);
	str = new ProviderSqInch().find(str);

	str = new ProviderMPH().find(str);

	str = new ProviderCuFeet().find(str);
	str = new ProviderCuInch().find(str);

	str = new ProviderGallonPerMinute().find(str);
	str = new ProviderCFM().find(str);

	str = new ProviderGallon().find(str);
	str = new ProviderQuart().find(str);
	str = new ProviderPint().find(str);
	// str = new ProviderCup().find(str);
	str = new ProviderPerFluidOunce().find(str);
	str = new ProviderFluidOunce().find(str);

	str = new ProviderPound().find(str);

	if (fluid) {
		str = new ProviderPerFluidOunce(fluid).find(str);
		str = new ProviderFluidOunce(fluid).find(str);
	}
	str = new ProviderOunce().find(str);

	str = new ProviderPerPound().find(str);
	str = new ProviderPerOunce().find(str);

	str = new ProviderFahrenheit().find(str);
	str = new ProviderBTU().find(str.replace(/K(?=(\s+btu))/gi,"000"));
	str = new ProviderPSI().find(str);

	if (str === oldStr) {
		return superOldString;
	}

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

	let isProductPage = document.location.pathname.match(/\/dp\//g) !== null;

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
	if (isProductPage && checkStringForFluid(title)) {
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
