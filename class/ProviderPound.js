import { Provider } from "./Provider.js";
import { MeasureGram } from "./MeasureGram.js";

export class ProviderPound extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(pound|lb)s?|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+(pound|lb)s?)/gi;
		this.regexUppercase = /POUNDS?/g;
		this.regexCapitalized = /Pounds?/g;
		this.regexLowercase = /pounds?/g;
		this.regexAbbrev = /lbs?/gi;
		this.regexPlural = /pounds/gi;
	}

	convert(num) {
		return new MeasureGram(num * 453.592);
	}

}
