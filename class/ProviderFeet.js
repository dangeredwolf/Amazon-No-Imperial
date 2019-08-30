import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderFeet extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?f[oe]?[oe]?t|[\d\.]+[\'](?!\w)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|\/)[\dtobyrx\s\/\.]+f([eo][eo])?t)/gi;
		this.regexUppercase = /F[EO][EO]T/g;
		this.regexCapitalized = /F[eo][eo]t/g;
		this.regexLowercase = /f[eo][eo]t/g;
		this.regexAbbrev = /ft|\'/gi;
		this.regexPlural = /e/gi;
	}

	convert(num) {
		return new MeasureMeter(num * 0.3048);
	}

}
