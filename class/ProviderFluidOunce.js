import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { ProviderOunce } from "./ProviderOunce.js";

export class ProviderFluidOunce extends Provider {

	constructor(fluid) {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?fl(uid)?[-\s\.]{0,2}o(z|unce)[s\.]?|[\d\.]+(?=[\s\-]?(\-|to|\/|or)[\s\-\d]+fl(uid)?[-\s\.]{0,2}o(z|unce)[s\.]?)/gi;
		this.regexUppercase = /FLUID/g;
		this.regexCapitalized = /Fluid/g;
		this.regexLowercase = /fluid/g;
		this.regexAbbrev = /fl\.?\s/gi;
		this.regexPlural = /ounces/gi;

		if (fluid) {
			this.regexFind = new ProviderOunce().regexFind;
			this.regexUppercase = new ProviderOunce().regexUppercase;
			this.regexCapitalized = new ProviderOunce().regexCapitalized;
			this.regexLowercase = new ProviderOunce().regexLowercase;
			this.regexAbbrev = new ProviderOunce().regexAbbrev;
			this.regexPlural = new ProviderOunce().regexPlural;

		}
	}

	convert(num) {
		return new MeasureLiter(num * 0.0295735);
	}

}
