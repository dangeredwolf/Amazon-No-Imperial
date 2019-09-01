import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureWatt extends Measure {
	constructor(val) {
		super();
		this.val = val;
		this.roundingData = {
		}
	}

	formatRounding(num) {
		Object.keys(this.roundingData).forEach((item) => {
			if (num === parseFloat(item)) {
				let a = parseFloat(this.roundingData[item]);
				// debugger;
				return a;
			}
		});
		return num;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		 if (this.val < 1) { // mW
			let newVal = this.formatRounding(Math.floor(this.val * 1000 + 1));
			// switch(this.formatLevel) {
				/*case 0: */return newVal + separator + "mW";
				// case 1: return newVal + separator + "milliliter" + (this.plural ? "s" : "");
				// case 2: return newVal + separator + "Milliliter" + (this.plural ? "s" : "");
				// case 3: return newVal + separator + "MILLILITER" + (this.plural ? "S" : "");
				// case 4: return newVal;
			// }
		} else if (this.val >= 1000) { // kW
			// switch(this.formatLevel) {
				/* case 0: */return this.formatRounding(roundMe10((this.val + 1) / 1000)) + separator + "kW";
				// case 1: return this.formatRounding(roundMe(this.val)) + separator + "liter" + (this.plural ? "s" : "");
				// case 2: return this.formatRounding(roundMe(this.val)) + separator + "Liter" + (this.plural ? "s" : "");
				// case 3: return this.formatRounding(roundMe(this.val)) + separator + "LITER" + (this.plural ? "S" : "");
				// case 4: return this.formatRounding(roundMe(this.val));
			// }
		} else if (this.val >= 1) { // W
			// switch(this.formatLevel) {
				/* case 0: */return this.formatRounding(roundMe(this.val)) + separator + "W";
				// case 1: return this.formatRounding(roundMe(this.val)) + separator + "liter" + (this.plural ? "s" : "");
				// case 2: return this.formatRounding(roundMe(this.val)) + separator + "Liter" + (this.plural ? "s" : "");
				// case 3: return this.formatRounding(roundMe(this.val)) + separator + "LITER" + (this.plural ? "S" : "");
				// case 4: return this.formatRounding(roundMe(this.val));
			// }
		}
	}
}
