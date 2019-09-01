import { Provider } from "./Provider.js";
import { MeasureCelsius } from "./MeasureCelsius.js";

export class ProviderFahrenheit extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.\-]+\s{0,2}((degrees?)?[\s\-]?fah?renheit|°[\s\-]?F|℉|(degrees?[\s\-]F))|[\d\.\-]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+ ?((degrees?)?[\s\-]?fah?renheit?|°[\s\-]?F|℉|(degrees?[\s\-]F)))/gi;
		this.regexUppercase = /DEGREES?.F/g;
		this.regexCapitalized = /Degrees?.F/g;
		this.regexLowercase = /degrees?.f/g;
		this.regexAbbrev = /(°.f|℉)/gi;
		this.regexPlural = /degrees/gi;
	}

	convert(num) {
		return new MeasureCelsius( (num - 32) * ( 5/9 ) );
	}

}
