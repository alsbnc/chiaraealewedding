/* SMOOTH SCROLL */

(function() {
	scrollTo();
})();

function scrollTo() {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
            link.onclick = scrollAnchors;
		}
	}
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;

	/* change scroll distance from target top based on screen width */

	var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	if (viewportWidth > 950){
		var originalTop = distanceToTop(targetAnchor) -70 /* -70 to avoid header to cover section title */;
	} else {
		var originalTop = distanceToTop(targetAnchor);
	}

    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
            /* targetAnchor.focus(); */
			window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
		}
	}, 100);
}

/* CHANGE MENU COLOR BASED ON BACKGROUND */

const hamLines = document.getElementById("hamburger-inner");
const welcomeSection = document.querySelector("main");

const menuColorChangeOptions = {
	rootMargin: "-35px 0px 0px 0px"
};

const menuColorChangeObserver = new IntersectionObserver(function(entries, menuColorChangeObserver){
	entries.forEach(entry => {
		if(!entry.isIntersecting){
			hamLines.classList.add("dark-ham");
		} else {
			hamLines.classList.remove("dark-ham");
		}
	});
}, menuColorChangeOptions);

menuColorChangeObserver.observe(welcomeSection);

/* ANIMATE PAGE ELEMS */

const faders = document.querySelectorAll(".fade-in");

const appearOnScrollOptions = {
	threshold: 0.5,
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
