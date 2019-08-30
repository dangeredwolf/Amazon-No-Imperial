import { Provider } from "./Provider.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderGallon extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureLiter(num * 3.7854);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?gal(lon)?|[\d\.]+(?=[\s\-]?(\-|to)[\s\-\d]+gal(lon)?)/gi,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/GAL/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/Gal/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/gal/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/gal(?!lon)/gi) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/gal(lon)?s/gi) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderGallon.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
