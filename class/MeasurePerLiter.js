import { Measure } from "./Measure.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasurePerLiter extends MeasureLiter {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		if (this.val > 100) { // over $100 / L
			return ("($" + roundMe100(this.val/10) + " / 100mL)");
		} else {
			return ("($" + roundMe100(this.val) + " / L)");
		}
	}
}
