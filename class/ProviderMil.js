import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";

export class ProviderMil extends Provider {

	constructor() {
		super();
		this.regexFind = /[\d\.]+\s+(mil)(?!\w)/gi;
		this.regexUppercase = /(?!)/g;
		this.regexCapitalized = /(?!)/g;
		this.regexLowercase = /(?!)/g;
		this.regexAbbrev = /(?!)/g;
		this.regexPlural = /(?!)/g;
	}

	convert(num) {
		return new MeasureMeter(num * 0.0254);
	}
	
}
