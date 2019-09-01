import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderInch extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?inche?s?|[\d\.]+[\.\-]? ?(in|\"|\'\'|”)(?!-)|[\d\.]+(?=[\s\-]{0,5}(x|to|by|or|and|-|\*|\/)[\dtobyrxan\s\/\.\*\+-]+inch)|[\d\.]+(?=\-\d+\s?inch)|[\d\.]+\s?in$/gi;
		this.regexUppercase = /INCH/g;
		this.regexCapitalized = /Inch/g;
		this.regexLowercase = /inch/g;
		this.regexAbbrev = /(in|\"|”|\'\')/gi;
		this.regexPlural = /es/gi;
	}

	convert(num) {
		return new MeasureMeter(num * 0.0254);
	}

}
