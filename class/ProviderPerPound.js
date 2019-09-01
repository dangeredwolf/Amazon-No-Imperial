import { Provider } from "./Provider.js";
import { ProviderPer } from "./ProviderPer.js";
import { MeasurePerKilogram } from "./MeasurePerKilogram.js";

export class ProviderPerPound extends ProviderPer {

	constructor() {
		super();
		this.regexFind = /\(\$(\d|\.)+ \/  ?Pound\)/g;
	}

	convert(num) {
		return new MeasurePerKilogram(num / 0.453592);
	}

}
