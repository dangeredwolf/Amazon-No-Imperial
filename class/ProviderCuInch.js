import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderCuInch extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(cu\.?.?in\.?|cubic.in(ch|\.))|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(cu\.?.in\.?|cubic.in(ch|\.)))/gi;
		this.regexUppercase = /CUBIC IN(CH|\.)/g;
		this.regexCapitalized = /Cubic In(ch|\.)/g;
		this.regexLowercase = /cubic in(ch|\.)/g;
		this.regexAbbrev = /cu\.?.in\.?/gi;
		this.regexPlural = /inches/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 0.0163871);
	}

}
