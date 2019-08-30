import { Provider } from "./Provider.js";
import { MeasureCelsius } from "./MeasureCelsius.js";

export class ProviderFahrenheit extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+\s{0,2}((degrees?)?[\s\-]?fahrenheit|°[\s\-]?F|℉|(degrees?[\s\-]F))(?!\w)|[\d\.]+(?=[\s\-]?(\-|to|or|\/)[\s\-\d]+ ((degrees?)?[\s\-]?fahrenheit?|°[\s\-]?F|℉|(degrees?[\s\-]F)))/gi;
		this.regexUppercase = /DEGREES?/g;
		this.regexCapitalized = /Degrees?/g;
		this.regexLowercase = /degrees?/g;
		this.regexAbbrev = /(°.f|℉)/gi;
		this.regexPlural = /degrees/gi;
	}

	convert(num) {
		return new MeasureCelsius( (num - 32) * ( 5/9 ) );
	}

}
