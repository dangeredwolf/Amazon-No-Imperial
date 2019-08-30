import { ProviderGallon } from "./ProviderGallon.js";
import { MeasureLiterPerMinute } from "./MeasureLiterPerMinute.js";

export class ProviderGallonPerMinute extends ProviderGallon {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(gal(lon)?s? per min(ute)?|g\.?p\.?m\.?)|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+(gal(lon)?s? per min(ute)?|g\.?p\.?m\.?))/gi;
		this.regexUppercase = /GAL/g;
		this.regexCapitalized = /Gal/g;
		this.regexLowercase = /gal/g;
		this.regexAbbrev = /gpm/gi;
		this.regexPlural = /gal(lon)?s/gi;
	}

	convert(num) {
		return new MeasureLiterPerMinute(num * 3.7854);
	}

}
