import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./Rounding.js";

export class MeasureLiter extends Measure {
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
			let newVal = this.val * 1000 + 1;
			switch(this.formatLevel) {
				case 0: return Math.floor(newVal) + separator + "mL";
				case 1: return Math.floor(newVal) + separator + "milliliter" + (this.plural ? "s" : "");
				case 2: return Math.floor(newVal) + separator + "Milliliter" + (this.plural ? "s" : "");
				case 3: return Math.floor(newVal) + separator + "MILLILITER" + (this.plural ? "S" : "");
				case 4: return Math.floor(newVal);
			}
		} else if (this.val >= 1) { // L
			switch(this.formatLevel) {
				case 0: return roundMe(this.val) + separator + "L";
				case 1: return roundMe(this.val) + separator + "liter" + (this.plural ? "s" : "");
				case 2: return roundMe(this.val) + separator + "Liter" + (this.plural ? "s" : "");
				case 3: return roundMe(this.val) + separator + "LITER" + (this.plural ? "S" : "");
				case 4: return roundMe(this.val);
			}
		}
	}
}
