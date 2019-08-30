import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureGram extends Measure {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		 if (this.val < 1) { // mg
			let newVal = this.val / .01;
			switch(this.formatLevel) {
				case 0: return Math.floor(newVal) + separator + "mg";
				case 1: return Math.floor(newVal) + separator + "milligram" + (this.plural ? "s" : "");
				case 2: return Math.floor(newVal) + separator + "Milligram" + (this.plural ? "s" : "");
				case 3: return Math.floor(newVal) + separator + "MILLIGRAM" + (this.plural ? "S" : "");
				case 4: return Math.floor(newVal);
			}
		} else if (this.val >= 1000) { // kg
			let newVal = this.val / 1000;
			switch(this.formatLevel) {
				case 0: return roundMe(newVal) + separator + "kg";
				case 1: return roundMe(newVal) + separator + "kilogram" + (this.plural ? "s" : "");
				case 2: return roundMe(newVal) + separator + "Kilogram" + (this.plural ? "s" : "");
				case 3: return roundMe(newVal) + separator + "KILOGRAM" + (this.plural ? "S" : "");
				case 4: return roundMe(newVal);
			}
		} else { // otherwise g
			switch(this.formatLevel) {
				case 0: return roundMe100(this.val) + separator + "g";
				case 1: return roundMe100(this.val) + separator + "gram" + (this.plural ? "s" : "");
				case 2: return roundMe100(this.val) + separator + "Gram" + (this.plural ? "s" : "");
				case 3: return roundMe100(this.val) + separator + "GRAM" + (this.plural ? "S" : "");
				case 4: return roundMe100(this.val);
			}
		}
	}
}
