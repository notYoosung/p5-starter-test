var _,
	// Functions
	isThing,
	newClass,
	// Classes
	Entity,
	Ally,
	Foe,
	// Reference Objects
	allies = [],
	foes = [];

function setup() {
	createCanvas(400, 400);

	isThing = function (maybeisthing) {
		return maybeisthing === undefined || maybeisthing === NaN || maybeisthing === null;
	};

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
			if (isThing(classConfig.inheritFrom)) {
				classConfig.inheritFrom.forEach((elem, indx) => {
					if (!isThing(this_[elem])) {
					}
				});
			}1
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

	Entity = newClass({
		defaults: [],
		essentials: [],
	});

	Ally = newClass({
		inheritFrom: [Entity],
		defaults: [],
		essentials: [],
	});
}

function draw() {
	background(220);
}
