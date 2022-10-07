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
	let searchbtn = document.querySelector('.searchbtn');
	let notfound = document.querySelector('.notfound');
	let slctDate = document.querySelector('#slctdate');
	let mOpt = document.querySelector('#monthopt');
	let titleSearch = document.querySelector('#searchtitle');

	slctOpt.addEventListener('change', e=>{
		let articleList = document.querySelector('.article-list')
	
		if(slctOpt.value === 'month'){
			mOpt.style.display = 'inline'
			slctDate.style.display = 'none'
			searchbtn.style.display = 'none'
			titleSearch.style.display = 'none'
			
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
				searchbtn.style.display = 'inline'
				mOpt.style.display = 'none'
				titleSearch.style.display = 'none'
				searchbtn.addEventListener('click', e=>{
					articleList.innerHTML = ''; 
					let day = slctDate.value
					found = false;
					arr.forEach(dev => {
						thisDayData = dev; 
						dd = dev.day.slice(-2)
						if(dev.day === day){
							dispDevUi(thisDayData , dd, articleList, arr)
						}
					});
				})
		}
		else if(slctOpt.value === 'title'){
			titleSearch.style.display = 'inline';
			slctDate.style.display = 'none';
			searchbtn.style.display = 'none'
			mOpt.style.display = 'none';
			titleSearch.addEventListener('keyup', e => {
				articleList.innerHTML = ''; 
				const searchVal = e.target.value.toUpperCase()

				if (searchVal !== '') {

					// foundDevArr = arr.filter( dev => {
					// 	devTitle = dev.title;
					// 	devrawday = dev.day.replaceAll('-', '');
					// 	todrawday = dday.replaceAll('-', '');
					// 	return devTitle.includes(searchVal) && devrawday <= todrawday ;
					// })
					// if (foundDevArr !== ''){
					// 	foundDevArr.forEach( dev =>{
					// 		console.log('found');
					// 		thisDayData = dev;
					// 		dispDevUi(thisDayData , dd, articleList, arr)
					// 	})
					// }
					// else{
					// 	articleList.innerHTML = 'Devotional not found';
					// }
					arr.forEach(dev => {
						devTitle = dev.title;
						thisDayData = dev;
						dd = dev.day.slice(-2); 
						// console.log(searchVal);
						devrawday = dev.day.replaceAll('-', '');
						todrawday = dday.replaceAll('-', '');
						if(devTitle.includes(searchVal) && devrawday <= todrawday){
							dispDevUi(thisDayData , dd, articleList, arr)
							// found = true;
							// return console.log(found);
						}
						// else{
						// 	articleList.innerHTML = "not found"
						// }
					})	
					
				}
		
			})
		}
	})
} 

function refresh(yyyy, mm, dd, arr) {
	let imgclick = document.querySelector('.aux-logo')
	imgclick.addEventListener('click', e => {
		e.preventDefault();
		todayDevDisp(yyyy, mm, dd, arr);
	})
}