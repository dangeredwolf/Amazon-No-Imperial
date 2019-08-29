import { Provider } from "./Provider.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderFeet extends Provider {
	constructor() {
		super()
	}

	static convert(num) {
		return new MeasureMeter(num * 0.3048);
	}

	static find(str) {
		return findHelper(str,/[\d\.]+[\.\-\s]?[Ff][OoEe]?[OoEe]?[Tt]|[\d\.]+[\'](?!\w)|[\d\.]+(?=[\s]+([Xx]|[Tt][Oo]|[Bb][Yy]|[Oo][Rr]).+[Ii][Nn][Cc][Hh])/g,(results, str2) => {

			var str2 = str2;

			results.forEach((result) => {
				console.log(result)
				if (!validate(result)) return;

				let plural = false;
				let formatLevel = 4;
				let useDash = false;

				if (result.match(/F[EO][EO]T/g) !== null) {
					formatLevel = 3;
				} else if (result.match(/F[eo][eo]t/g) !== null) {
					formatLevel = 2;
				} else if (result.match(/f[eo][eo]t/g) !== null) {
					formatLevel = 1;
				} else if (result.match(/[Ff][Tt]|\'/g) !== null) {
					formatLevel = 0;
				}

				if (result.match(/\-/g) !== null) {
					useDash = true;
				}

				if (result.match(/[Ee]/g) !== null) {
					plural = true;
				}

				str2 = str2.replace(result, ProviderFeet.convert(parseFloat(result.match(/[\d\.]+/g))).setFormatLevel(formatLevel).setPlural(plural).setUseDash(useDash).format())
			})

			return str2;
		})
	}
}
