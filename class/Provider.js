import { assert, findHelper, validate } from "./UtilityHelperFuncs.js";

export class Provider {

	regexFind;
	regexUppercase;
	regexCapitalized;
	regexLowercase;
	regexAbbrev;
	regexPlural;
	regexDash = /\-/g;
	regexPlus = /\+(?=\d)/g;
	regexMatchDigit = /[\d\.]+/g;

	constructor() {
		return this;
	}

	convert() {
		return null; // you can't convert an empty provider
	}

	find(str) {
		return findHelper(str, this.regexFind, (results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(this.regexUppercase) !== null) {
					formatLevel = 3;
				} else if (result.match(this.regexCapitalized) !== null) {
					formatLevel = 2;
				} else if (result.match(this.regexLowercase) !== null) {
					formatLevel = 1;
				} else if (result.match(this.regexAbbrev) !== null) {
					formatLevel = 0;
				}

				if (result.match(this.regexDash) !== null) {
					useDash = true;
				}

				if (result.match(this.regexPlural) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, this.convert(parseFloat(result.replace(this.regexPlus,"").match(this.regexMatchDigit))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}

}
