import { Provider } from "./Provider.js";
import { MeasurePascal } from "./MeasurePascal.js";

export class ProviderPSI extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+\s+(psi)(?!\w)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(psi))/gi;
		this.regexUppercase = /(?!)/g;
		this.regexCapitalized = /(?!)/g;
		this.regexLowercase = /(?!)/g;
		this.regexAbbrev = /(?!)/g;
		this.regexPlural = /(?!)/g;
	}

	convert(num) {
		return new MeasurePascal(num * 6894.76);
	}

}
