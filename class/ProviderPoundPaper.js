import { ProviderPound } from "./ProviderPound.js";
import { MeasureGramPerSqMeter } from "./MeasureGramPerSqMeter.js";

export class ProviderPoundPaper extends ProviderPound {

	constructor() {
		super();
		this.regexFind = /[\d\.]+[\.\-\s]?(pound|lb)s? ?((copier|printer|copy|letter|ink|multipurpose)? ?paper| ?ink)/gi;
	}

	convert(num) {
		return new MeasureGramPerSqMeter(num * 3.75);
	}

}
