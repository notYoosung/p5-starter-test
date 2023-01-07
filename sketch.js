function isThing(maybeisthing) {
	return (maybeisthing === undefined || maybeisthing === NaN || maybeisthing === null)
}

function ParentClass() { }

/**
 * @param {Object} classConfig
 * @returns {Object} C
 */
function newClass(classConfig) {
	/**
	 * @constructor
	 * @param {Object} config 
	 * 
	 */
	var C = function (config) {
		let this_ = this;
		Object.assign(this, config);

		// Assign default values to undefined properties
		if (isThing(classConfig.defaults)) {
			classConfig.defaults.forEach((elem, indx) => {
				if (!isThing(this_[elem])) {
					this_[elem] = classConfig.defaults[elem];
				}
			});
		}

		// Print an error if a non-optional property is undefined
		if (isThing(classConfig.essentials)) {
			classConfig.essentials.forEach((elem, indx) => {
				if (!isThing(this_[elem])) {
					console.log(`Err: Missing ${elem}.`)
				}
			});
		}
	};

	return C;
}



function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);



}