import { Measure } from "./Measure.js";
import { MeasureMeter } from "./MeasureMeter.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureKmH extends MeasureMeter {
	constructor(val) {
		super();
		this.val = val;
		this.roundingData = {
			97:100
		}
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		{ // mL
		    let newVal = this.formatRounding(Math.floor(this.val + .5));
		    switch(this.formatLevel) {
			    case 0: return newVal + separator + "km/h";
			    case 1: return newVal + separator + "kilometer" + (this.plural ? "s" : "") + " per hour";
			    case 2: return newVal + separator + "Kilometer" + (this.plural ? "s" : "") + " Per Hour";
			    case 3: return newVal + separator + "KILOMETER" + (this.plural ? "S" : "") + " PER HOUR";
			    case 4: return newVal;
		    }
	    }
	}
}
