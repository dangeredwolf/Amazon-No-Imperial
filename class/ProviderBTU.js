import { Provider } from "./Provider.js";
import { MeasureWatt } from "./MeasureWatt.js";

export class ProviderBTU extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\s\-]{0,1}(btu)(?!\w)|[\d\.]+(?=[\s]{0,4}(x|to|by|or|and|\/|\-)[\d\-tobyrxan\s\/\.]+(btu))/gi;
		this.regexUppercase = /(?!)/g;
		this.regexCapitalized = /(?!)/g;
		this.regexLowercase = /(?!)/g;
		this.regexAbbrev = /(?!)/g;
		this.regexPlural = /(?!)/g;
	}

	convert(num) {
		return new MeasureWatt(num * 0.29307106944);
	}

}
