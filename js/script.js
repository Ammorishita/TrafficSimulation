let vehicleStats = {
	'speed' : 25
};
let intersectionList = [];
var engine = {
	init: function() {
		this.trafficLights();
		this.vehicles();
		this.addVehicles();
	},
	trafficLights: function() {
		const stopLight = document.querySelectorAll('.intersection');
		let active = true;
		stopLight.forEach(function(e) {
			e.classList.add('red-light-vertical');
			e.classList.add('green-light-horizontal');
		});
		stopLight.forEach(function(e) {
			if(active) {
				intersectionList.push(e.getBoundingClientRect());
				active = false;
			}
		});
		function greenLight2() {
			let lightTime = [1500,3000,4500];
		    stopLight.forEach(function(e) {
		    	let rand = Math.round(Math.random() * (8000 - 500)) + 1500;
		    	setTimeout(function() {
		    		e.classList.remove('green-light-vertical');
		    		e.classList.add('yellow-light-vertical');
		    		setTimeout(function() {
			    		rand = Math.round(Math.random() * (8000 - 500)) + 1500;
			    		e.classList.remove('yellow-light-vertical');
			    		e.classList.add('red-light-vertical');
					    setTimeout(function() {
				    		let rand = Math.round(Math.random() * (8000 - 500)) + 1500;
				    		e.classList.remove('red-light-horizontal')
				    		e.classList.add('green-light-horizontal');
				    		greenLight();
				    	}, 1500);
		    		}, 3000);
		    	}, 4000);
		    });
		};
		function greenLight() {
		    stopLight.forEach(function(e) {
		    	let rand = Math.round(Math.random() * (8000 - 500)) + 1500;
		    	setTimeout(function() {
		    		e.classList.remove('green-light-horizontal');
		    		e.classList.add('yellow-light-horizontal');
		    		setTimeout(function() {
			    		rand = Math.round(Math.random() * (8000 - 500)) + 1500;
			    		e.classList.remove('yellow-light-horizontal');
			    		e.classList.add('red-light-horizontal');
					    setTimeout(function() {
				    		let rand = Math.round(Math.random() * (8000 - 500)) + 1500;
				    		e.classList.remove('red-light-vertical')
				    		e.classList.add('green-light-vertical');
				    		greenLight2();
				    	}, 1500);
		    		}, 3000);
		    	}, 4000);
		    });
		};
		greenLight();
	},
	addVehicles: function() {
		let interval = 5000;
		/*let timer = setInterval(function() {
			engine.vehicles();
		},interval);*/
	},
	vehicles: function() {
		const road = document.querySelector('.road');
		const map = document.querySelector('.container');
		const lights = document.querySelector('.intersection');
		const trafficLight = lights.style.top;
		let allVehicles;

		const Car = function() {
			this.element = document.createElement('div');
			this.element.classList.add('vehicle');
			this.x = parseInt(this.element.style.left);
			this.y = parseInt(this.element.style.top);
			this.speed = Math.floor(Math.random() * 2) + 1;
			this.drivingRight = false;
			this.drivingUp = true;
			this.drivingDown = false;
			this.drivingLeft = false;
			this.stopped = false;
			this.accelerateUp = false;
			this.accelerateDown = false;
			this.accelerateLeft = false;
			this.accelerateRight = false;
			this.slowingLeft = false;
			this.slowingRight = false;
			this.slowingUp = false;
			this.slowingDown = false;
			this.posX = 250;
			this.posY = 780;
			this.accel = 1;
			this.addCar = function() {
				allVehicles.push(new Car());
			}
		};
		Car.prototype.update = function() {
			let self = this;
			this.client = this.element.getBoundingClientRect();
			let distance = document.elementFromPoint(this.posX, this.posY);
			let currentY = this.client.top;
			let currentX = this.client.left;
			let speeds = [1.4,1.8,1.2];
			if(this.posY < 0) {
				this.posY = 780;
			}
			if(this.drivingLeft) {this.posX = this.posX -= speeds[this.speed];}
			if(this.drivingRight) {this.posX = this.posX += speeds[tis.speed];}
			if(this.drivingDown) {this.posY = this.posY += speeds[this.speed];}
			if(this.drivingUp) {this.posY = this.posY -= speeds[this.speed];}
			if(this.accelerate) {
				this.accel = this.accel +=.005;
				if(this.accelerateDown) {this.posY = this.posY + Math.log(this.accel)};
				if(this.accelerateUp) {this.posY = this.posY - Math.log(this.accel)};
				if(this.accelerateLeft) {this.posX = this.posX - Math.log(this.accel)};
				if(this.accelerateRight) {this.posX = this.posX + Math.log(this.accel)};
				if(this.accel > 1.85) {
					if(this.accelerateDown) {
						this.drivingDown = true;
						this.accelerateDown = false;
					}
					if(this.accelerateUp) {
						this.drivingUp = true;
						this.accelerateUp = false;
					}
					if(this.accelerateRight) {
						this.drivingRight = true;
						this.accelerateRight = false;
					}
					if(this.accelerateLeft) {
						this.drivingLeft = true;
						this.accelerateLeft = false;
					}
					this.accel = 1;
				}
			} else if (this.slowingDown) {
				this.posY = this.posY + 90/(this.posY * (this.posY/180));
			} else if (this.slowingUp) {
				this.posY = this.posY - 90/(this.posY * (this.posY/180));
			} else if (this.slowingRight) {
				this.posX = this.posX + 90/(this.posX * (this.posX/180));
			} else if (this.slowingLeft) {
				this.posX = this.posX - 90/(this.posX * (this.posX/180));
			} else if (this.stopped) {
				this.posY = this.posY;
				this.posX = this.posX;
			}
			/*intersectionList.forEach(function(e) {
				if((currentY < e.bottom) && (currentY > e.top) && (currentX < e.right) && (currentX > (e.left))) {
					self.drivingUp = false;
				}
			})*/
		};
		Car.prototype.render = function() {
			map.appendChild(this.element);
			let startingX = [110,145,190,225,270];
			let randomX = Math.floor(Math.random() * startingX.length);
			let selectedX = startingX[randomX];
			this.element.style.left = selectedX + 'px';
			this.posX = parseInt(this.element.style.left);
			this.element.style.top = this.posY + 'px';
			startingX.splice(randomX,1);
		};
		allVehicles = [new Car()];
		lights.addEventListener('click',newcar);
		function newcar() {
			allVehicles.push(new Car())
		};
		function render() {
			allVehicles.forEach(function(car) {
				car.render();
			})
		};
		render();
		function updateCars() {
	        allVehicles.forEach(function(car) {
	        	car.update();
	        	car.element.style.top = car.posY + 'px';
	        	//car.element.style.left = car.posX + 'px';
        		//Remove car when it reaches the end of the road.
        		let vehicles = document.querySelectorAll('.vehicle');
    			for (i=0; i<vehicles.length; i++) {
                    if(parseInt(vehicles[i].style.top) <= 0 || parseInt(vehicles[i].style.top) > 800 || parseInt(vehicles[i].style.left) <= 0 || parseInt(vehicles[i].style.left) >= 980) {
                        vehicles[i].remove();               
                    }
                }
	            if(car.posY < 0) {
	                if(vehicles.length < 2) {
	                	engine.vehicles();
	                }	            	
	            }
	        	requestAnimationFrame(updateCars)
	        });
	    };
	    updateCars();
	}
};
engine.init();
