let images = [];

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
   LOAD SLIDES JSON
========================= */

async function loadSlides(){

  try{

    const response =
      await fetch("warta/slides.json");

    const data = await response.json();

    images = data.map(img => `warta/${img}`);

    renderThumbnails();

    updateSlide(false);

  }catch(error){

    console.error(
      "Gagal load slides.json",
      error
    );

  }

}

/* =========================
   RENDER THUMBNAILS
========================= */

function renderThumbnails(){

  thumbnailContainer.innerHTML = "";

  images.forEach((img, index)=>{

    const thumb =
      document.createElement("img");

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

/* =========================
   UPDATE ACTIVE THUMBNAIL
========================= */

function updateActiveThumbnail(){

  const thumbs =
    thumbnailContainer.querySelectorAll("img");

  thumbs.forEach((thumb, index)=>{

    thumb.classList.toggle(
      "active-thumb",
      index === currentIndex
    );

  });

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
   UPDATE SLIDE
========================= */

function updateSlide(animated = true){

  if(images.length === 0) return;

  if(animated){

    mainSlide.classList.remove(
      "slide-animation"
    );

    void mainSlide.offsetWidth;

    mainSlide.classList.add(
      "slide-animation"
    );

  }

  mainSlide.src = images[currentIndex];

  fullscreenImage.src =
    images[currentIndex];

  updateActiveThumbnail();

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

  updateSlide();

}

/* =========================
   FULLSCREEN
========================= */

function openFullscreen(){

  fullscreenImage.src =
    images[currentIndex];

  fullscreenModal.style.display =
    "flex";

}

function closeFullscreen(){

  fullscreenModal.style.display =
    "none";

}

fullscreenModal.addEventListener(
  "click",
  function(e){

    if(e.target === this){

      closeFullscreen();

    }

  }
);

/* =========================
   SWIPE SUPPORT
========================= */

let startX = 0;
let endX = 0;

function handleSwipe(){

  const diff = startX - endX;

  if(diff > 50){

    changeSlide(1);

  }

  if(diff < -50){

    changeSlide(-1);

  }

}

/* MAIN SLIDE */

mainSlide.addEventListener(
  "touchstart",
  (e)=>{

    startX = e.touches[0].clientX;

  }
);

mainSlide.addEventListener(
  "touchend",
  (e)=>{

    endX =
      e.changedTouches[0].clientX;

    handleSwipe();

  }
);

/* FULLSCREEN */

fullscreenImage.addEventListener(
  "touchstart",
  (e)=>{

    startX = e.touches[0].clientX;

  }
);

fullscreenImage.addEventListener(
  "touchend",
  (e)=>{

    endX =
      e.changedTouches[0].clientX;

    handleSwipe();

  }
);

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
  "keydown",
  (e)=>{

    if(e.key === "ArrowRight"){

      changeSlide(1);

    }

    if(e.key === "ArrowLeft"){

      changeSlide(-1);

    }

    if(e.key === "Escape"){

      closeFullscreen();

    }

  }
);

/* =========================
   INIT
========================= */

loadSlides();

/* =========================
   GOOGLE CALENDAR
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    const calendarEl =
      document.getElementById("calendar");

    const mobileView =
      window.innerWidth < 768
        ? "listMonth"
        : "dayGridMonth";

    const calendar =
      new FullCalendar.Calendar(
        calendarEl,
        {

          initialView: mobileView,

          contentHeight:"auto",

          locale:"id",

          displayEventTime:false,

          headerToolbar:{
            left:"prev,next today",
            center:"title",
            right:
              window.innerWidth < 768
                ? ""
                : "dayGridMonth,listMonth"
          },

          buttonText:{
            today:"Hari Ini",
            month:"Bulan",
            list:"Daftar"
          },

          googleCalendarApiKey:
            "MASUKKAN_API_KEY_ANDA",

          events:{
            googleCalendarId:
              "multimediagiabudiman@gmail.com"
          },

          eventClick:function(info){

            info.jsEvent.preventDefault();

            window.open(
              info.event.url,
              "_blank"
            );

          }

        }
      );

    calendar.render();

    /* =========================
       RESPONSIVE VIEW SWITCH
    ========================= */

    window.addEventListener(
      "resize",
      function(){

        if(window.innerWidth < 768){

          calendar.changeView(
            "listMonth"
          );

        }else{

          calendar.changeView(
            "dayGridMonth"
          );

        }

      }
    );

  }
);