function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id !== sectionId) {
            section.style.opacity = "0"; 
            section.style.display = "none";
        }
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = "block"; // Hiện
        setTimeout(() => {
            activeSection.classList.add('slide-in');
        }, 50);
    }
}

function setActive(section) {
    const navItems = document.querySelectorAll('.custom-nav-item');
    navItems.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('shadow-active');
    });
    document.querySelector(`.custom-nav-item a[onclick*="${section}"]`).parentElement.classList.add('active');
    setTimeout(() => {
        document.querySelector(`.custom-nav-item a[onclick*="${section}"]`).parentElement.classList.add('shadow-active');
    }, 100);
}

function copyOrderCode() {
    const orderCode = document.getElementById('orderCodeValue').innerText;
    navigator.clipboard.writeText(orderCode).then(() => {
        console.log('Order code copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

document.addEventListener('click', function (e) {
    const highlight = document.createElement('div');
    highlight.className = 'click-highlight';
    highlight.style.left = `${e.pageX - 10}px`; 
    highlight.style.top = `${e.pageY - 10}px`;

    document.body.appendChild(highlight);
    setTimeout(() => {
        highlight.remove();
    }, 500);
});
$(document).ready(function () {
    $('.center').slick({
        centerMode: true,
        centerPadding: '15vw', 
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 1000, 
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true, 
        focusOnSelect: true, 
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '2px', 
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '2px',
                    slidesToShow: 1
                }
            }
        ]
    });
});

const carousel = document.querySelector(".carousel");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0; 
const items = document.querySelectorAll(".item");
const itemsPerPage = 6;
const totalItems = items.length;
const totalSlides = Math.ceil(totalItems / itemsPerPage);

function updateActiveItems() {
  items.forEach(item => item.classList.remove("active"));
  const start = currentIndex * itemsPerPage;
  const end = start + itemsPerPage;
  for (let i = start; i < end && i < totalItems; i++) {
    items[i].classList.add("active");
  }
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
  updateActiveItems();
}

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) currentIndex--;
  else currentIndex = totalSlides - 1;
  updateCarousel();
});

rightArrow.addEventListener("click", () => {
  if (currentIndex < totalSlides - 1) currentIndex++;
  else currentIndex = 0;
  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

window.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
});
  
