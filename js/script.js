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
			},3000)		
		}
		function yellowLight() {
			setTimeout(function() {
				stopLight.classList.remove('green');
		    	stopLight.classList.add('yellow');
		    	redLight();		
			},2000)
		}
		function greenLight() {
		    var rand = Math.round(Math.random() * (8000 - 500)) + 1500;
		    setTimeout(function() {
		    	//green();
		    	stopLight.classList.remove('red');
		    	stopLight.classList.add('green');
		    	yellowLight();
		    }, 2000);
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
		Car.prototype.drive = function() {
			let posY = parseInt(this.posY);
			let driving = true;
			let stopped = false;
			const trafficLight = lights.style.top;
			function slowDown() {
				let currentY = vehicle.style.top;
			}
			function speedUp() {
				let spd = 12;
				(function loop() {
				    //var rand = Math.round(Math.random() * (3000 - 500)) + 500;
				    setTimeout(function() {
				    	if(driving) {
				            drive();
				            loop(); 
				            console.log('driving') 
				    	}
				    	if(lights.classList.contains('yellow')) {
				    		spd += 2;
				    		if(spd == 100) {
				    			driving = false;
				    		}
				    	}
				    	if(posY > 550) {
							driving = false;
						}
				    }, spd);
				}());
				function drive() {
					vehicle.style.top = posY + 'px';		
					posY = posY += 1;									
				}
			};
			speedUp();
		}
		const car = new Car();
		car.render();
		car.drive();
	}
}
engine.init();