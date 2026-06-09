//////header js///////
window.addEventListener('scroll', function () {
    const header = document.getElementById('mainHeader');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
const navCollapse = document.getElementById('mainNav');
const toggler = document.querySelector('.navbar-toggler .menu-icon');

navCollapse.addEventListener('show.bs.collapse', function () {
    toggler.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="M6 6 18 18"></path>
        </svg>
    `;
});

navCollapse.addEventListener('hide.bs.collapse', function () {
    toggler.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M4 5h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 19h16"></path>
        </svg>
    `;
});
//////header js///////

/////fade up animation///////
document.addEventListener("DOMContentLoaded", () => {

    const fadeElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const el = entry.target;
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add("show");
                }, delay);

                observer.unobserve(el);
            }

        });

    }, {
        threshold: 0.2
    });

    fadeElements.forEach((el) => {
        observer.observe(el);
    });

});
/////fade up animation///////
///////banner js/////////
const hero = document.querySelector('#top');
const heroImage = document.querySelector('.hero-image');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if(scrollY <= heroHeight){

        /* IMAGE PARALLAX + ZOOM */

        const scale = 1 + (scrollY * 0.0002);

        heroImage.style.transform =
            `translateY(${scrollY * 0.10}px) scale(${scale})`;

        /* CONTENT FADE */

        const opacity =
            Math.max(1 - (scrollY / 1200), 0.60);

        heroContent.style.opacity = opacity;

        /* CONTENT MOVE */

        heroContent.style.transform =
            `translateY(${scrollY * 0.15}px)`;
    }

});
///////banner js/////////

///////counters js/////////

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter-text");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            // Ek hi baar run ho
            if (counter.dataset.animated === "true") return;

            counter.dataset.animated = "true";

            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 sec
            const startTime = performance.now();

            function animate(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const value = Math.floor(progress * target);

                counter.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent =
                        target.toLocaleString() + "+";
                }
            }

            requestAnimationFrame(animate);

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

});
///////counters js/////////

///////image gallery js/////////

const galleryData = [
    { src: "images/gallery-exterior.jpg", caption: "Exterior Renders" },
    { src: "images/gallery-lobby.jpg", caption: "Grand Lobby" },
    { src: "images/gallery-living-.jpg", caption: "Living Room" },
    { src: "images/gallery-pool.jpg", caption: "Rooftop Pool" },
    { src: "images/gallery-bedroom.jpg", caption: "Master Bedroom" },
    { src: "images/gallery-clubhouse.jpg", caption: "Clubhouse" },
    { src: "images/gallery-landscape.jpg", caption: "Landscape Areas" } 
];

let currentIndex = 0;
function updatePopup(index) {
    const popupImg = document.getElementById("popupImage");
    const popupCap = document.getElementById("popupCaption");
    
    if (popupImg && popupCap) {
        popupImg.src = galleryData[index].src;
        popupCap.innerText = galleryData[index].caption;
    }
}
function openGallery(index) {
    currentIndex = index;
    updatePopup(currentIndex);
}
function nextImage() {
    currentIndex++;
    
    
    if (currentIndex >= galleryData.length) {
        currentIndex = 0;
    }
    
    updatePopup(currentIndex);
}
function prevImage() {
    currentIndex--;
    
  
    if (currentIndex < 0) {
        currentIndex = galleryData.length - 1;
    }
    
    updatePopup(currentIndex);
}
document.addEventListener('keydown', function(event) {
    const modalEl = document.getElementById('galleryModal');
    
    if (modalEl && modalEl.classList.contains('show')) {
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        }
    }
});
///////image gallery js/////////

/////////about-image////////
document.addEventListener("DOMContentLoaded", function(){

    const section = document.querySelector(".reveal-section");
    const overlay = document.querySelector(".reveal-overlay");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                overlay.animate(
                    [
                        {
                            transform:"translateX(0%)"
                        },
                        {
                            transform:"translateX(100%)"
                        }
                    ],
                    {
                        duration:600,
                        easing:"cubic-bezier(.99,0,.20,1)",
                        fill:"forwards"
                    }
                );

                observer.unobserve(section);
            }

        });

    }, {
        threshold:0.3
    });

    observer.observe(section);

});/////////about-image////////
/////////floorplan-slider////////
new Swiper(".floorplan-slider", {
    loop: false,
    spaceBetween: 24,

    slidesPerView: 1,

    breakpoints: {
        576: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 3.2
        }
    },

       navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev"
    }
}); 
/////////floorplan-slider////////

/////////floorplan-popupFloorplan////////
function openFloorPlan(img,title,size){

    document.getElementById('popupFloorplan').src = img;

    document.getElementById('popupTitle').innerText = title;

    document.getElementById('popupSize').innerText = size;
}
/////////floorplan-popupFloorplan////////