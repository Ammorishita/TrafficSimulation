var vehicleStats = {
	'speed' : 25
};
var engine = {
	init: function() {
		this.trafficLights();
		this.vehicles();
	},
	trafficLights: function() {
		const stopLight = document.querySelector('.intersection');
		function redLight() {
			setTimeout(function() {
				stopLight.classList.remove('yellow');
		    	stopLight.classList.add('red');
		    	greenLight();		
			},4000)		
		}
		function yellowLight() {
			setTimeout(function() {
				stopLight.classList.remove('green');
		    	stopLight.classList.add('yellow');
		    	redLight();		
			},8000)
		}
		function greenLight() {
		    var rand = Math.round(Math.random() * (8000 - 500)) + 1500;
		    setTimeout(function() {
		    	//green();
		    	stopLight.classList.remove('red');
		    	stopLight.classList.add('green');
		    	yellowLight();
		    }, 8000);
		};
		greenLight();
	},
	vehicles: function() {
		const road = document.querySelector('.road');
		const lights = document.querySelector('.intersection');
		const trafficLight = lights.style.top;
		const greenZone = document.querySelector('.go');
		const yellowZone = document.querySelector('.brake');
		const redZone = document.querySelector('.stop');
		const greenPosY = parseInt(window.getComputedStyle(greenZone, null).getPropertyValue('top'));
		const yellowPosY = parseInt(window.getComputedStyle(yellowZone, null).getPropertyValue('top'));
		const redPosY = parseInt(window.getComputedStyle(redZone, null).getPropertyValue('top'));
		const yellowPosYEnd = yellowPosY + 50;
		const greenPosYEnd = yellowPosY;
		const redPosYEnd = redPosY + 30;

		const Car = function() {
			this.element = document.createElement('div')
			this.element.classList.add('vehicle');
			this.element.classList.add('moving');
			this.x = this.element.style.left;
			this.y = parseInt(this.element.style.top);
			this.speed = Math.floor(Math.random() * 2) + 1;
			this.slowing = false;
			this.driving = false;
			this.stopped = false;
			this.accelerate = true;
			this.posX = 100,
			this.posY = 0,
			this.accel = 1;
			this.addCar = function() {
				allVehicles.push(new Car());
			}
		};
		Car.prototype.update = function() {
			let currentY = parseInt(this.element.style.top);
			let speeds = [.8,1,1.25];
			if(this.posY > 575) {
				this.posY = 0;
			}
			if(this.driving) {
				this.posY = this.posY += speeds[this.speed];				
			} else if (this.accelerate) {
				this.accel = this.accel +=.005;
				this.posY = this.posY + Math.log(this.accel);
				if(this.accel > 1.85) {
					this.accelerate = false;
					this.driving = true;
					this.accel = 1;
				}
			} else if (this.slowing) {
				this.posY = this.posY + 90/(this.posY * (this.posY/180));
			} else if (this.stopped) {
				this.posY = this.posY;
			}
		};
		Car.prototype.render = function() {
			road.appendChild(this.element);
			let startingX = [65,145,180];
			let randomX = Math.floor(Math.random() * 3) + 1;
			console.log(randomX)
			this.element.style.left = startingX[randomX] + 'px';
			this.element.style.top = this.posY + 'px';
		};
		Car.prototype.drive = function() {
			let self = this;
			let driving = true;
			let stopped = false;
			(function loop() {
			    let vehiclesSlowing = document.querySelectorAll('.slowing');
			    let vehiclesMoving = document.querySelectorAll('.moving');
			    setTimeout(function() {
			        loop();
			    	let vehicle = document.querySelector('.vehicle');
			    	let vehicles = document.querySelectorAll('.vehicle');
			    	let currentY = Math.floor(parseInt(this.posY));
			    }, vehicleStats.speed);
			}());
		};
		Car.prototype.move = function(elem,style,unit,from,to,time) {
			let car = document.querySelector("." + this.element.classList[0])
		    if(elem) return;
		    var start = new Date().getTime(),
		        timer = setInterval(function() {
		            var step = Math.min(1,(new Date().getTime()-start)/time);
		            car.style[style] = (from+step*(to-from))+unit;
		            if( step == 1) clearInterval(timer);
		            self.posY = car.style[style];
		        },25);
		    car.style[style] = from+unit;
		};
		let allVehicles = [new Car()];
		render();
		function render() {
			allVehicles.forEach(function(car) {
				car.render();
			})
		};
		function updateCars() {
	        allVehicles.forEach(function(car) {
	        	car.update();
	        	if(car.posY > yellowPosY & car.posY < yellowPosYEnd && lights.classList.contains('red')) {
	        		///Car will slowdown if the light is red and its in the yellow zone.
	        		car.slowing = true;
	        		car.driving = false;
	        	}
	        	if(car.posY > (yellowPosY - 50) && car.posY < yellowPosYEnd && lights.classList.contains('yellow')) {
	        		//Car will slow down if the light is yellow and its in yellow zone.s
	        		car.slowing = true;
	        		car.driving = false;
	        	}
	        	if(car.posY > redPosY && car.posY < redPosYEnd && lights.classList.contains('red')) {
	        		//Car will stop if its in the red zone and light is red.
	        		car.slowing = false;
	        		car.driving = false;
	        		car.stopped = true;
	        	}
	        	if(lights.classList.contains('green') && car.stopped) {
	        		//Car will accerlate if light turns green and it was stopped.
	        		car.stopped = false;
	        		car.accelerate = true;
			    }
	        	car.element.style.top = car.posY + 'px';
	        	if(car.posY < 180 && car.posY > 178) {
	        		let roll = Math.random();
	        		if(roll > .75) {
		        		engine.vehicles();        			
	        		}
	        	}
	        	if(car.posY > 575) {
	        		//Remove car when it reaches the end of the road.
	        		let vehicles = document.querySelectorAll('.vehicle');
        			for (i=0; i<vehicles.length; i++) {
	                    if(parseInt(vehicles[i].style.top) >= 575) {
	                        vehicles[i].remove();               
	                    }
	                }
	                if(vehicles.length < 2) {
	                	engine.vehicles();
	                }
	        	}
	        	let id = requestAnimationFrame(updateCars)
	        });
	    };
	    requestAnimationFrame(updateCars)
	}
}
engine.init();