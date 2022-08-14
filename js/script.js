let togBtn = document.querySelector('#toggleBtn');
let ham = document.querySelector('#ham');
let sidebar = document.querySelector('.sidebar');

togBtn.addEventListener('click', e=>{
    function toggleFullScreen() {
       if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
         if (document.documentElement.requestFullscreen) {
           document.documentElement.requestFullscreen();
         } else if (document.documentElement.mozRequestFullScreen) {
           document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullscreen) {
           document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
         }
       } else {
          if (document.cancelFullScreen) {
             document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
       }
     }
     toggleFullScreen();
})

ham.addEventListener('click', e=>{
	if(sidebar.style.display === 'none'){
		sidebar.style.display = 'inline';
		// sidebar.classList.add('slide');
		sidebar.classList.add('slideInLeft');
		sidebar.classList.remove('slideInRight');
	}
	else{
		sidebar.style.display = 'none';
		sidebar.classList.remove('slideInLeft');
		sidebar.classList.add('slideInRight');
	}
})