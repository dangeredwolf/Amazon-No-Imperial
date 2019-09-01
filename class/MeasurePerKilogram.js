import { Measure } from "./Measure.js";
import { MeasureGram } from "./MeasureGram.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasurePerKilogram extends MeasureGram {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		if (this.val > 100) { // over $100 / kg
			return ("($" + roundMe100(this.val/10) + " / 100g)");
		} else {
			return ("($" + roundMe100(this.val) + " / kg)");
		}
	}
}
