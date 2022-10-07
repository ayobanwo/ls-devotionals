fetch("https://dailydevotionals.herokuapp.com/api/get/getAll.php")
.then((response) => response.json())
.then((data) => {
    const arr = data.data
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let dday = yyyy + '-' + mm+ '-' + dd;
    todayDevDisp(yyyy, mm, dd, arr);
    prevDev(yyyy, mm, arr)
    searchOpt(arr, dday); 
    refresh(yyyy, mm, dd, arr);
})
.catch(function (error){
    console.log(error);
})

//Display Today's Devotional
function todayDevDisp(yyyy, mm, dd, arr) {
    let todayDate = yyyy + '-' + mm+ '-' + dd;
    dispDev(todayDate, arr); 
}

//Display Devotional content after checking if Date is in the Dev array
function dispDev(todayDate, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].day === todayDate) {
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
    var image_url = document.querySelector('.image_url')

    body.innerHTML = todayContent.body
    title.innerHTML = todayContent.title
    day.innerHTML = moment(todayContent.day).format("dddd, MMMM Do")
    bible_text.innerHTML = todayContent.bible_text
    prayer.innerHTML = todayContent.prayer
    further_study.innerHTML = todayContent.further_study
    am_scripture.innerHTML = todayContent.am_scripture
    pm_scripture.innerHTML = todayContent.pm_scripture
    week_teaching.innerHTML = todayContent.week_teaching
    image_url.style.backgroundImage = `url(${todayContent.image_url})`
}

//Display previous devotionals in the present month
function prevDev(yyyy, mm, arr) {
    let articleList = document.querySelector('.article-list')
    let today = new Date();
    let day = today.getDate()

    for (let i = day; i > 0 ; i--) {
        dd = String(day).padStart(2, '0')
        thisDay = yyyy + '-' + mm+ '-' + dd;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].day === thisDay) {
                thisDayData = arr[i];
                dispDevUi(thisDayData, dd, articleList, arr)
            }
        }   
        day = day -1
    }
}

function dispDevUi(thisDayData, dd, articleList, arr){
    let articles = document.createElement("div");
    articles.classList.add("article");
    articles.innerHTML = `
    <img class='${'thumb'+dd}' id="thumbnail">
    <div class="article-text">
        <p class="dev-title">
        ${thisDayData.title}
        </p>
        <p class="dev-date">
        ${moment(thisDayData.day).format("dddd, MMMM Do")}
        </p>
        <a class=${'read'+dd} href="#bookmrk" >
        READ NOW
        </a>
        </div>
        `;
    articleList.appendChild(articles)
    let thumbpic =  document.querySelector( `${'.thumb'+dd} `) ;
    thumbpic.src = thisDayData.image_url;
    let readbtn =  document.querySelector( `${'.read'+dd} `) ;
    const todayDate = thisDayData.day
    readbtn.addEventListener("click", e=>{
            dispDev(todayDate, arr)
        })
}