import { MeasureGram } from "./MeasureGram.js";
import { roundMe, roundMe10, roundMe100 } from "./UtilityRounding.js";

export class MeasureGramPerSqMeter extends MeasureGram {
	constructor(val) {
		super(val);
		this.val = val;
	}

	format() {
		let separator = " ";
		if (typeof this.val === "undefined") {
			throw "val is undefined!!"
		}
		switch(this.formatLevel) {
			case 4: return this.formatRounding(this.roundGram(this.val));
			default: return this.formatRounding(this.roundGram(this.val)) + separator + "g/m²";
		}
	}
}
