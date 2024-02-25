
//Hero Slider 

let slideIndex = 0
let slides = document.getElementsByClassName("slide")

slides[slideIndex].style.display = "block";

function changeSlides(index) {
    slides[slideIndex].style.display = "none";
    slideIndex += index
    if (slideIndex > slides.length - 1) {
        slideIndex = 0
    }
    else if (slideIndex < 0) {
        slideIndex = slides.length - 1
    }
    slides[slideIndex].style.display = "block";
}

//Recommandation Slide

let mouseHoldDown = false
let mouseStartPos;
let mouseStopPos;
let distance = 0;
let scrollLeft;
const cardContainer = document.querySelector(".cardContainer")

function recSlideStart(data) {
    mouseHoldDown = true;
    mouseStartPos = data.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
}

function recSlideDrag(data) {
    if (mouseHoldDown) {
        data.preventDefault();
        mouseStopPos = data.pageX - cardContainer.offsetLeft;
        distance = mouseStopPos - mouseStartPos;
        cardContainer.scrollLeft = scrollLeft - distance;
    }
    else
        return;
}

function recSlideStop() {
    mouseHoldDown = false;
}

cardContainer.addEventListener("mousedown", recSlideStart);
cardContainer.addEventListener("mousemove", recSlideDrag);
cardContainer.addEventListener("mouseup", recSlideStop);
cardContainer.addEventListener("mouseleave", recSlideStop);

//Product Cards
const productCardContainer = document.querySelector(".productCardContainer"); // 300px
const productCardContext = productCardContainer.querySelector('.card-context'); 
const productCardImgs = productCardContainer.querySelectorAll("img"); // 3
const productCardPerWidth = productCardContainer.clientWidth / productCardImgs.length; // 300 / 3

function productCardSlide(event) {
    event.preventDefault();
    const leftOffset = productCardContainer.offsetLeft; // 100
    const position = event.pageX - leftOffset; // 210  - 100 = 110

    for (let i = 0; i < productCardImgs.length; i++) {
        const start = i * productCardPerWidth; // 200 
        const end = start + productCardPerWidth; // 400

        if (position >= start && position <= end) {
            productCardContext.style.left = `-${i * productCardContainer.clientWidth}px`;
            break;
        }
    }
}

productCardContainer.addEventListener("mousemove", productCardSlide);