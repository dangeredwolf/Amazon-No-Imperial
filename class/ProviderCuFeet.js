import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderCuFeet extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(cu\.?.?ft\.?|cubic.?f[oe]?[oe]?t)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/)[\dtobyrxan\s\/\.]+(cu\.?.ft\.?|cubic.?f([eo][eo])?t))/gi;
		this.regexUppercase = /CUBIC.F[EO][EO]T/g;
		this.regexCapitalized = /Cubic.F[eo][eo]t/g;
		this.regexLowercase = /cubic.f[eo][eo]t/g;
		this.regexAbbrev = /cu\.?.ft\.?/gi;
		this.regexPlural = /e/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 28.3168);
	}

}
