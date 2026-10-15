const slides = document.querySelectorAll(".slide");

let actual = 0;

function cambiarSlide(){

    slides[actual].classList.remove("activo");

    actual++;

    if(actual >= slides.length){

        actual = 0;

    }

    slides[actual].classList.add("activo");
}

setInterval(cambiarSlide,3000);