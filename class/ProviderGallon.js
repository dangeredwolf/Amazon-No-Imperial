import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderGallon extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?gal(lon)?|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+gal(lon)?)/gi;
		this.regexUppercase = /GAL/g;
		this.regexCapitalized = /Gal/g;
		this.regexLowercase = /gal/g;
		this.regexAbbrev = /gal(?!lon)/gi;
		this.regexPlural = /gal(lon)?s/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 3.7854);
	}

}
