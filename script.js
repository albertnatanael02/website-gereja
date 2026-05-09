/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");

menuToggle.addEventListener(
  "click",
  function(){

    navMenu.classList.toggle(
      "active"
    );

  }
);

/* =========================
   WARTA JEMAAT
========================= */

let slides = [];

let currentSlide = 0;

const mainSlide =
  document.getElementById(
    "mainSlide"
  );

const fullscreenModal =
  document.getElementById(
    "fullscreenModal"
  );

const fullscreenImage =
  document.getElementById(
    "fullscreenImage"
  );

fetch("warta/slides.json")

  .then(response => response.json())

  .then(data => {

    slides = data;

    showSlide(0);

    generateThumbnails();

  });

function showSlide(index){

  currentSlide = index;

  mainSlide.src =
    `warta/${slides[index]}`;

  fullscreenImage.src =
    `warta/${slides[index]}`;

}

function generateThumbnails(){

  const container =
    document.getElementById(
      "thumbnailContainer"
    );

  slides.forEach(
    (slide,index) => {

      const img =
        document.createElement("img");

      img.src =
        `warta/${slide}`;

      img.onclick =
        () => showSlide(index);

      container.appendChild(img);

    }
  );

}

function openFullscreen(){

  fullscreenModal.style.display =
    "flex";

}

function closeFullscreen(){

  fullscreenModal.style.display =
    "none";

}

function changeSlide(direction){

  currentSlide += direction;

  if(currentSlide < 0){

    currentSlide =
      slides.length - 1;

  }

  if(currentSlide >= slides.length){

    currentSlide = 0;

  }

  showSlide(currentSlide);

}

/* =========================
   GOOGLE CALENDAR
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    const calendarEl =
      document.getElementById(
        "calendar"
      );

    const isMobile =
      window.innerWidth < 768;

    const calendar =
      new FullCalendar.Calendar(
        calendarEl,
        {

          initialView:
            isMobile
              ? "listMonth"
              : "dayGridMonth",

          contentHeight:"auto",

          locale:"id",

          displayEventTime:false,

          headerToolbar:{
            left:"prev,next today",
            center:"title",
            right:
              isMobile
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
              "MASUKKAN_CALENDAR_ID"
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

  }
);