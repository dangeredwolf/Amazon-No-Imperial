import { Provider } from "./Provider.js";
import { MeasureSqMeter } from "./MeasureSqMeter.js";

export class ProviderSqFeet extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(sq\.?.?ft\.?|square.?f[oe]?[oe]?t)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(sq\.?.ft\.?|square.?f([eo][eo])?t))/gi;
		this.regexUppercase = /SQUARE F[EO][EO]T/g;
		this.regexCapitalized = /Square F[eo][eo]t/g;
		this.regexLowercase = /square f[eo][eo]t/g;
		this.regexAbbrev = /sq\.?.ft\.?/gi;
		this.regexPlural = /e/gi;
	}

	convert(num) {
		return new MeasureSqMeter(num * 0.092903);
	}

}
