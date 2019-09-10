/* SMOOTH SCROLL */
const links = document.querySelectorAll("a");

for(let i=0; i<links.length; i++) {
	links[i].addEventListener("click", linkClick);
  }

function linkClick(event) {
	smoothScroll(event);
  }

  function smoothScroll(event) {
	event.preventDefault();
	const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
	const targetPosition = document.querySelector(targetId).offsetTop - 50;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	const duration = 1000;
	let start = null;
	
	window.requestAnimationFrame(step);
  
	function step(timestamp) {
	  if (!start) start = timestamp;
	  const progress = timestamp - start;
	  // window.scrollTo(0, distance*(progress/duration) + startPosition);
	  window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
	  if (progress < duration) window.requestAnimationFrame(step);
	}
  }
  
  // Easing Function
  
  function easeInOutCubic(t, b, c, d) {
	  t /= d/2;
	  if (t < 1) return c/2*t*t*t + b;
	  t -= 2;
	  return c/2*(t*t*t + 2) + b;
  };
//if (viewportWidth > 950)

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
