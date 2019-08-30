import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderInch extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?inche?s?|[\d\.]+[\.\-]?(in|\")(?!-)|[\d\.]+(?=[\s\-]+(x|to|by|or|-|\*|\/)[\dtobyrx\s\/\.\*\+-]+inch)|[\d\.]+(?=\-\d+\s?inch)/gi;
		this.regexUppercase = /INCH/g;
		this.regexCapitalized = /Inch/g;
		this.regexLowercase = /inch/g;
		this.regexAbbrev = /(in|\"|”)/gi;
		this.regexPlural = /es/gi;
	}

	convert(num) {
		return new MeasureMeter(num * 0.0254);
	}

}
