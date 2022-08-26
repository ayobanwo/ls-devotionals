let selectBtn = document.querySelector('.slct-btn');
let form = document.querySelector('form');
let body = document.querySelector('#body')
let title = document.querySelector('#title')
let bible_text = document.querySelector('#bible_text')
let prayer = document.querySelector('#prayer')
let further_study = document.querySelector('#further_study')
let am_scripture = document.querySelector('#am_scripture')
let pm_scripture = document.querySelector('#pm_scripture')
let week_teaching = document.querySelector('#week_teaching')
let image_url = document.querySelector('#image_url')
selectBtn.addEventListener('click', e =>{
    e.preventDefault();
    fetch(" https://dailydevotionals.herokuapp.com/api/get/getAll.php")
        .then((response) => response.json())
        .then((data) => {
            const arr = data.data
            let day = document.querySelector('#day').value;

            console.log(day);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].day === day) {
                    todayContent = arr[i];
                }
            }
    
            body.innerHTML = todayContent.body
            title.value = todayContent.title
            bible_text.value = todayContent.bible_text
            prayer.value = todayContent.prayer
            further_study.value = todayContent.further_study
            am_scripture.value = todayContent.am_scripture
            pm_scripture.value = todayContent.pm_scripture
            week_teaching.value = todayContent.week_teaching
    
        }).catch(function (error){
            console.log(error);
        })
})

console.log(prayer.value);
form.addEventListener('submit', e=>{
    e.preventDefault();

    dataObj = {};

    dataObj['body'] = body.value;
    dataObj['title'] = title.value;
    dataObj['day'] = day.value;
    dataObj['bible_text'] = bible_text.value;
    dataObj['prayer'] = prayer.value;
    dataObj['further_study'] = further_study.value;
    dataObj['am_scripture'] = am_scripture.value;
    dataObj['pm_scripture'] = pm_scripture.value;
    dataObj['week_teaching'] = week_teaching.value;
    dataObj['image_url'] = image_url.value;

    console.log(dataObj);
    fetch("https://dailydevotionals.herokuapp.com/api/patch/update.php", {
        method: 'patch',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        return response.json();
    }).then(function (responseData){
        let message = responseData.message;
        console.log(message);
        console.log(responseData);
      return message;
    }).catch(function (error){
        console.log(error);
    })
})


