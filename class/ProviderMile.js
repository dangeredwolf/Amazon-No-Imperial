import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderMile extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureMeter(num * 1.60934);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?[Mm][Ii][Ll][Ee][Ss]?|[\d\.]+(?=[\s\-]?(by|x|\*|\-|to|or)[\s\-\d]+[Mm][Ii][Ll][Ee])|[\d\.]+\s+([mM]i)(?!\w)/g,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/MILE/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/Mile/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/mile/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/[Mm]i/g) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/[Mm][Ii][Ll][Ee][Ss]/g) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderMile.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
