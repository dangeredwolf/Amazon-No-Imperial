import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderFluidOunce extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureLiter(num * 0.473176);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?p(in)?t|[\d\.]+(?=[\s\-]?(\-|to)[\s\-\d]+p(in)?t)/gi,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/P(IN)?T/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/P(in)?t/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/p(in)?t/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/pt/gi) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/p(in)?ts/gi) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderFluidOunce.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
