import { Provider } from "./Provider.js";
import { MeasureLiterPerMinute } from "./MeasureLiterPerMinute.js";

export class ProviderCFM extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+\s+(c\.?f\.?m\.?)(?!\w)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(c\.?f\.?m\.?))/gi;
		this.regexUppercase = /(?!)/g;
		this.regexCapitalized = /(?!)/g;
		this.regexLowercase = /(?!)/g;
		this.regexAbbrev = /./g;
		this.regexPlural = /(?!)/g;
	}

	convert(num) {
		return new MeasureLiterPerMinute(num * 28.3168);
	}

}
