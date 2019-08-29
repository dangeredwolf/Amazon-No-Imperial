import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderMil extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureMeter(num * 0.0254);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+\s+([mM][Ii][Ll])(?!\w)/g,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 0; // there is no plural, nor longer version, of mil

				str2 = str2.replace(result, ProviderMil.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
