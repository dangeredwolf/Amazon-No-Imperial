import { Provider } from "./Provider.js";
import { MeasurePerKilogram } from "./MeasurePerKilogram.js";

export class ProviderPer extends Provider {

	constructor() {
		super();
		this.regexFind = /(?!)/gi;
		this.regexUppercase = /(?!)/g;
		this.regexCapitalized = /(?!)/g;
		this.regexLowercase = /(?!)/g;
		this.regexAbbrev = /./g;
		this.regexPlural = /(?!)/g;
		this.regexMatchDigit = /[\d\.]+(?= ? ?\/)/g;
		this.matchPer = true;
	}

}
