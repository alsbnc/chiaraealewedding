/* LAZY LOAD MAIN IMG */

const mainImg = document.getElementById("main-img");
const bigMainImg = document.createElement("img");

bigMainImg.onload = function(){
    mainImg.src = this.src
    mainImg.classList.remove("blured");
}

setTimeout(() => {
    bigMainImg.src = "/img/piano.jpg";
}, 50);


/* ANIMATE HAM MENU */

const ham = document.getElementById("hamburger");
const header = document.getElementById("header");

function animateMenu(){
    ham.classList.toggle("is-active");
    header.classList.toggle("header-showed");
    
    if(hamCont.classList.contains("showed")){
        hamCont.classList.toggle("dark-ham");
        hiddenLogos.classList.toggle("hidden");
    }
}

// close after link click

const navLinks = document.getElementsByClassName("nav-list__link");

for(i = 0; i < navLinks.length; i++){
    let navLink = navLinks[i];

    navLink.addEventListener("click", function(){
        ham.classList.remove("is-active");
        header.classList.remove("header-showed");
    })
}

//close when click outside

document.addEventListener("click", function(event){
    if(event.target.closest("#header")) return;

        header.classList.remove("header-showed");
        ham.classList.remove("is-active");
});

/* OPEN & CLOSE LIGHTBOX */

const lightbox = document.getElementById("lightbox");

// Open clicked thumb in lightbox


function openInLightbox(i){
    i = i.toString();
    const lightboxImg = document.getElementById("light-img");
    
    lightboxImg.src = "img/img-" + i + ".jpg";
    lightbox.style.transform = "scale(1)";
    lightbox.style.background = "rgba(0, 0, 0, 0.6)"
   
  }
  
//Close lightbox
  
const closeButton = document.getElementById("close");
  
closeButton.addEventListener("click", closeLightbox);
  
function closeLightbox(){
    lightbox.style.transform = "scale(0)";
    lightbox.style.background = "rgba(0, 0, 0, 0.0)"
}

/* INFOBOX */

const infoPopups = document.getElementsByClassName("info-popup-link");

function showInfobox(i){
    infoPopups[i].classList.add("info-popup-visible");   
}

// close infobox

document.addEventListener("click", function(event){
    for(i = 0; i < infoPopups.length; i++){
        let infoPopup = infoPopups[i];

        if(event.target.closest(".info-popup-link")) return;

        infoPopup.classList.remove("info-popup-visible");
    }
})


