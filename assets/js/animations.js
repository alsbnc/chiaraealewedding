/* LAZY LOAD MAIN IMG */

const mainImg = document.querySelector("#main-img");
const bigMainImg = document.createElement("img");

bigMainImg.onload = function(){
    mainImg.src = this.src
    mainImg.classList.remove("blured");
}

setTimeout(() => {
    bigMainImg.src = "/img/piano.jpg";
}, 50);


/* ANIMATE HAM MENU */

const ham = document.querySelector("#hamburger");
const header = document.querySelector("#header");

function animateMenu(){
    ham.classList.toggle("is-active");
    header.classList.toggle("header-showed");
    
    if(hamCont.classList.contains("showed")){
        hamCont.classList.toggle("dark-ham");
        hiddenLogos.classList.toggle("hidden");
    }
}

// close after link click

const navLinks = document.querySelectorAll(".nav-list__link");

navLinks.forEach(link => {
    link.addEventListener("click", function(){
        ham.classList.remove("is-active");
        header.classList.remove("header-showed");
        hamCont.classList.toggle("dark-ham");
        hiddenLogos.classList.toggle("hidden");
    })
})

//close when click outside

document.addEventListener("click", function(event){
    if(event.target.closest("#header")) return;

        header.classList.remove("header-showed");
        ham.classList.remove("is-active");
        hamCont.classList.toggle("dark-ham");
        hiddenLogos.classList.toggle("hidden");
});

/* OPEN & CLOSE LIGHTBOX */

const lightbox = document.querySelector("#lightbox");

// Open clicked thumb in lightbox


function openInLightbox(i){
    i = i.toString();
    const lightboxImg = document.querySelector("#light-img");
    
    lightboxImg.src = "img/img-" + i + ".jpg";
    lightbox.style.transform = "scale(1)";
    lightbox.style.background = "rgba(0, 0, 0, 0.6)"
   
  }
  
//Close lightbox
  
const closeButton = document.querySelector("#close");
  
closeButton.addEventListener("click", closeLightbox);
  
function closeLightbox(){
    lightbox.style.transform = "scale(0)";
    lightbox.style.background = "rgba(0, 0, 0, 0.0)"
}

/* INFOBOX */

const infoPopups = document.querySelectorAll(".info-popup-link");

function showInfobox(i){
    infoPopups[i].classList.add("info-popup-visible");   
}

// close infobox

document.addEventListener("click", function(event){
    infoPopups.forEach(infoPopup => {
        if(event.target.closest(".info-popup-link")) return;

        infoPopup.classList.remove("info-popup-visible");
    })

})


