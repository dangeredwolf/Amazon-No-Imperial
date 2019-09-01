import { Measure } from "./Measure.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureSqMeter extends MeasureMeter {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		if (this.val < 1) { // cm
			let newVal = this.val / .01;
			switch(this.formatLevel) {
				case 0: return roundMe10(newVal) + separator + "cm²";
				case 1: return roundMe10(newVal) + separator + "square centimeter" + (this.plural ? "s" : "");
				case 2: return roundMe10(newVal) + separator + "Square Centimeter" + (this.plural ? "s" : "");
				case 3: return roundMe10(newVal) + separator + "SQUARE CENTIMETER" + (this.plural ? "S" : "");
				case 4: return roundMe10(newVal);
			}
		} else if (this.val >= 1000) { // km
			let newVal = this.val / 1000;
			switch(this.formatLevel) {
				case 0: return roundMe(newVal) + separator + "km²";
				case 1: return roundMe(newVal) + separator + "square kilometer" + (this.plural ? "s" : "");
				case 2: return roundMe(newVal) + separator + "Square Kilometer" + (this.plural ? "s" : "");
				case 3: return roundMe(newVal) + separator + "SQUARE KILOMETER" + (this.plural ? "S" : "");
				case 4: return roundMe(newVal);
			}
		} else { // otherwise m
			switch(this.formatLevel) {
				case 0: return roundMe10(this.val) + separator + "m²";
				case 1: return roundMe10(this.val) + separator + "square meter" + (this.plural ? "s" : "");
				case 2: return roundMe10(this.val) + separator + "Square Meter" + (this.plural ? "s" : "");
				case 3: return roundMe10(this.val) + separator + "SQUARE METER" + (this.plural ? "S" : "");
				case 4: return roundMe10(this.val);
			}
		}
	}
}
