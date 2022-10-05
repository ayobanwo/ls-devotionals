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

function searchOpt(arr, dday, yyyy, mm, today) {
	let slctOpt = document.querySelector('#slctopt');
	let slctbtn = document.querySelector('.slctbtn');
	let slctDate = document.querySelector('#slctdate');
	let mOpt = document.querySelector('#monthopt');

	// console.log(slctOpt, slctDate, mOpt);
	slctOpt.addEventListener('change', e=>{
		let articleList = document.querySelector('.article-list')
	
		if(slctOpt.value === 'month'){
			mOpt.style.display = 'inline'
			slctDate.style.display = 'none'
			
			mOpt.addEventListener('change', e => {
				articleList.innerHTML = ''; 
				let month =  e.target.value;

				arr.forEach(dev => {
					dd = dev.day.slice(-2)
					//To display only previous and not later devtionals  **raw check
					devrawday = dev.day.replaceAll('-', '');
					todrawday = dday.replaceAll('-', '');
            		if ( dev.day.includes(month) && devrawday <= todrawday ) {
						thisDayData = dev 
                		dispDevUi(thisDayData , dd, articleList, arr)
					}
				});
			})


		}
		else if(slctOpt.value === 'day'){
				slctDate.style.display = 'inline'
				slctbtn.style.display = 'inline'
				mOpt.style.display = 'none'
				slctbtn.addEventListener('click', e=>{
					articleList.innerHTML = ''; 
					let day = slctDate.value
					// console.log('clicked');
					found = false;
					arr.forEach(dev => {
						thisDayData = dev 
						dd = dev.day.slice(-2)
						if(dev.day === day){
							console.log(thisDayData, dd);
							dispDevUi(thisDayData , dd, articleList, arr)
						}
						// else{
						// 	articleList.innerHTML = 'Devotional for this day is not available, select another date'; 
						// }
					});
				})
		}
	})
} 

// searchOpt();