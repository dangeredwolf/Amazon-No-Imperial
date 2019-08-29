import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderYard extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureMeter(num * 0.9144);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?[Yy][Aa]?[Rr]?[Dd][Ss]?|[\d\.]+(?=[\s\-]?(by|x|\*|\-|to)[\s\-\d]+[Yy][Aa][Rr][Dd])/g,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/YARD/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/Yard/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/yard/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/[Yy][Dd]|\"|”/g) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/[Yy][Aa]?[Rr]?[Dd][Ss]/g) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderYard.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
