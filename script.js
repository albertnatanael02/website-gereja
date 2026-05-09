const images = [];

const totalSlides = 50;

/*
  Akan mencari:
  warta/1.jpg
  warta/2.jpg
  dst
*/

for(let i = 1; i <= totalSlides; i++){

  const imgPath = `warta/${i}.jpg`;

  const testImg = new Image();

  testImg.src = imgPath;

  testImg.onload = function(){

    images.push(imgPath);

    if(images.length === 1){
      updateSlide();
    }

    renderThumbnails();
  };
}

let currentIndex = 0;

const mainSlide = document.getElementById("mainSlide");
const thumbnailContainer = document.getElementById("thumbnailContainer");

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

      updateSlide();
    };

    thumbnailContainer.appendChild(thumb);

  });

}

function updateSlide(){

  if(images.length === 0) return;

  mainSlide.src = images[currentIndex];

  renderThumbnails();

}

function changeSlide(direction){

  currentIndex += direction;

  if(currentIndex >= images.length){
    currentIndex = 0;
  }

  if(currentIndex < 0){
    currentIndex = images.length - 1;
  }

  updateSlide();

}

/* =========================
   FULLSCREEN
========================= */

function openFullscreen(){

  const modal =
    document.getElementById("fullscreenModal");

  const fullscreenImage =
    document.getElementById("fullscreenImage");

  fullscreenImage.src = images[currentIndex];

  modal.style.display = "flex";

}

function closeFullscreen(){

  document.getElementById("fullscreenModal")
  .style.display = "none";

}

/* CLOSE WHEN CLICK BACKGROUND */
document
.getElementById("fullscreenModal")
.addEventListener("click", function(e){

  if(e.target === this){

    closeFullscreen();

  }

});