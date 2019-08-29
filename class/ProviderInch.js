import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderInch extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureMeter(num * 0.0254);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?inche?s?|[\d\.]+[\.\-]?(in)(?!-)|[\d\.]+(?=[\s\-]+(x|to|by|or).{0,22}inch)|[\d\.]+(?=\-\d+\s?inch)/gi,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/INCH/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/Inch/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/inch/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/[Ii][Nn]|\"|”/g) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/es/gi) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderInch.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
