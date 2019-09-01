import { Provider } from "./Provider.js";
import { ProviderPer } from "./ProviderPer.js";
import { ProviderPerOunce } from "./ProviderPerOunce.js";
import { MeasurePerLiter } from "./MeasurePerLiter.js";

export class ProviderPerFluidOunce extends ProviderPer {

	constructor(fluid) {
		super();
		this.regexFind = /\(\$(\d|\.)+ ? ?\/ ? ?(Fl Oz|oz)\)/g;
		if (fluid) {
			this.regexFind = new ProviderPerOunce().regexFind
		}
	}

	convert(num) {
		return new MeasurePerLiter(num / 0.029573509718662);
	}

}
