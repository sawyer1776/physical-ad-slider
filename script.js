///// CONFIG /////
///// DEV connect to the style sheet /////
const BACKGROUND_COLOR = '000'; //black

let SLIDE_DURATION = 10; // IN SECONDS

let TRANSITION_TIME = 1.5; // IN SECONDS

///// DOM SELECTORS /////
const sliderContainer = document.querySelector(
	'.slider-container'
);

const buttonContainer = document.querySelector(
	'.btn-container'
);

const slides = document.querySelector('.img');

// const buttons = document.querySelector('.btn-div');

//Select left and right arrows for slider
const lessSlide = document.querySelector('.less-slide');
const moreSlide = document.querySelector('.more-slide');
const lessTrans = document.querySelector('.less-trans');
const moreTrans = document.querySelector('.more-trans');

//Time numbers
const slideNumber = document.querySelector('.slide-number');
const transNumber = document.querySelector('.trans-number');

//buttons

const startBtn = document.querySelector('.btn-start');
const refreshBtn = document.querySelector('.btn-refresh');

// const imgEl = document.querySelector('.img');

///// GLOBAL VARIABLES /////
//Keeps track of where you are in the loop
let counter = 1;

///// MAKE DYNAMIC /////
// This array is the file name of each image to be put into the slider
const images = ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'];

//Creates the HTML element for a slide index is the position inside of the images array
const createImg = function (index) {
	let newImg = document.createElement('img');
	newImg.setAttribute('src', `img/${images[index - 1]}`);
	newImg.setAttribute('class', 'img');
	newImg.setAttribute('data-id', `${index}`);
	//Add the image in
	sliderContainer.appendChild(newImg);
};

//Loop that Rotates the images
// Needs a current and next image element to function
const rotate = function () {
	setTimeout(() => {
		//Remove the element that was pushed out of the viewport last loop
		//Has to be put here or it would disapear before the transition was over.
		if (+counter > 1) {
			document
				.querySelector(`[data-id="${counter - 1}"]`)
				.remove();
		} else {
			document
				.querySelector(`[data-id="${images.length}"]`)
				.remove();
		}

		//Select the elements

		const imgCurrent = document.querySelector(
			`[data-id="${counter}"]`
		);

		let imgNext = '';

		////SET the next image variable

		// in the middle of the loop
		if (+counter < images.length) {
			imgNext = document.querySelector(
				`[data-id="${counter + 1}"]`
			);
		}
		// end of the loop
		if (+counter == images.length) {
			imgNext = document.querySelector(`[data-id="1"]`);
		}

		/////////move both images left 1 space

		imgCurrent.style.transform = 'translateX(-100vw)';
		imgNext.style.transform = 'translateX(0vw)';

		//add a new next image

		if (+counter <= images.length - 2) {
			createImg(+counter + 2);
			counter++;
		} else {
			createImg(+counter - (images.length - 2));
			if (+counter < images.length) {
				counter++;
			} else {
				counter = 1;
			}
		}
		rotate();
	}, SLIDE_DURATION * 1000);
};

const renderTime = function (object) {
	object.innerHTML = '';
	if (object == slideNumber) {
		slideNumber.innerHTML = SLIDE_DURATION;
	}
	if (object == transNumber) {
		transNumber.innerHTML = TRANSITION_TIME;
	} else {
		console.log('ERROR use slideNumber or transNumber');
	}
};

// Starts the application
const init = function () {
	// created the first 2 images only the first one will start visible
	createImg(1);
	createImg(2);
	//This one is invisible but placed to avoid an error in the rotate loop
	createImg(images.length);
	//Adds the transition time to the .img class

	//positions the first image in the viewport
	document
		.querySelector(`[data-id="1"]`)
		.classList.add('start');
	//Pushes the buttons to the back layer
	buttonContainer.classList.remove('move-to-front');
	buttonContainer.classList.add('move-to-back');

	//Starts the loop
	rotate();

	//delete the start slideshow btn
	startBtn.remove();
};

//Initial setup sets the visible number equal to the config
slideNumber.innerHTML = '';
slideNumber.innerHTML = SLIDE_DURATION;
transNumber.innerHTML = '';
transNumber.innerHTML = TRANSITION_TIME;
document.documentElement.style.setProperty(
	'--TRANSITION-TIME',
	`${TRANSITION_TIME * 1000}ms`
);

//Clickables

//Start Slideshow
startBtn.addEventListener('click', init);

//refresh images
//looks for new images creates an array based on what is in the folder
// refreshBtn.addEventListener('click', refresh)

/////REFACTOR BELOW LOTS OF SIMILAR CODE /////

//slide more
const moreSlideClick = function () {
	SLIDE_DURATION = SLIDE_DURATION + 0.5;
	slideNumber.innerHTML = '';
	slideNumber.innerHTML = SLIDE_DURATION;
};
moreSlide.addEventListener('click', moreSlideClick);

//slide less
const lessSlideClick = function () {
	if (SLIDE_DURATION > TRANSITION_TIME + 0.75) {
		SLIDE_DURATION = SLIDE_DURATION - 0.5;
		slideNumber.innerHTML = '';
		slideNumber.innerHTML = SLIDE_DURATION;
	} else {
		alert(
			'Transition time must be less than slide duration'
		);
	}
};
lessSlide.addEventListener('click', lessSlideClick);
//slide more
const moreTransClick = function () {
	if (TRANSITION_TIME < SLIDE_DURATION - 0.5) {
		TRANSITION_TIME = TRANSITION_TIME + 0.25;
		transNumber.innerHTML = '';
		transNumber.innerHTML = TRANSITION_TIME;
		document.documentElement.style.setProperty(
			'--TRANSITION-TIME',
			`${TRANSITION_TIME * 1000}ms`
		);

		// document.styleSheets[0].insertRule(
		// 	`.img {transition: all ${
		// 		TRANSITION_TIME * 1000
		// 	}ms ease-in-out;}`,
		// 	2
		// );
	} else {
		alert(
			'Transition time must be less than slide duration'
		);
	}
};
moreTrans.addEventListener('click', moreTransClick);

//slide less
const lessTransClick = function () {
	TRANSITION_TIME = TRANSITION_TIME - 0.25;
	transNumber.innerHTML = '';
	transNumber.innerHTML = TRANSITION_TIME;

	document.documentElement.style.setProperty(
		'--TRANSITION-TIME',
		`${TRANSITION_TIME * 1000}ms`
	);
};
lessTrans.addEventListener('click', lessTransClick);

const showAndHide = function (e) {
	if (e.code == 'KeyH') {
		buttonContainer.classList.remove('move-to-front');
		buttonContainer.classList.add('move-to-back');
	} else {
		buttonContainer.classList.remove('move-to-back');
		buttonContainer.classList.add('move-to-front');
	}
};

document.addEventListener('keypress', showAndHide);
