function dispDev(yyyy, mm, dd, arr, today) {
    today = yyyy + '-' + mm+ '-' + dd;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].day === today) {
            todayContent = arr[i];
        }
    }
    let body = document.querySelector('#body')
    let title = document.querySelector('#title')
    let day = document.querySelector('#day')
    let bible_text = document.querySelector('#bible_text')
    let prayer = document.querySelector('#prayer')
    let further_study = document.querySelector('#further_study')
    let am_scripture = document.querySelector('#am_scripture')
    let pm_scripture = document.querySelector('#pm_scripture')
    let week_teaching = document.querySelector('#week_teaching')
    let image_url = document.querySelector('#image_url')

    
    body.innerHTML = todayContent.body
    title.innerHTML = todayContent.title
    day.innerHTML = moment(todayContent.day).format("dddd, MMMM Do")
    bible_text.innerHTML = todayContent.bible_text
    prayer.innerHTML = todayContent.prayer
    further_study.innerHTML = todayContent.further_study
    am_scripture.innerHTML = todayContent.am_scripture
    pm_scripture.innerHTML = todayContent.pm_scripture
    week_teaching.innerHTML = todayContent.week_teaching
}
function todayDevDisp(yyyy, mm, dd, arr, today) {
    dispDev(yyyy, mm, dd, arr, today); 
}

function prevDev(yyyy, mm, dd, arr) {
    let articleList = document.querySelector('.article-list')
     
    let today = new Date();
    let day = today.getDate()

    for (let i = day-1; i > 0 ; i--) {
        day = day -1
    
        dd = String(day).padStart(2, '0')
        thisDay = yyyy + '-' + mm+ '-' + dd;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].day === thisDay) {
                thisDayContent = arr[i];
                let articles = document.createElement("div");
                articles.classList.add("article");
                articles.innerHTML = `
                <img src="images/art-img.png" alt="" class="art-img">
                <div class="article-text">
                    <p class="dev-title">
                    ${thisDayContent.title}
                    </p>
                    <p class="dev-date">
                    ${moment(thisDayContent.day).format("dddd, MMMM Do")}
                    </p>
                    <a class=${'read'+dd} href="#bookmrk">
                    READ NOW
                    </a>
                </div>
                `;
                articleList.appendChild(articles)
                let readbtn =  document.querySelector( `${'.read'+dd} `) ;

                const ff = dd;
                readbtn.addEventListener("click", e=>{
                        dispDev(yyyy, mm, dd = ff, arr, today)
                    })
            }
        }   
    }
}

fetch(" https://dailydevotionals.herokuapp.com/api/get/getAll.php")
    .then((response) => response.json())
    .then((data) => {
        const arr = data.data
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
    
        todayDevDisp(yyyy, mm, dd, arr, today);
        prevDev(yyyy, mm, dd, arr)

    }).catch(function (error){
        console.log(error);
    })
