// ----------------- MENU -------------------
const menu_BTN = document.querySelector('.menu-btn');
const nav_NAV = document.querySelector('.nav');

menu_BTN.addEventListener('click', () => {
	menu_BTN.classList.toggle('menu-btn--active');
	nav_NAV.classList.toggle('nav--active');
});

// ----------------- GALLERY -------------------
const gallery_DIV = document.querySelector('.gallery');
const close_ICO = gallery_DIV.querySelector('.close');
const moveLeft_ICO = gallery_DIV.querySelector('.move-left');
const moveRight_ICO = gallery_DIV.querySelector('.move-right');

const gallery_BTN = document.querySelector('.gallery-button');
const galleryItems_DOM = gallery_DIV.querySelectorAll('.gallery__item');

hideGallery = () => {
	gallery_DIV.querySelector('.gallery__item').style.opacity = 0;
	gallery_DIV.classList.remove('gallery--active');
	close_ICO.removeEventListener('click', hideGallery);
	moveLeft_ICO.removeEventListener('click', swipeLeft);
	moveRight_ICO.removeEventListener('click', swipeRight);
	gallery_DIV.querySelector('.gallery__item--active').classList.remove('gallery__item--active');
	galleryItems_DOM[0].classList.add('gallery__item--active');
	galleryOpenListener();
};
showGallery = () => {
	gallery_BTN.removeEventListener('click', showGallery);
	galleryActivation();
};

galleryOpenListener = () => {
	gallery_BTN.addEventListener('click', showGallery);
};
galleryCloseListener = () => {
	close_ICO.addEventListener('click', hideGallery);
};

galleryActivation = () => {
	gallery_DIV.classList.add('gallery--active');

	let position = 0;
	let opacIsAnimating = false;
	let opacInterval = null;

	opacAnimation = () => {
		if (opacIsAnimating === true) {
			clearInterval(opacInterval);
			opacIsAnimating == false;
		}

		let opac = 0;
		opacInterval = setInterval(frame, 23);
		opacIsAnimating = true;

		function frame() {
			if (opac >= 1) {
				opacIsAnimating = false;
				clearInterval(opacInterval);
			} else {
				opac += 0.05;
				gallery_DIV.querySelector('.gallery__item--active').style.opacity = opac;
			}
		}
	};

	swipe = (direction) => {
		const acutalItem = gallery_DIV.querySelector('.gallery__item--active');
		gallery_DIV.querySelector('.gallery__item').style.opacity = 0;

		if (direction == 'right') {
			if (position < galleryItems_DOM.length - 1) {
				const itemToShow = acutalItem.nextElementSibling;
				acutalItem.classList.remove('gallery__item--active');
				itemToShow.classList.add('gallery__item--active');
				position++;
			}
		} else if (direction == 'left') {
			if (position > 0) {
				const itemToShow = acutalItem.previousElementSibling;
				acutalItem.classList.remove('gallery__item--active');
				itemToShow.classList.add('gallery__item--active');
				position--;
			}
		}

		opacAnimation();
	};

	moveLeft_ICO.addEventListener(
		'click',
		(swipeLeft = () => {
			swipe('left');
		})
	);
	moveRight_ICO.addEventListener(
		'click',
		(swipeRight = () => {
			swipe('right');
		})
	);

	opacAnimation();
	galleryCloseListener();
};

if (gallery_DIV.classList.contains('gallery--active')) {
	galleryCloseListener();
	galleryActivation();
} else {
	galleryOpenListener();
}
