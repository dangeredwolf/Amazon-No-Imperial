import { Measure } from "./Measure.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureLiter extends Measure {
	constructor(val) {
		super();
		this.val = val;
		this.roundingData = {
			4:5,
			74:75,
			89:90,
			101:100,
			104:105,
			119:120,
			147:150,
			148:150,
			178:180,
			198:200,
			199:200,
			237:240,
			249:250,
			252:250,
			281:280,
			332:330,
			474:475,
			503:500,
			621:620,
			651:650,
			681:680,
			749:750
		}
	}

	format() {
		let separator = this.useDash ? "-" : " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		 if (this.val < 0.9995) { // mL
			let newVal = this.formatRounding(Math.floor(this.val * 1000 + 1));
			switch(this.formatLevel) {
				case 0: return newVal + separator + "mL";
				case 1: return newVal + separator + "milliliter" + (this.plural ? "s" : "");
				case 2: return newVal + separator + "Milliliter" + (this.plural ? "s" : "");
				case 3: return newVal + separator + "MILLILITER" + (this.plural ? "S" : "");
				case 4: return newVal;
			}
		} else if (this.val >= 1500) { // m³
		    let newVal = this.formatRounding(Math.floor(this.val * 1000 + 1));L
			switch(this.formatLevel) {
				case 0: return newVal + separator + "m³";
				case 1: return newVal + separator + "cubic meter" + (this.plural ? "s" : "");
				case 2: return newVal + separator + "Cubic Meter" + (this.plural ? "s" : "");
				case 3: return newVal + separator + "CUBIC METER" + (this.plural ? "S" : "");
				case 4: return newVal;
			}
		} else if (this.val >= 0.9995) { // L
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
