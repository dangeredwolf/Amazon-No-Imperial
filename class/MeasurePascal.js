import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasurePascal extends Measure {
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
		if (this.val >= 100000) { // bar
			return this.formatRounding(Math.floor((this.val + 1) / 100000)) + separator + "bar";
		} else if (this.val >= 1000) { // kPa
			return this.formatRounding(Math.floor((this.val + 1) / 1000)) + separator + "kPa";
		} else { // Pa
			return this.formatRounding(Math.floor(this.val)) + separator + "Pa";
		}
	}
}
