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
	enemies = [];

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


			// Store a class-wide reference to a reference object


			// Assign default values to undefined properties
			if (isThing(classConfig.inheritFrom)) {
				classConfig.inheritFrom.forEach((elem) => {
					if (isThing(elem.defaults)) {
						if (!isThing(this_.defaults)) {
							this_.defaults = {};
						}
						Object.keys(elem.defaults).forEach((defaultKey) => {
							if (!elem.defaults.includes(elem.defaults[defaultKey])) {
								this_.defaults[defaultKey] = elem.defaults[defaultKey];
							}
						});
					}
					if (!isThing(this_.defaults)) {
						if (isThing(elem.defaults)) {
							this_.defaults = {};
						}
						Object.keys(elem.defaults).forEach((defaultKey) => {
							if (elem.defaults.includes(elem.defaults[defaultKey])) { return; }
							this_.defaults[defaultKey] = elem.defaults[defaultKey];
						});
					}
				});
			}
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
		defaults: {
			dir: 0,
			velX: 0,
			velY: 0,
			color: color(255),
			stroke: color(0)
		},
		essentials: ['x', 'y', 'w', 'h'],
		methods: {
			display: (self) => {
				if (!isThing(self.verts)) {
					self.verts = [
						{ x: -self.w, y: -self.h },
						{ x: self.w, y: -self.h },
						{ x: self.w, y: self.h },
						{ x: -self.w, y: self.h }
					];
					self.vertDirs = [
						atan2(-self.w, -self.h),
						atan2(self.w, -self.h),
						atan2(self.w, self.h),
						atan2(-self.w, self.h)
					];
				}
				fill(self.color);
				stroke(self.stroke);
				beginShape();
				vertex(cos(self.dir));
				endShape(CLOSE);
				rect(self.x, self.y, self.w, self.h);

			}
		},
	});


	Ally = newClass({
		inheritFrom: [Entity],
		defaults: {},
		essentials: [],
	});
	Enemy = newClass({
		inheritFrom: [Entity],
		defaults: {},
		essentials: [],
	});


	enemies.push(newClass);

}



function draw() {
	background(220);
}
