import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderPint extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?p(in)?t|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+p(in)?t)/gi;
		this.regexUppercase = /PINT/g;
		this.regexCapitalized = /Pint/g;
		this.regexLowercase = /pint/g;
		this.regexAbbrev = /pt/gi;
		this.regexPlural = /pints/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 0.473176);
	}

}
