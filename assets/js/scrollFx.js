/* smooth scroll is handled by zenscroll, but it has to be fixed: stop before title and stopping before section */

/* CHANGE MENU COLOR BASED ON BACKGROUND */

/* const hamLines = document.getElementById("hamburger-inner"); */
const hamCont = document.querySelector(".ham-container");
const hiddenLogos = document.querySelector(".hidden");
const welcomeSection = document.querySelector("main");

const menuColorChangeOptions = {
	rootMargin: "-70px 0px 0px 0px"
};

const menuColorChangeObserver = new IntersectionObserver(function(entries, menuColorChangeObserver){
	entries.forEach(entry => {
		if(!entry.isIntersecting){
			hamCont.classList.add("dark-ham");
			hamCont.classList.add("showed");
			hiddenLogos.classList.remove("hidden");
		} else {
			hamCont.classList.remove("dark-ham");
			hamCont.classList.remove("showed");
			hiddenLogos.classList.add("hidden");
		}
	});
}, menuColorChangeOptions);

menuColorChangeObserver.observe(welcomeSection);

/* ANIMATE PAGE ELEMS */

const faders = document.querySelectorAll(".fade-in");
const secTitles = document.querySelectorAll(".title");
const cards = document.querySelectorAll(".card");
const contactCards = document.querySelectorAll(".contact-list__col")

const appearOnScrollOptions = {
	threshold: 0.4
};
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
	entries.forEach(entry => {
		if(!entry.isIntersecting){
			return;
		} else {
			entry.target.classList.add("appear");
			appearOnScroll.unobserve(entry.target);
		}
	})
}, appearOnScrollOptions);

faders.forEach(fader => {
	appearOnScroll.observe(fader);
})

secTitles.forEach(title => {
	appearOnScroll.observe(title);
})

cards.forEach(card => {
	appearOnScroll.observe(card);
})

contactCards.forEach(card => {
	appearOnScroll.observe(card);
})

/* LAZY LOAD IMAGES ON SCROLL */

const images = document.querySelectorAll("[data-src]");

function preloadImage(img){
	const src = img.getAttribute("data-src");
	if (!src){
		return
	}

	img.src = src;
}

const imgOptions = {
	threshold: 0,
	rootMargin: "0px 0px 400px 0px"
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
	entries.forEach(entry => {
		if(!entry.isIntersecting){
			return;
		} else {
			preloadImage(entry.target);
			imgObserver.unobserve(entry.target);
		}
	})
}, imgOptions);

images.forEach(image => {
	imgObserver.observe(image);
})
