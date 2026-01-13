let currentIndex = 0;
const boxes = document.querySelectorAll('.box');
const links = document.querySelectorAll('.sidebar a');

// Smooth 
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        console.log("Scrolling to section:", sectionId);
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.log("Section not found:", sectionId);
    }
}

// hover 
boxes.forEach((box, index) => {
    box.addEventListener('mouseenter', () => {
        links.forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.bullet-points li').forEach(bullet => bullet.classList.remove('active'));
        
        links[index].classList.add('active');
        const bulletPoints = document.querySelectorAll(`.bullet-points`)[index].querySelectorAll('li');
        bulletPoints.forEach(bullet => bullet.classList.add('active'));
    });

    box.addEventListener('mouseleave', () => {
        links[index].classList.remove('active');
        const bulletPoints = document.querySelectorAll(`.bullet-points`)[index].querySelectorAll('li');
        bulletPoints.forEach(bullet => bullet.classList.remove('active'));
    });
});

// Mob (hide)
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const toggleImage = document.getElementById('toggle-image');
    const hamburgerButton = document.querySelector('.toggle-button i');

    const isMenuVisible = dropdownMenu.style.display === 'flex';

    dropdownMenu.style.display = isMenuVisible ? 'none' : 'flex';
    dropdownMenu.style.opacity = isMenuVisible ? '0' : '1';
    hamburgerButton.style.display = isMenuVisible ? 'block' : 'none';
    toggleImage.style.display = isMenuVisible ? 'none' : 'block';
}

function hideDropdownOnScroll() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'flex') {
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.opacity = '0';
        document.querySelector('.toggle-button i').style.display = 'block';
        document.getElementById('toggle-image').style.display = 'none';
    }
}

document.addEventListener('scroll', hideDropdownOnScroll);


// img grow with arrows
const images = document.querySelectorAll('.section-image');
const enlargedImageContainer = document.querySelector('.enlarged-image');
const enlargedImg = enlargedImageContainer.querySelector('.enlarged-img');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentImgIndex = 0;

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentImgIndex = index;
    showEnlargedImage();
  });
});

function showEnlargedImage() {
  enlargedImg.src = images[currentImgIndex].src;
  enlargedImageContainer.classList.add('show');
}

function hideEnlargedImage() {
  enlargedImageContainer.classList.remove('show');
}

function showNextImage() {
  currentImgIndex = (currentImgIndex + 1) % images.length;
  showEnlargedImage();
}

function showPrevImage() {
  currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
  showEnlargedImage();
}


nextArrow.addEventListener('click', showNextImage);
prevArrow.addEventListener('click', showPrevImage);
enlargedImageContainer.addEventListener('click', (e) => {
  if (e.target === enlargedImageContainer || e.target === enlargedImg) {
    hideEnlargedImage();
  }
});

// keyboard arrows activate
document.addEventListener('keydown', (event) => {
  if (enlargedImageContainer.classList.contains('show')) {
    if (event.key === 'ArrowRight') {
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      showPrevImage();
    }
  }
});

//  hide img on scroll
// window.addEventListener('scroll', () => {
//   if (enlargedImageContainer.classList.contains('show')) {
//     hideEnlargedImage();
//   }
// });

// X close img
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', hideEnlargedImage);