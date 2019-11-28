let fluidInclude = /(SPRAY|Mascara|Sunscreen|water|Water|Water Bottle|tea|Tea|bottle|Bottle|soda|Soda|Cola|Coke|cola|coke|drink|Drink|Cans?|cans?|Water|water|Pepsi|Gatorade|Soap|soap|Detergent|detergent|Toilet Bowl Cleaner|Spray|Bathroom Cleaner|Cups?|cups?|Broth|milk|Milk|Juice|juice|Cream(er)?|Conditioner|Smoothie|Moisturizer|CC Creme|Gel|gel|Cleaner|cleaner|Spotter|spotter)/g;
let fluidExclude = /(KIND|Fibre 1|Bunches of Oats|cereal|Cereal|Kellogg\'s|Residual|Stick|Pudding|Shells & Cheese|Easy Mac|Cookie|Cracker|Ketchup|Sheer Physical|UltiMATTE|Face Stick|Ultra Sport Sunscreen Spray|Sunscreen Sport Performance|Continuous( Sunscreen)? Spray( Broad Spectrum)?|Candy|Candies|candies|candy|gum|Gum|Canister|canister|Ground Coffee|Steak|Slices)/g;

export function checkStringForFluid(str) {
	return str.match(fluidInclude) !== null && str.match(fluidExclude) === null
}
