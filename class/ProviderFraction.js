import { Provider } from "./Provider.js";
import { assert, findHelper, validate } from "./HelperFunctions.js";

export class ProviderFraction extends Provider {

	constructor() {
		super();
	}

	convert(num) {
		return num;
	}

	find(str) {
		str = str.replace(/\-?(1 ?\/ ?2|½)/g,".5");
		str = str.replace(/\-?(1 ?\/ ?3|⅓)/g,".333333");
		str = str.replace(/\-?(2 ?\/ ?3|⅔)/g,".666666");
		str = str.replace(/\-?(1 ?\/ ?4|¼)/g,".25");
		str = str.replace(/\-?(3 ?\/ ?4|¾)/g,".75");
		str = str.replace(/\-?(1 ?\/ ?5|⅕)/g,".2");
		str = str.replace(/\-?(2 ?\/ ?5|⅖)/g,".4");
		str = str.replace(/\-?(3 ?\/ ?5|⅗)/g,".6");
		str = str.replace(/\-?(4 ?\/ ?5|⅘)/g,".8");
		str = str.replace(/\-?(1 ?\/ ?6|⅙)/g,".166667");
		str = str.replace(/\-?(5 ?\/ ?6|⅚)/g,".833333");
		str = str.replace(/\-?(1 ?\/ ?7|⅐)/g,".142857");
		str = str.replace(/\-?(2 ?\/ ?7)/g,".285714");
		str = str.replace(/\-?(3 ?\/ ?7)/g,".428571");
		str = str.replace(/\-?(4 ?\/ ?7)/g,".571428");
		str = str.replace(/\-?(5 ?\/ ?7)/g,".714285");
		str = str.replace(/\-?(6 ?\/ ?7)/g,".857143");
		str = str.replace(/\-?(1 ?\/ ?8|⅛)/g,".125");
		str = str.replace(/\-?(2 ?\/ ?8)/g,".25");
		str = str.replace(/\-?(3 ?\/ ?8|⅜)/g,".375");
		str = str.replace(/\-?(5 ?\/ ?8|⅝)/g,".625");
		str = str.replace(/\-?(7 ?\/ ?8|⅞)/g,".875");
		str = str.replace(/\-?(1 ?\/ ?9|⅑)/g,".11111");
		str = str.replace(/\-?(1 ?\/ ?10|⅒)/g,".1");
		str = str.replace(/\-?(1 ?\/ ?12)/g,".083333");
		str = str.replace(/\-?(5 ?\/ ?12)/g,".416667");
		str = str.replace(/\-?(7 ?\/ ?12)/g,".583333");
		str = str.replace(/\-?(11 ?\/ ?12)/g,".916667");
		str = str.replace(/\-?(1 ?\/ ?16)/g,".0625");
		str = str.replace(/\-?(2 ?\/ ?16)/g,".125");
		str = str.replace(/\-?(3 ?\/ ?16)/g,".1875");
		str = str.replace(/\-?(4 ?\/ ?16)/g,".25");
		str = str.replace(/\-?(5 ?\/ ?16)/g,".3125");
		str = str.replace(/\-?(6 ?\/ ?16)/g,".375");
		str = str.replace(/\-?(7 ?\/ ?16)/g,".4375");
		str = str.replace(/\-?(8 ?\/ ?16)/g,".5");
		str = str.replace(/\-?(9 ?\/ ?16)/g,".5625");
		str = str.replace(/\-?(10 ?\/ ?16)/g,".625");
		str = str.replace(/\-?(11 ?\/ ?16)/g,".6825");
		str = str.replace(/\-?(12 ?\/ ?16)/g,".75");
		str = str.replace(/\-?(13 ?\/ ?16)/g,".75");
		str = str.replace(/\-?(13 ?\/ ?16)/g,".8125");
		str = str.replace(/\-?(14 ?\/ ?16)/g,".875");
		str = str.replace(/\-?(15 ?\/ ?16)/g,".9375");
		str = str.replace(/\,(?=\d\d\d)/g,"");
		str = str.replace(/half/gi,"0.5");
		str = str.replace(/quarter/gi,"0.25");

		return str;
	}
}
