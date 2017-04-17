var engine = {
	init: function() {
		this.trafficLights();
		this.vehicles();
	},
	trafficLights: function() {
		const stopLight = document.querySelector('.trafficLight');
		let red = true;
		function changeLights() {
			if(red) {
				stopLight.classList.remove('red');
				stopLight.classList.add('green');
				red = false;
				return;
			}else {
				stopLight.classList.remove('green');
				stopLight.classList.add('red');
				red = true;
			}
		}
		(function lightsTimer() {
		    var rand = Math.round(Math.random() * (5000 - 500)) + 1500;
		    setTimeout(function() {
		            changeLights();
		            lightsTimer();  
		    }, rand);
		}());
	},
	vehicles: function() {
		const Car = function() {
			this.posX = '0px',
			this.posY = '0px',
			this.color = 'red'
		};
		Car.prototype.render = function() {
			const road = document.querySelector('.road');
			const vehicle = document.createElement('div');
			vehicle.classList.add('vehicle');
			road.appendChild(vehicle);
			vehicle.style.top = this.posY;
		}
		const car = new Car();
		car.render();
	}
}
engine.init();