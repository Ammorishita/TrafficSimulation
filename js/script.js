var vehicleStats = {
	'speed' : 12
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
			this.x = this.element.style.left;
			this.y = this.element.style.top;
			this.posX = 100,
			this.posY = 0,
			this.className = 'vehicle'
		};
		Car.prototype.render = function() {
			road.appendChild(this.element);
			let randomX = Math.floor(Math.random() * 100) + 100;
			this.element.style.left = randomX + 'px';
			this.element.style.top = this.posY + 'px';
		};
		Car.prototype.remove = function() {
			let currentVehicle = document.querySelector('.vehicle');
			currentVehicle.parentNode.removeChild(currentVehicle);
		};
		Car.prototype.drive = function() {
			const vehicle = document.querySelector('.vehicle');
			let self = this;
			let posY = self.posY;
			let posX = self.posX;
			let driving = true;
			let stopped = false;
			function slowDown() {
				let currentY = vehicle.style.top;
				vehicle.style.top = posY + 'px';
				//vehicleStats.speed += 2;
			}
			function drive() {
				self.element.style.top = self.posY +'px';
				self.posY = self.posY +=1;					
			}
			function moving() {
				let vehicles = document.querySelectorAll('.vehicle');
				let spd = 12;
				(function loop() {
				    //var rand = Math.round(Math.random() * (3000 - 500)) + 500;
				    let roll = Math.floor(Math.random() * 10);
				    setTimeout(function() {
				        loop();
				    	if(driving) {
				    		drive();
				    	}
				    	if(self.posY == 180) {
				    		const car = new Car();
				    		let roll = Math.random();
							if(roll > 1) {
								car.render();
								car.drive();
							}
				    		let vehicles = document.querySelectorAll('.vehicle');
				    	}
				    	if(lights.classList.contains('green')) {
				    		driving = true;
				    		vehicleStats.speed = vehicleStats.speed -=2;
				    		if(vehicleStats.speed < 13) {
				    			vehicleStats.speed = 12;
				    		}
				    	}
				    	if(lights.classList.contains('red') && posY < yellowPosYEnd && posY > yellowPosY) {
				    		console.log('light is red')
				    		vehicleStats.speed = vehicleStats.speed += 2;
				    		if(vehicleStats.speed > 100) {
				    			vehicleStats.speed = 80;
				    			driving = false;
				    		}
				    	}
						if(self.posY > 575) {
			                for (i=0; i<vehicles.length; i++) {
			                    if(vehicles[i].style.top == '575px') {
			                        vehicles[i].remove();                 
			                    }
			                }
			            }
				    }, vehicleStats.speed);
				}());
			};
			moving();
		}
		const car = new Car();
		car.render();
		car.drive();
	}
}
engine.init();