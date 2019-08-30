import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderQuart extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?q(uar)?t|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+q(uar)?t)/gi;
		this.regexUppercase = /QUART/g;
		this.regexCapitalized = /Quart/g;
		this.regexLowercase = /quart/g;
		this.regexAbbrev = /qts?/gi;
		this.regexPlural = /quarts/gi;
	}


	convert(num) {
		return new MeasureLiter(num * 0.946353);
	}

}
