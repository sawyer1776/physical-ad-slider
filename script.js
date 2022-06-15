///// CONFIG /////
let SLIDE_DURATION = 10; // IN SECONDS

let TRANSITION_TIME = 1.5; // IN SECONDS

///// IMPORTS /////

///// DOM SELECTORS /////
const sliderContainer = document.querySelector(
	'.slider-container'
);

const buttonContainer = document.querySelector(
	'.btn-container'
);

const slides = document.querySelector('.img');

//Select left and right arrows for setting times
const lessSlide = document.querySelector('.less-slide');
const moreSlide = document.querySelector('.more-slide');
const lessTrans = document.querySelector('.less-trans');
const moreTrans = document.querySelector('.more-trans');

//text content for time values
const slideNumber = document.querySelector('.slide-number');
const transNumber = document.querySelector('.trans-number');

//buttons
const startBtn = document.querySelector('.btn-start');
const refreshBtn = document.querySelector('.btn-refresh');

///// GLOBAL VARIABLES /////
//Keeps track of where you are in the loop
let counter = 1;

//current and next slide
let imgCurrent = '';
let imgNext = '';

///// MAKE DYNAMIC /////
// This array is the file name of each image to be put into the slider
// images need to be in the img folder to work
const images = []; //'img-1.jpg', 'img-2.jpg', 'img-3.jpg'

//Creates the HTML element for a slide. index is the position inside of the images array
const createImg = function (index) {
	let newImg = document.createElement('img');
	newImg.setAttribute('src', `img/${images[index - 1]}`);
	newImg.setAttribute('class', 'img');
	newImg.setAttribute('data-id', `${index}`);
	//Add the image in
	sliderContainer.appendChild(newImg);
};

const removeSlide = function () {
	//during the loop; remove the previous
	if (+counter > 1) {
		document
			.querySelector(`[data-id="${counter - 1}"]`)
			.remove();
	}
	//when counter is at 1 remove the last image
	if (+counter == 1) {
		document
			.querySelector(`[data-id="${images.length}"]`)
			.remove();
	}
};

const setSlides = function () {
	//current slide is the same as the current counter
	imgCurrent = document.querySelector(
		`[data-id="${counter}"]`
	);

	//SET the next image variable
	// in the loop; select next image
	if (+counter < images.length) {
		imgNext = document.querySelector(
			`[data-id="${counter + 1}"]`
		);
	}
	// end of the loop; select image 1
	if (+counter == images.length) {
		imgNext = document.querySelector(`[data-id="1"]`);
	}
};

const moveSlides = function () {
	imgCurrent.style.transform = 'translateX(-100vw)';
	imgNext.style.transform = 'translateX(0vw)';
};

const insertNext = function () {
	//Not to the end of the loop; creat the image at +2
	if (+counter <= images.length - 2) {
		createImg(+counter + 2);
		counter++;
	} else {
		//near or at the end of the loop
		createImg(+counter - (images.length - 2));
		//set or reset the counter
		if (+counter < images.length) {
			counter++;
		} else {
			counter = 1;
		}
	}
};

//infinite loop rotatest through images
// Needs to already have a current and next image element to function

const renderTime = function (object) {
	clear(object);
	if (object == slideNumber) {
		slideNumber.innerHTML = SLIDE_DURATION;
	}
	if (object == transNumber) {
		transNumber.innerHTML = TRANSITION_TIME;
	} else {
		console.log('ERROR use slideNumber or transNumber');
	}
};

function toggleFullscreen() {
	let elem = document.querySelector('.slider-content');

	if (!document.fullscreenElement) {
		elem.requestFullscreen().catch((err) => {
			alert(
				`Unable to enter fullscreen, check you settings: ${err.message} (${err.name})`
			);
		});
	} else {
		document.exitFullscreen();
	}
}

const clear = function (element) {
	element.innerHTML = '';
};

const hideButtons = function () {
	buttonContainer.classList.remove('move-to-front');
	buttonContainer.classList.add('move-to-back');
};
const showButtons = function () {
	buttonContainer.classList.remove('move-to-back');
	buttonContainer.classList.add('move-to-front');
};

const addToggleBtn = function () {
	let newBtn = document.createElement('button');
	newBtn.setAttribute('class', 'btn btn-toggle');
	newBtn.textContent = 'Toggle Full Screen';
	document
		.querySelector('.btn-div')
		.insertAdjacentElement('afterbegin', newBtn);
	newBtn.addEventListener('click', toggleFullscreen);
};

const addBtn = function (name, text, func) {
	let newBtn = document.createElement('button');
	newBtn.setAttribute('class', `btn btn-${name}`);
	newBtn.textContent = text;
	document
		.querySelector('.btn-div')
		.insertAdjacentElement('afterbegin', newBtn);
	newBtn.addEventListener('click', func);
};

const showAndHide = function (e) {
	if (e.code == 'KeyH') {
		hideButtons();
	} else {
		showButtons();
	}
};

const rotate = function () {
	setTimeout(() => {
		//remove the previous slide
		removeSlide();

		//set the current and next variables
		setSlides();

		//move both images left 1 space
		moveSlides();

		//add a new next image
		insertNext();

		//starts over, infinite loop
		rotate();
	}, SLIDE_DURATION * 1000);
};

// Starts the application
const start = function () {
	// create current, next, and previous image
	createImg(1);
	createImg(2);
	createImg(images.length);

	//move the first image in the viewport
	document
		.querySelector(`[data-id="1"]`)
		.classList.add('start');
	//Pushes the buttons to the back layer
	hideButtons();

	//makes full screen
	toggleFullscreen();

	//Starts the loop
	rotate();

	//delete the start slideshow btn
	startBtn.remove();

	//Add toggle full screen btn
	// addToggleBtn();
	addBtn('toggle', 'Toggle Full Screen', toggleFullscreen);
	addBtn('hide', 'Hide Menu', hideButtons);
};

// refreshBtn.addEventListener('click', async () => {
// 	try {
// 		const directoryHandleOrUndefined = await get(
// 			'directory'
// 		);
// 		if (directoryHandleOrUndefined) {
// 			console.log('Dir or undefined');
// 			console.log(directoryHandleOrUndefined.name);
// 			return;
// 		}
// 		// const directoryHandle =
// 		// 	await window.showDirectoryPicker();
// 		// await set('directory', directoryHandle);
// 		// console.log('dir name');
// 		// console.log(directoryHandle.name);
// 		const butDir = document.getElementById('butDirectory');
// 		butDir.addEventListener('click', async () => {
// 			const dirHandle = await window.showDirectoryPicker();
// 			for await (const entry of dirHandle.values()) {
// 				console.log(entry.kind, entry.name);
// 			}
// 		});
// 	} catch (error) {
// 		alert(error.name, error.message);
// 	}
// });

/////REFACTOR BELOW LOTS OF SIMILAR CODE /////

//slide more
const moreSlideClick = function () {
	SLIDE_DURATION = SLIDE_DURATION + 0.5;
	clear(slideNumber);
	slideNumber.innerHTML = SLIDE_DURATION;
};

//slide less
const lessSlideClick = function () {
	if (SLIDE_DURATION > TRANSITION_TIME + 0.75) {
		SLIDE_DURATION = SLIDE_DURATION - 0.5;
		clear(slideNumber);
		slideNumber.innerHTML = SLIDE_DURATION;
	} else {
		alert(
			'Transition time must be less than slide duration'
		);
	}
};

//slide more
const moreTransClick = function () {
	if (TRANSITION_TIME < SLIDE_DURATION - 0.5) {
		TRANSITION_TIME = TRANSITION_TIME + 0.25;
		clear(transNumber);
		transNumber.innerHTML = TRANSITION_TIME;
		document.documentElement.style.setProperty(
			'--TRANSITION-TIME',
			`${TRANSITION_TIME * 1000}ms`
		);
	} else {
		alert(
			'Transition time must be less than slide duration'
		);
	}
};

//slide less
const lessTransClick = function () {
	TRANSITION_TIME = TRANSITION_TIME - 0.25;
	clear(transNumber);
	transNumber.innerHTML = TRANSITION_TIME;

	document.documentElement.style.setProperty(
		'--TRANSITION-TIME',
		`${TRANSITION_TIME * 1000}ms`
	);
};

//Initial setup sets the visible number equal to the config
const init = function () {
	clear(slideNumber);
	slideNumber.innerHTML = SLIDE_DURATION;
	clear(transNumber);
	transNumber.innerHTML = TRANSITION_TIME;
	document.documentElement.style.setProperty(
		'--TRANSITION-TIME',
		`${TRANSITION_TIME * 1000}ms`
	);
};

init();

const testFunc = function () {
	console.log(images);
};

//Clickables
startBtn.addEventListener('click', start); //start

refreshBtn.addEventListener(
	'click',
	async function lookFile() {
		const dirHandle = await window.showDirectoryPicker();

		for await (const [key, value] of dirHandle.entries()) {
			images.push(key);
			startBtn.classList.remove('hidden');
			refreshBtn.classList.add('hidden');
		}
	}
);

moreSlide.addEventListener('click', moreSlideClick);
lessSlide.addEventListener('click', lessSlideClick);
moreTrans.addEventListener('click', moreTransClick);
lessTrans.addEventListener('click', lessTransClick);

document.addEventListener('keypress', showAndHide);
