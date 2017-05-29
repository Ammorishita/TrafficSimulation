let vehicleStats = {
	'speed' : 25
};
let intersectionList = [];
let leftturnList = [];
let rightturnList = [];

var engine = {
	init: function() {
		this.trafficLights();
		this.vehicles();
		this.addVehicles();
	},
	trafficLights: function() {
		const stopLight = document.querySelectorAll('.intersection');
		const leftTurn = document.querySelectorAll('.left-turn');
		const rightTurn = document.querySelectorAll('.right-turn');
		const rightTurnVertical = document.querySelectorAll('.vertical');
		const rightTurnHorizontal = document.querySelectorAll('.horizontal');
		rightTurn.forEach(function(e) {
			console.log(window.getComputedStyle(e,null).getPropertyValue('width'))
		});
		leftTurn.forEach(function(e) {
			leftturnList.push(e.getBoundingClientRect());
		});
		stopLight.forEach(function(e) {
			e.classList.add('red-light-vertical');
			e.classList.add('red-light-horizontal');
		});
		stopLight.forEach(function(e) {
			intersectionList.push(e.getBoundingClientRect());
		});
		function greenLight(e) {
			intersectionList.forEach(function(e) {
				e.redVertical = false;
				e.greenVertical = true;
			});
			e.classList.remove('red-light-vertical');
			e.classList.add('green-light-vertical');
			rightTurnVertical.forEach(function(e) {
				e.classList.remove('hide');
				e.classList.add('visible');
			});
			rightTurnHorizontal.forEach(function(e) {
				e.classList.add('hide');
				e.classList.remove('visible');
			});
			let list = document.querySelectorAll('.visible');
			let redLights = document.querySelectorAll('.yellow');
			list.forEach(function(e) {
				rightturnList.push(e.getBoundingClientRect());
			});
			setTimeout(function() {
				e.classList.remove('green-light-vertical');	
				e.classList.add('yellow-light-vertical');
				intersectionList.forEach(function(e) {
					e.redVertical = true;
					e.greenVertical = false;
				});
				setTimeout(function() {
					rightturnList = [];
					intersectionList.forEach(function(e) {
						e.redVertical = true;
						e.greenVertical = false;
					});
					e.classList.remove('yellow-light-vertical');	
					e.classList.add('red-light-vertical');
					setTimeout(function() {
						greenLightHorizontal(e);
					},3000)
				},3000)
			},5500)
		};
		function greenLightHorizontal(e) {
			e.classList.remove('red-light-horizontal');
			e.classList.add('green-light-horizontal');
			intersectionList.forEach(function(e) {
				e.redHorizontal = false;
				e.greenHorizontal = true;
			});	
			rightTurnVertical.forEach(function(e) {
				e.classList.add('hide');
				e.classList.remove('visible');
			});
			rightTurnHorizontal.forEach(function(e) {
				e.classList.remove('hide');
				e.classList.add('visible');
			});
			let redLights = document.querySelectorAll('.yellow-light-vertical');
			let list = document.querySelectorAll('.visible');
			list.forEach(function(e) {
				rightturnList.push(e.getBoundingClientRect());
			});		
			setTimeout(function() {
				e.classList.remove('green-light-horizontal');	
				e.classList.add('yellow-light-horizontal');
				intersectionList.forEach(function(e) {
					e.redHorizontal = true;
					e.greenHorizontal = false;
				});				
				setTimeout(function() {
					rightturnList = [];
					e.classList.remove('yellow-light-horizontal');	
					e.classList.add('red-light-horizontal');
					intersectionList.forEach(function(e) {
						e.redHorizontal = true;
						e.greenHorizontal = false;
					});	
					setTimeout(function() {
						greenLight(e);
					},3000)
				},3000)
			},5500)
		};
		function activateLights() {
		    stopLight.forEach(function(e) {
		    	greenLight(e);
		    });
		    rightTurnHorizontal.forEach(function(e) {
				e.classList.add('hide');
			});
			rightTurnVertical.forEach(function(e) {
				e.classList.add('visible');
			});
			let list = document.querySelectorAll('.visible');
			list.forEach(function(e) {
				rightturnList.push(e.getBoundingClientRect());
			});
		};
		activateLights();
	},
	addVehicles: function() {
		let interval = 15000;
		let timer = setInterval(function() {
			engine.vehicles();
		},interval);
	},
	vehicles: function() {
		const road = document.querySelector('.road');
		const offramp = document.querySelector('.direction');
		const offrampPos = offramp.getBoundingClientRect();
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
			this.droveUp = false;
			this.droveDown = false;
			this.droveRight = false;
			this.droveLeft = false;
			this.drivingRight = false;
			this.drivingUp = true;
			this.drivingDown = false;
			this.drivingLeft = false;
			this.turn = true;
			this.stopped = false;
			this.slowing = false;
			this.accelerate = false;
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
			this.deccel = 2;
			this.addCar = function() {
				allVehicles.push(new Car());
			}
		};
		Car.prototype.clear = function() {
			this.droveUp = false;
			this.droveDown = false;
			this.droveRight = false;
			this.droveLeft = false;
			this.drivingRight = false;
			this.drivingUp = false;
			this.drivingDown = false;
			this.drivingLeft = false;
			this.turn = false;
			this.stopped = false;
			this.slowing = false;
			this.accelerate = false;
			this.accelerateUp = false;
			this.accelerateDown = false;
			this.accelerateLeft = false;
			this.accelerateRight = false;
			this.slowingLeft = false;
			this.slowingRight = false;
			this.slowingUp = false;
			this.slowingDown = false;
		};
		Car.prototype.update = function() {
			let self = this;
			this.client = this.element.getBoundingClientRect();
			let distance = document.elementFromPoint(this.posX, this.posY);
			let currentY = this.client.top;
			let currentX = this.client.left;
			let speeds = [1,1,1];
			if(this.posY < 0) {
				this.posY = 780;
			}
			if(this.drivingLeft) {this.posX = this.posX -= speeds[this.speed];}
			if(this.drivingRight) {this.posX = this.posX += speeds[this.speed];}
			if(this.drivingDown) {this.posY = this.posY += speeds[this.speed];}
			if(this.drivingUp) {this.posY = this.posY -= speeds[this.speed];}

			if(this.slowing) {
				this.deccel = this.deccel -=.005;
				if(this.slowingDown) {this.posY = this.posY + Math.log(this.deccel)};
				if(this.slowingUp) {this.posY = this.posY - Math.log(this.deccel)};
				if(this.slowingLeft) {this.posX = this.posX - Math.log(this.deccel)};
				if(this.slowingRight) {this.posX = this.posX + Math.log(this.deccel)};
				if(this.deccel < 1.6) {
					if(this.slowingDown) {
						console.log('finished slowing down');
						this.slowingDown = false;
						this.stopped = true;
						this.droveDown = true;
						this.deccel = 2;
						this.slowing = false;
					}
					if(this.slowingUp) {
						console.log('finished slowing up');
						this.slowingUp = false;
						this.stopped = true;
						this.droveUp = true;
						this.deccel = 2;
						this.slowing = false;
					}
					if(this.slowingRight) {
						console.log('finished slowing right');
						this.slowingRight = false;
						this.stopped = true;
						this.droveRight = true;
						this.deccel = 2;
						this.slowing = false;
					}
					if(this.slowingLeft) {
						console.log('finished slowing left');
						this.slowingLeft = false;
						this.stopped = true;
						this.droveLeft = true;
						this.deccel = 2;
						this.slowing = false;
					}
				}
			}
			if(this.accelerate) {
				this.stopped = false;
				this.accel = this.accel +=.005;
				if(this.accelerateDown) {this.posY = this.posY + Math.log(this.accel)};
				if(this.accelerateUp) {this.posY = this.posY - Math.log(this.accel)};
				if(this.accelerateLeft) {this.posX = this.posX - Math.log(this.accel)};
				if(this.accelerateRight) {this.posX = this.posX + Math.log(this.accel)};
				if(this.accel > 1.35) {
					if(this.accelerateDown) {
						this.drivingDown = true;
						this.accelerateDown = false;
						this.droveDown = false;
					}
					if(this.accelerateUp) {
						this.drivingUp = true;
						this.accelerateUp = false;
						this.droveUp = false;
					}
					if(this.accelerateRight) {
						this.drivingRight = true;
						this.accelerateRight = false;
						this.droveRight = false;
					}
					if(this.accelerateLeft) {
						this.drivingLeft = true;
						this.accelerateLeft = false;
						this.droveLeft = false;
					}
					this.accel = 1;
					this.accelerate = false;
				}
			}
			if (this.stopped) {
				this.posY = this.posY;
				this.posX = this.posX;
				this.turn = true;
			}
			//Making the turn off the offramp.
			if((currentY < (offrampPos.bottom - 25)) && (currentY > offrampPos.top) && (currentX < offrampPos.right) && (currentX > (offrampPos.left))) {
				self.drivingUp = false;
				self.drivingRight = true;
			}
			//Makes a left turn if it collides with the left turn box.
			leftturnList.forEach(function(e) {
				if((currentY < (e.bottom)) && (currentY > e.top) && (currentX < e.right) && (currentX > ((e.left + 15)))) {
					if(self.drivingRight && self.turn) {
						self.drivingRight = false;
						self.drivingUp = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1000)
					}
					if(self.drivingLeft && self.turn) {
						self.drivingLeft = false;
						self.drivingDown = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1000)
					}
					if(self.drivingUp && self.turn) {
						self.drivingUp = false;
						self.drivingLeft = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1000)
					}
					if(self.drivingDown && self.turn) {
						self.drivingDown = false;
						self.drivingRight = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1000)
					}

				}			
			});
			//Makes a right turn if it collides with the right turn box.
			rightturnList.forEach(function(e) {
				if (currentX < e.left + 40 && currentX + 25 > e.left && currentY < e.top + 40 && 25 + currentY > e.top) {
					if(self.drivingRight && self.turn) {
						self.drivingRight = false;
						self.drivingDown = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1500)
					}
					if(self.drivingLeft && self.turn) {
						self.drivingLeft = false;
						self.drivingUp = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1500)
					}
					if(self.drivingUp && self.turn) {
						self.drivingUp = false;
						self.drivingRight = true;
						self.turn = false;
						self.accelerate = false;
						setTimeout(function() {
							self.turn = true;
						},1500)
					}
					if(self.drivingDown && self.turn) {
						self.drivingDown = false;
						self.drivingLeft = true;
						self.turn = false;
						setTimeout(function() {
							self.turn = true;
						},1500)
					}
				}			
			});
			//Determines if car will stop or move through the interserction depending on the light.
			intersectionList.forEach(function(e) {
				if(self.drivingUp) {
					if((currentY < (e.bottom + 50)) && currentX > e.left && currentX < e.right && currentY > e.bottom && e.redVertical) {
						self.drivingUp = false;
						self.slowing = true;
						self.slowingUp = true;
						console.log('we are slowing after driving up')
					}					
				}
				if(self.drivingDown) {
					if((currentY > (e.top - 75)) && currentX > e.left && currentX < e.right && currentY < e.top && e.redVertical && self.turn) {
						self.drivingDown = false;
						self.slowing = true;
						self.slowingDown = true;
						console.log('we are slowing after driving down')
					}					
				}
				if(self.drivingRight) {
					if(currentY > e.top && currentY < e.bottom && currentX < e.left && currentX > (e.left - 75) && e.redHorizontal) {
						self.drivingRight = false;
						self.slowing = true;
						self.slowingRight = true;
						console.log('we are slowing after driving right')
					}					
				}
				if(self.drivingLeft) {
					if(currentY < e.bottom && currentY > e.top && (currentX < (e.right + 50)) && currentX > e.right && e.redHorizontal) {
						self.drivingLeft = false;
						self.slowing = true;
						self.slowingLeft = true;
						console.log('we are slowing after driving left')
					}					
				}
				//Accelerate up after a red light.
				if(currentY < (e.bottom + 50) && currentX > e.left && currentX < e.right && currentY > e.top && e.greenVertical && self.droveUp && !self.drivingRight) {
					self.accelerate = true;
					self.accelerateUp = true;
				}
				//Accelerate down after a red light.
				if(currentY < e.top && currentX > e.left && currentX < e.right && (currentY > (e.top - 50)) && e.greenVertical && self.droveDown && !self.drivingLeft) {
					self.accelerate = true;
					self.accelerateDown = true;
				}
				//Accelerate right after a red light.
				if(currentY < e.bottom && currentY > e.top && currentX > (e.left - 50) && currentX < (e.left + 25) && e.greenHorizontal && self.droveRight && !self.drivingDown) {
					self.accelerate = true;
					self.accelerateRight = true;
				}
				//Accelerate left after a red light.
				if(currentY < e.bottom && currentY > e.top && (currentX < (e.right + 50)) && currentX > e.left && e.greenHorizontal && self.droveLeft && !self.drivingUp) {
					self.accelerate = true;
					self.accelerateLeft = true;
				}
			});
		};
		Car.prototype.render = function() {
			map.appendChild(this.element);
			let startingX = [110,145,190,225,270];
			let randomX = Math.floor(Math.random() * startingX.length);
			let selectedX = startingX[randomX];
			this.element.style.left = 270 + 'px';
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
	        	car.element.style.left = car.posX + 'px';
        		//Remove car when it reaches the end of the road.
        		let vehicles = document.querySelectorAll('.vehicle');
    			for (i=0; i<vehicles.length; i++) {
                    if(parseInt(vehicles[i].style.top) <= 0 || parseInt(vehicles[i].style.top) > 780 || parseInt(vehicles[i].style.left) <= 0 || parseInt(vehicles[i].style.left) >= 980) {
                        vehicles[i].remove();               
                    }
                }
	            if(car.posY < 0 || car.posX > 800 || car.posY > 780) {
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
