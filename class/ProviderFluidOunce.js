import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";

export class ProviderFluidOunce extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?fl(uid)?[-\s\.]{0,2}o(z|unce)[s\.]?|[\d\.]+(?=[\s\-]?(\-|to|\/|or)[\s\-\d]+fl(uid)?[-\s\.]{0,2}o(z|unce)[s\.]?)/gi;
		this.regexUppercase = /FLUID/g;
		this.regexCapitalized = /Fluid/g;
		this.regexLowercase = /fluid/g;
		this.regexAbbrev = /fl\.?\s/gi;
		this.regexPlural = /ounces/gi;
	}

	convert(num) {
		return new MeasureLiter(num * 0.0295735);
	}

}
