import { Measure } from "./Measure.js";
import { MeasureLiter } from "./MeasureLiter.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureLiterPerMinute extends MeasureLiter {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		 if (this.val < 1) { // mL
			let newVal = this.val / .01;
			switch(this.formatLevel) {
				case 0: return Math.floor(newVal) + separator + "mL/min";
				case 1: return Math.floor(newVal) + separator + "milliliter" + (this.plural ? "s" : "") + " per minute";
				case 2: return Math.floor(newVal) + separator + "Milliliter" + (this.plural ? "s" : "") + " Per Minute";
				case 3: return Math.floor(newVal) + separator + "MILLILITER" + (this.plural ? "S" : "") + " PER MINUTE";
				case 4: return Math.floor(newVal);
			}
		} else if (this.val >= 1) { // L
			switch(this.formatLevel) {
				case 0: return roundMe(this.val) + separator + "L/min";
				case 1: return roundMe(this.val) + separator + "liter" + (this.plural ? "s" : "") + " per minute";
				case 2: return roundMe(this.val) + separator + "Liter" + (this.plural ? "s" : "") + " Per Minute";
				case 3: return roundMe(this.val) + separator + "LITER" + (this.plural ? "S" : "") + " PER MINUTE";
				case 4: return roundMe(this.val);
			}
		}
	}
}
