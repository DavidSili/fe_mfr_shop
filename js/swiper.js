const listSelector = ".slider__list";
const itemsSelector = ".slider__item";
const bulletSelector = ".slider__bullet";
const swipingInterval = 5000; // milliseconds
let currentSlide = 0;
let activeBullet = 0;
let mainIntervalID, gradualIntervalID;

const items = document.querySelectorAll(itemsSelector);
const list = document.querySelector(listSelector);

function updateSwiper() {
	list.style.width = `${items.length * window.innerWidth}px`;
}

addEventListener("resize", function() {
	updateSwiper();
	moveSliderTo(currentSlide, true);
});

addEventListener("click", function(e) {
	if (e.target.matches(".slider__bullet:not(.active)")) {
		const id = parseInt(e.target.getAttribute("data-id"));
		gradualMoveTo(id);
	}
});

function initiateSwiper() {
	updateSwiper();
	resetMainInterval();
}

function resetMainInterval() {
	if (mainIntervalID) {
		clearInterval(mainIntervalID);
	}
	mainIntervalID = setInterval(function() {
		if (currentSlide === items.length - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}
		
		activeBullet = currentSlide;
		moveSliderTo(currentSlide);
	}, swipingInterval);
}

function moveSliderTo(id, mute = false, gradual = false) {
	if (!mute) {
		list.classList.add("moving");
		setTimeout(function() {
			list.classList.remove("moving");
		}, 700);
	}
	list.style.transform = `translateX(${id * window.innerWidth * -1}px)`;
	if (!gradual) {
		updateBullets();
	}
}

function updateBullets() {
	document.querySelector(`${bulletSelector}.active`)
		.classList.remove('active');
	document.querySelector(`${bulletSelector}[data-id="${activeBullet}"]`)
		.classList.add('active');
}

function gradualMoveTo(id) {
	resetMainInterval();
	currentSlide = id;
	moveSliderTo(id, false, true);
	gradualIntervalID = setInterval(function() {
		if (activeBullet < id) {
			activeBullet++;
			updateBullets();
		} else if (activeBullet > id) {
			activeBullet--;
			updateBullets()
		} else {
			clearInterval(gradualIntervalID);
		}
	}, 100);
}

initiateSwiper();