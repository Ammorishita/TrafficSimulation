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
		const vehicle = document.createElement('div');
		const lights = document.querySelector('.intersection');
		const Car = function() {
			this.posX = '100px',
			this.posY = '0px',
			this.color = 'red'
		};
		Car.prototype.render = function() {
			vehicle.classList.add('vehicle');
			road.appendChild(vehicle);
			vehicle.style.top = this.posY;
			vehicle.style.left = this.posX;
		};
		Car.prototype.remove = function() {
			const currentVehicle = document.querySelector('.vehicle');
			currentVehicle.parentNode.removeChild(currentVehicle);
		}
		Car.prototype.drive = function() {
			let posY = parseInt(this.posY);
			let posX = parseInt(this.posX);
			let driving = true;
			let stopped = false;
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
			function slowDown() {
				let currentY = vehicle.style.top;
				vehicle.style.top = posY + 'px';
				//vehicleStats.speed += 2;
			}
			function drive() {
				vehicle.style.top = posY + 'px';		
				posY = posY += 1;									
			}
			function moving() {
				let spd = 12;
				(function loop() {
				    //var rand = Math.round(Math.random() * (3000 - 500)) + 500;
				    setTimeout(function() {
				        loop();
				    	if(driving) {
				    		drive();
				    	}
				    	if(lights.classList.contains('green')) {
				    		driving = true;
				    		const car = new Car();
				    		vehicleStats.speed = vehicleStats.speed -=2;
				    		if(vehicleStats.speed < 13) {
				    			vehicleStats.speed = 12;
				    		}
				    	}
				    	if(lights.classList.contains('red') && posY < yellowPosYEnd && posY > yellowPosY) {
				    		vehicleStats.speed = vehicleStats.speed += 2;
				    		if(vehicleStats.speed > 100) {
				    			vehicleStats.speed = 80;
				    			driving = false;
				    		}
				    	}
				    	if(posY > 575) {
							vehicle.style.top = '0px';
							posY = 0;
							vehicle.style.left = (Math.floor(Math.random() * 100 + 80)) +'px';			
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