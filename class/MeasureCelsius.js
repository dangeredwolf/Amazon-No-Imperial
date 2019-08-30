import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureCelsius extends Measure {

	constructor(val) {
		super();
		this.val = val;
	}

	format() {
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		switch(this.formatLevel) {
			case 0: return Math.floor(this.val) + " °C";
			case 1: return Math.floor(this.val) + " degree" + (this.plural ? "s" : "") + " celsius";
			case 2: return Math.floor(this.val) + " Degree" + (this.plural ? "s" : "") + " Celsius";
			case 3: return Math.floor(this.val) + " DEGREE" + (this.plural ? "S" : "") + " CELSIUS";
			case 4: return Math.floor(this.val) + " °C";
		}
	}

}
