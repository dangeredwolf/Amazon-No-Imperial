import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./Rounding.js";

export class MeasureMeter extends Measure {
	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		if (this.val < 0.03) { // millimeter
			let newVal = this.val / .001;
			switch(this.formatLevel) {
				case 0: return roundMe10(newVal) + separator + "mm";
				case 1: return roundMe10(newVal) + separator + "millimeter" + (this.plural ? "s" : "");
				case 2: return roundMe10(newVal) + separator + "Millimeter" + (this.plural ? "s" : "");
				case 3: return roundMe10(newVal) + separator + "MILLIMETER" + (this.plural ? "S" : "");
				case 4: return roundMe10(newVal);
			}
		} else if (this.val < 1) { // cm
			let newVal = this.val / .01;
			switch(this.formatLevel) {
				case 0: return roundMe10(newVal) + separator + "cm";
				case 1: return roundMe10(newVal) + separator + "centimeter" + (this.plural ? "s" : "");
				case 2: return roundMe10(newVal) + separator + "Centimeter" + (this.plural ? "s" : "");
				case 3: return roundMe10(newVal) + separator + "CENTIMETER" + (this.plural ? "S" : "");
				case 4: return roundMe10(newVal);
			}
		} else if (this.val >= 1000) { // km
			let newVal = this.val / 1000;
			switch(this.formatLevel) {
				case 0: return roundMe(newVal) + separator + "km";
				case 1: return roundMe(newVal) + separator + "kilometer" + (this.plural ? "s" : "");
				case 2: return roundMe(newVal) + separator + "Kilometer" + (this.plural ? "s" : "");
				case 3: return roundMe(newVal) + separator + "KILOMETER" + (this.plural ? "S" : "");
				case 4: return roundMe(newVal);
			}
		} else { // otherwise m
			switch(this.formatLevel) {
				case 0: return roundMe100(this.val) + separator + "m";
				case 1: return roundMe100(this.val) + separator + "meter" + (this.plural ? "s" : "");
				case 2: return roundMe100(this.val) + separator + "Meter" + (this.plural ? "s" : "");
				case 3: return roundMe100(this.val) + separator + "METER" + (this.plural ? "S" : "");
				case 4: return roundMe100(this.val);
			}
		}
	}
}
