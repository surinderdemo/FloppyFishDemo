// namespace our game
var Flappy_Fish = {
	// set up some inital values
	WIDTH: 320,
	HEIGHT: 480,
	scale: 1,
	// the position of the canvas
	// in relation to the screen
	offset: {
		top: 0,
		left: 0
	},
	// store all bird, touches, pipes etc
	entities: [],
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	score: {
		taps: 0,
		coins: 0
	},
	distance: 0,
	digits:[],
	fonts:[],
	// we'll set the rest of these
	// in the init function
	RATIO: null,
	bg_grad: "day",
	game:null,
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	ua: null,
	android: null,
	ios: null,
	gradients: {},
	
	/** This function initializes the game
	*/
	init: function () {
		var grad;
		// the proportion of width to height
		Flappy_Fish.RATIO = Flappy_Fish.WIDTH / Flappy_Fish.HEIGHT;
		// these will change when the screen is resize
		Flappy_Fish.currentWidth = Flappy_Fish.WIDTH;
		Flappy_Fish.currentHeight = Flappy_Fish.HEIGHT;
		// this is our canvas element
		Flappy_Fish.canvas = document.getElementsByTagName('canvas')[0];
		// it's important to set this
		// otherwise the browser will
		// default to 320x200
		Flappy_Fish.canvas.width = Flappy_Fish.WIDTH;
		Flappy_Fish.canvas.height = Flappy_Fish.HEIGHT;
		// the canvas context allows us to 
		// interact with the canvas api
		Flappy_Fish.ctx = Flappy_Fish.canvas.getContext('2d');
		// we need to sniFlappy_Fish out android & ios
		// so we can hide the address bar in
		// our resize function
		Flappy_Fish.ua = navigator.userAgent.toLowerCase();
		Flappy_Fish.android = Flappy_Fish.ua.indexOf('android') > -1 ? true : false;
		Flappy_Fish.ios = (Flappy_Fish.ua.indexOf('iphone') > -1 || Flappy_Fish.ua.indexOf('ipad') > -1) ? true : false;

		// setup some gradients
		grad = Flappy_Fish.ctx.createLinearGradient(0, 0, 0, Flappy_Fish.HEIGHT);
		grad.addColorStop(0, '#036');
		grad.addColorStop(0.5, '#69a');
		grad.addColorStop(1, 'yellow');
		Flappy_Fish.gradients.dawn = grad;

		grad = Flappy_Fish.ctx.createLinearGradient(0, 0, 0, Flappy_Fish.HEIGHT);
		grad.addColorStop(0, '#69a');
		grad.addColorStop(0.5, '#9cd');
		grad.addColorStop(1, '#fff');
		Flappy_Fish.gradients.day = grad;

		grad = Flappy_Fish.ctx.createLinearGradient(0, 0, 0, Flappy_Fish.HEIGHT);
		grad.addColorStop(0, '#036');
		grad.addColorStop(0.3, '#69a');
		grad.addColorStop(1, 'pink');
		Flappy_Fish.gradients.dusk = grad;

		grad = Flappy_Fish.ctx.createLinearGradient(0, 0, 0, Flappy_Fish.HEIGHT);
		grad.addColorStop(0, '#036');
		grad.addColorStop(1, 'black');
		Flappy_Fish.gradients.night = grad;

		// listen for clicks
		window.addEventListener('click', function (e) {
			e.preventDefault();
			Flappy_Fish.Input.set(e);
		}, false);

		// listen for touches
		window.addEventListener('touchstart', function (e) {
			e.preventDefault();
			// the event object has an array
			// called touches, we just want
			// the first touch
			Flappy_Fish.Input.set(e.touches[0]);
		}, false);
		window.addEventListener('touchmove', function (e) {
			// we're not interested in this
			// but prevent default behaviour
			// so the screen doesn't scroll
			// or zoom
			e.preventDefault();
		}, false);
		window.addEventListener('touchend', function (e) {
			// as above
			e.preventDefault();
		}, false);

		// we're ready to resize
		Flappy_Fish.resize();
		Flappy_Fish.changeState("Splash");
		
		Flappy_Fish.loop();

	},

	/** This function maintains the aspect ratio of the game after resizing of the browser window and across multiple platforms
	*/
	resize: function () {

		Flappy_Fish.currentHeight = window.innerHeight;
		// resize the width in proportion
		// to the new height
		Flappy_Fish.currentWidth = Flappy_Fish.currentHeight * Flappy_Fish.RATIO;

		// this will create some extra space on the
		// page, allowing us to scroll pass
		// the address bar, and thus hide it.
		if (Flappy_Fish.android || Flappy_Fish.ios) {
			document.body.style.height = (window.innerHeight + 50) + 'px';
		}

		// set the new canvas style width & height
		// note: our canvas is still 320x480 but
		// we're essentially scaling it with CSS
		Flappy_Fish.canvas.style.width = Flappy_Fish.currentWidth + 'px';
		Flappy_Fish.canvas.style.height = Flappy_Fish.currentHeight + 'px';

		// the amount by which the css resized canvas
		// is diFlappy_Fisherent to the actual (480x320) size.
		Flappy_Fish.scale = Flappy_Fish.currentWidth / Flappy_Fish.WIDTH;
		// position of canvas in relation to
		// the screen
		Flappy_Fish.offset.top = Flappy_Fish.canvas.offsetTop;
		Flappy_Fish.offset.left = Flappy_Fish.canvas.offsetLeft;

		// we use a timeout here as some mobile
		// browsers won't scroll if there is not
		// a small delay
		window.setTimeout(function () {
			window.scrollTo(0, 1);
		}, 1);
	},
				
	// this is where all entities will be moved
	// and checked for collisions etc
	/** This function will update the game and reset the tapped state of the game
	*/
	update: function () {
		Flappy_Fish.game.update();
		Flappy_Fish.Input.tapped = false;
	},

	// this is where we draw all the entities
	/** This function draws all entities to the game screen
	*/
	render: function () {

		Flappy_Fish.Draw.rect(0, 0, Flappy_Fish.WIDTH, Flappy_Fish.HEIGHT, Flappy_Fish.gradients[Flappy_Fish.bg_grad]);
		 
		// cycle through all entities and render to canvas
		for (i = 0; i < Flappy_Fish.entities.length; i += 1) {
			Flappy_Fish.entities[i].render();
		}
			
		Flappy_Fish.game.render();
		
	},

	// the actual loop
	// requests animation frame
	// then proceeds to update
	// and render
	/** This function iterates the updating and rendering of the game
	*/
	loop: function () {

		requestAnimFrame(Flappy_Fish.loop);

		Flappy_Fish.update();
		Flappy_Fish.render();
	},
	/** This function changes the current state of the game
	* param {string} state - the state the game is to be changed to
	*/
	changeState: function(state) {                   
		Flappy_Fish.game = new window[state]();
		Flappy_Fish.game.init();
	}
};