import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderCup extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?cups?|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+cups?)/gi;
		this.regexUppercase = /CUPS?/g;
		this.regexCapitalized = /Cups?/g;
		this.regexLowercase = /cups?/g;
		this.regexAbbrev = /(?!)/g;
		this.regexPlural = /cups/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 0.236588);
	}

}
