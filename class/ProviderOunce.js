import { Provider } from "./Provider.js";
import { MeasureGram } from "./MeasureGram.js";

export class ProviderOunce extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]{0,99}o(z|unce)[s\.]?|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+o(z|unce)[s\.]?)/gi;
		this.regexUppercase = /OUNCES?/g;
		this.regexCapitalized = /Ounces?/g;
		this.regexLowercase = /ounces?/g;
		this.regexAbbrev = /oz\.?/gi;
		this.regexPlural = /ounces/gi;
	}

	convert(num) {
		return new MeasureGram(num * 28.3495);
	}

}
