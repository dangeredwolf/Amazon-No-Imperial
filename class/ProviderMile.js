import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderMile extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?miles?|[\d\.]+(?=[\s\-]?(by|x|\*|\-|to|or|\/)[\s\-\d]+mile)|[\d\.]+\s+(mi)(?!\w)/gi;
		this.regexUppercase = /MILE/g;
		this.regexCapitalized = /Mile/g;
		this.regexLowercase = /mile/g;
		this.regexAbbrev = /[mM]i\.?/g;
		this.regexPlural = /miles/gi;
	}

	convert(num) {
		return new MeasureMeter(num * 1.60934);
	}

}
