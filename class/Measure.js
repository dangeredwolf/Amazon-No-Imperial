export class Measure {

	/*	FormatLevel
		0: abbreviation
		1: full lowercase
		2: full capitalized
		3: full uppercase
		4: number only, do not display unit (useful for ranges)
	*/
	formatLevel = 0;
	plural = false;
	val = 0;
	useDash = false;

	setVal(a) {
		this.val = a;
		return this;
	}

	setUseDash(a) {
		this.useDash = a;
		return this;
	}

	setPlural(a) {
		this.plural = a;
		return this;
	}

	setFormatLevel(a) {
		this.formatLevel = a;
		return this;
	}

	format() {
		return "";
	}
}
