import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureLiter extends Measure {
	constructor(val) {
		super();
		this.val = val;
		this.roundingData = {
			237:240,
			474:475
		}
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		 if (this.val < 1) { // mL
			let newVal = this.formatRounding(Math.floor(this.val * 1000 + 1));
			switch(this.formatLevel) {
				case 0: return newVal + separator + "mL";
				case 1: return newVal + separator + "milliliter" + (this.plural ? "s" : "");
				case 2: return newVal + separator + "Milliliter" + (this.plural ? "s" : "");
				case 3: return newVal + separator + "MILLILITER" + (this.plural ? "S" : "");
				case 4: return newVal;
			}
		} else if (this.val >= 1500) { //
		    let newVal = this.formatRounding(Math.floor(this.val * 1000 + 1));L
			switch(this.formatLevel) {
				case 0: return newVal + separator + "m³";
				case 1: return newVal + separator + "cubic meter" + (this.plural ? "s" : "");
				case 2: return newVal + separator + "Cubic Meter" + (this.plural ? "s" : "");
				case 3: return newVal + separator + "CUBIC METER" + (this.plural ? "S" : "");
				case 4: return newVal;
			}
		} else if (this.val >= 1) { // L
			switch(this.formatLevel) {
				case 0: return this.formatRounding(roundMe(this.val)) + separator + "L";
				case 1: return this.formatRounding(roundMe(this.val)) + separator + "liter" + (this.plural ? "s" : "");
				case 2: return this.formatRounding(roundMe(this.val)) + separator + "Liter" + (this.plural ? "s" : "");
				case 3: return this.formatRounding(roundMe(this.val)) + separator + "LITER" + (this.plural ? "S" : "");
				case 4: return this.formatRounding(roundMe(this.val));
			}
		}
	}
}
