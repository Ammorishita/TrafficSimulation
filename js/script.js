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
			},1500)		
		}
		function yellowLight() {
			setTimeout(function() {
				stopLight.classList.remove('green');
		    	stopLight.classList.add('yellow');
		    	redLight();		
			},3000)
		}
		function greenLight() {
		    var rand = Math.round(Math.random() * (5000 - 500)) + 1500;
		    setTimeout(function() {
		    	//green();
		    	stopLight.classList.remove('red');
		    	stopLight.classList.add('green');
		    	yellowLight();
		    }, 3000);
		};
		greenLight();
	},
	vehicles: function() {
		const road = document.querySelector('.road');
		const vehicle = document.createElement('div');
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
			var timer = setInterval(function() {
				vehicle.style.top = posY + 'px';
				posY = posY += 1;
				console.log(posY)
				if(posY > 550) {
					clearInterval(timer);
				}
			},12)
		}
		const car = new Car();
		car.render();
		car.drive();
	}
}
engine.init();