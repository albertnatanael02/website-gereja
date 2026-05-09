const images = [];
const totalSlides = 50;

for(let i = 1; i <= totalSlides; i++){

  const imgPath = `warta/${i}.jpg`;

  const testImg = new Image();

  testImg.src = imgPath;

  testImg.onload = function(){

    images.push(imgPath);

    if(images.length === 1){
      updateSlide(false);
    }

    renderThumbnails();
  };
}

let currentIndex = 0;

const mainSlide =
  document.getElementById("mainSlide");

const thumbnailContainer =
  document.getElementById("thumbnailContainer");

const fullscreenImage =
  document.getElementById("fullscreenImage");

const fullscreenModal =
  document.getElementById("fullscreenModal");

/* =========================
   RENDER THUMBNAIL
========================= */

function renderThumbnails(){

  thumbnailContainer.innerHTML = "";

  images.forEach((img, index)=>{

    const thumb = document.createElement("img");

    thumb.src = img;

    if(index === currentIndex){
      thumb.classList.add("active-thumb");
    }

    thumb.onclick = ()=>{

      currentIndex = index;

      updateSlide(true);

    };

    thumbnailContainer.appendChild(thumb);

  });

  autoScrollThumbnail();
}

/* =========================
   UPDATE SLIDE
========================= */

function updateSlide(animated = true){

  if(images.length === 0) return;

  if(animated){

    mainSlide.classList.remove("slide-animation");

    void mainSlide.offsetWidth;

    mainSlide.classList.add("slide-animation");
  }

  mainSlide.src = images[currentIndex];

  fullscreenImage.src = images[currentIndex];

  renderThumbnails();
}

/* =========================
   CHANGE SLIDE
========================= */

function changeSlide(direction){

  currentIndex += direction;

  if(currentIndex >= images.length){
    currentIndex = 0;
  }

  if(currentIndex < 0){
    currentIndex = images.length - 1;
  }

  updateSlide(true);
}

/* =========================
   AUTO SCROLL THUMBNAIL
========================= */

function autoScrollThumbnail(){

  const activeThumb =
    document.querySelector(".active-thumb");

  if(activeThumb){

    activeThumb.scrollIntoView({

      behavior:"smooth",
      inline:"center",
      block:"nearest"

    });

  }
}

/* =========================
   FULLSCREEN
========================= */

function openFullscreen(){

  fullscreenImage.src = images[currentIndex];

  fullscreenModal.style.display = "flex";
}

function closeFullscreen(){

  fullscreenModal.style.display = "none";
}

/* CLOSE WHEN CLICK BACKGROUND */
fullscreenModal.addEventListener("click", function(e){

  if(e.target === this){

    closeFullscreen();
  }

});

/* =========================
   SWIPE MAIN SLIDE
========================= */

let startX = 0;
let endX = 0;

mainSlide.addEventListener("touchstart", (e)=>{

  startX = e.touches[0].clientX;

});

mainSlide.addEventListener("touchend", (e)=>{

  endX = e.changedTouches[0].clientX;

  handleSwipe();

});

/* =========================
   SWIPE FULLSCREEN
========================= */

fullscreenImage.addEventListener("touchstart", (e)=>{

  startX = e.touches[0].clientX;

});

fullscreenImage.addEventListener("touchend", (e)=>{

  endX = e.changedTouches[0].clientX;

  handleSwipe();

});

/* =========================
   HANDLE SWIPE
========================= */

function handleSwipe(){

  const diff = startX - endX;

  if(diff > 50){

    changeSlide(1);
  }

  if(diff < -50){

    changeSlide(-1);
  }
}

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (e)=>{

  if(e.key === "ArrowRight"){

    changeSlide(1);
  }

  if(e.key === "ArrowLeft"){

    changeSlide(-1);
  }

  if(e.key === "Escape"){

    closeFullscreen();
  }

});