import { Provider } from "./Provider.js";
import { ProviderPer } from "./ProviderPer.js";
import { MeasurePerKilogram } from "./MeasurePerKilogram.js";

export class ProviderPerOunce extends ProviderPer {

	constructor() {
		super();
		this.regexFind = /\(\$(\d|\.)+ ?\/ ? ?Ounce\)/g;
	}

	convert(num) {
		return new MeasurePerKilogram(num / 0.0283495);
	}

}
