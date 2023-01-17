var _,
	// Functions
	isThing,
	newClass,
	runForEach,
	// Classes
	Entity,
	Ally,
	Foe,
	// Reference Objects
	allies = [],
	enemies = [];

function setup() {
	createCanvas(400, 400);

	isThing = (maybeisthing) => {
		return maybeisthing !== undefined && (typeof maybeisthing === "number" ? !isNaN(maybeisthing) : true) && maybeisthing !== null;
	};

	runForEach = (arr, methods) => {
		arr.forEach((obj, indx) => {
			if (methods instanceof Array) {
				methods.forEach = (elem) => {
					obj[elem]();
				};
			} else if (typeof methods === "string") {
				console.log(obj);
				obj[methods]();
			}
		});
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
			console.log("conf" + Object.keys(config));
			Object.assign(this, config);
			console.log(this_.x);



			// Assign default values to undefined properties
			// Doesn't override existing properties so that higher-level props are preserved
			if (isThing(classConfig.inheritFrom)) {
				classConfig.inheritFrom.forEach((parent) => {
					// Defaults
					if (isThing(parent.defaults)) {
						for (let elem in parent.defaults) {
							if (!isThing(this_[elem])) {
								this_[elem] = classConfig.defaults[elem];
							}
						}
					}
					// Essentials
					if (isThing(parent.essentials)) {
						if (!isThing(this_.essentials)) {
							this_.essentials = {};
						}
						Object.keys(parent.essentials).forEach((essKey) => {
							if (!parent.essentials.includes(parent.essentials[essKey])) {
								this_.essentials[essKey] = parent.essentials[essKey];
							}
						});
					}
				});
			}

			// Assign default values to undefined properties
			if (isThing(classConfig.defaults)) {
				for (let elem in classConfig.defaults) {
					if (!isThing(this_[elem])) {
						this_[elem] = classConfig.defaults[elem];
					}
				}
			}

			// Print an error if a non-optional property is undefined
			if (isThing(classConfig.essentials)) {
				classConfig.essentials.forEach((elem, indx) => {
					if (!isThing(this_[elem])) {
						console.log("elem" + elem);
						console.log(`Err: Missing ${elem}.`);
					}
				});
			}

			// if (this !== this_) { this = this_; }
		};

		// Store a class-wide reference to a reference object
		if (isThing(classConfig.refObj)) {
			C.prototype.refObj = classConfig.refObj;
		}
		// Move all of the methods to the class' prototype
		if (isThing(classConfig.methods)) {
			Object.assign(C.prototype, classConfig.methods);
		}
		// Inherit methods fron any parents
		if (isThing(classConfig.inheritFrom)) {
			classConfig.inheritFrom.forEach((parent) => {
				// Methods
				if (isThing(parent.methods)) {
					for (let elem in parent.methods) {
						if (!isThing(this_[elem])) {
							C.prototype[elem] = classConfig.methods[elem];
						}
					}
				}
			});
		}

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

	console.log(new Entity({ x: 10, y: 10, w: 10, h: 10 }));

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



	for (let i = 100; i >= 0; i--) {
		allies.push(new Ally({
			x: Math.random() * width,
			y: Math.random() * height,
			w: 10, h: 10,
		}));
		enemies.push(new Enemy({
			x: Math.random() * width,
			y: Math.random() * height,
			w: 10, h: 10,
		}));
	}



}



function draw() {
	background(220);


	runForEach(allies, 'display');
	runForEach(enemies, 'display');

	noLoop();
}


