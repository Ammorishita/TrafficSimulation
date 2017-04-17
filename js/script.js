var engine = {
	init: function() {
		this.trafficLights();
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
		    console.log(rand)
		}());
	}
}
engine.init();