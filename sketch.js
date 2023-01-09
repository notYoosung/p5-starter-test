var isThing, newClass, ParentClass;

function setup() {
	createCanvas(400, 400);

	isThing = function (maybeisthing) {
		return maybeisthing === undefined || maybeisthing === NaN || maybeisthing === null;
	};

	ParentClass = function () {};

	/**
	 * @param {Object} classConfig
	 * @returns {Object} C
	 */
	newClass = function (classConfig) {
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
						console.log(`Err: Missing ${elem}.`);
					}
				});
			}
		};

		return C;
	};

	
}

function draw() {
	background(220);
}
