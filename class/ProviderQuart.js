import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderQuart extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureLiter(num * 0.946353);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?q(uar)?t|[\d\.]+(?=[\s\-]?(\-|to)[\s\-\d]+q(uar)?t)/gi,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/Q(UAR)?T/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/Q(uar)?t/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/q(uar)?t/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/qt/gi) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/q(uar)?ts/gi) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderQuart.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
