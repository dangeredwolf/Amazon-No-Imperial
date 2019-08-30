import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderYard extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?ya?r?ds?|[\d\.]+(?=[\s\-]?(by|x|\*|\-|to|or|\/)[\s\-\d]+yard)/gi;
		this.regexUppercase = /YARD/g;
		this.regexCapitalized = /Yard/g;
		this.regexLowercase = /yard/g;
		this.regexAbbrev = /yds?/gi;
		this.regexPlural = /y(ar)?ds/gi;
	}

	convert(num) {
		return new MeasureMeter(num * 0.9144);
	}

}
