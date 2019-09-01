import { Provider } from "./Provider.js";
import { MeasureKmH } from "./MeasureKmH.js";

export class ProviderMPH extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(miles? per hour|m\.?p\.?h\.?)|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]{0,2}(miles? per hour|m\.?p\.?h\.?))/gi;
		this.regexUppercase = /MILE/g;
		this.regexCapitalized = /Mile/g;
		this.regexLowercase = /mile/g;
		this.regexAbbrev = /m\.?p\.?h\.?/gi;
		this.regexPlural = /miles/gi;
	}

	convert(num) {
		return new MeasureKmH(num * 1.60934);
	}

}
