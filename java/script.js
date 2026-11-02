const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img'); 
const totalSlides = slides.length; 
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}


function moveSlide(step) {

    currentSlide += step;

  
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; 
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; 
    }

    updateCarousel(); 
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel'); 
    const slideWidth = slides[0].offsetWidth; 

   
    carousel.style.transition = "transform 0.5s ease-in-out"; 
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`; 
}


if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => moveSlide(-1));
    nextButton.addEventListener('click', () => moveSlide(1));
}


window.addEventListener('resize', updateCarousel);


window.addEventListener('load', updateCarousel);



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "jouw-email@example.com";
    $subject = "Nieuw bericht van contactformulier";
    $body = "Naam: $name\nE-mail: $email\nBericht: $message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo = "Bericht succesvol verstuurd!";
    } else {
        echo = "Er is iets misgegaan bij het versturen van je bericht.";
    }
}


