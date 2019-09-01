import { Provider } from "./Provider.js";
import { MeasureSqMeter } from "./MeasureSqMeter.js";

export class ProviderSqInch extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(sq\.?.?in\.?|square.in(ch|\.))|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(sq\.?.in\.?|square.in(ch|\.)))/gi;
		this.regexUppercase = /SQUARE IN(CH|\.)/g;
		this.regexCapitalized = /Square In(ch|\.)/g;
		this.regexLowercase = /square in(ch|\.)/g;
		this.regexAbbrev = /sq\.?.in\.?/gi;
		this.regexPlural = /inches/gi;
	}

	convert(num) {
		return new MeasureSqMeter(num * 0.00064516);
	}

}
