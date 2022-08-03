const popup = document.querySelector(".pop-up");
const body = document.querySelector(".body");
const closePopup = document.querySelector(".no");
const register = document.querySelector(".yes");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });
  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}

// function click(){
//     click.addEventListener("click", () => {
//         popup.classList.add("hide-popup");
//       });
// }

// click();
if (popup) {
    click.addEventListener("click", () => {
      popup.classList.add("hide-popup");
    });
  
    window.addEventListener("load", () => {
      setTimeout(() => {
        popup.classList.remove("hide-popup");
      }, 1000);
    });
  }

  
/* ========================================================================= */
/*  On scroll fade/bounce fffect
/* ========================================================================= */

    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
    });
    wow.init();