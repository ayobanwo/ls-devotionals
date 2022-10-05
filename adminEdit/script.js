let selectBtn = document.querySelector('.slct-btn');
let form = document.querySelector('form');
let body = document.querySelector('#body')
let title = document.querySelector('#title')
let id = document.querySelector('#id')
let bible_text = document.querySelector('#bible_text')
let prayer = document.querySelector('#prayer')
let further_study = document.querySelector('#further_study')
let day = document.querySelector('#day')
let am_scripture = document.querySelector('#am_scripture')
let pm_scripture = document.querySelector('#pm_scripture')
let week_teaching = document.querySelector('#week_teaching')
let image_url = document.querySelector('#image_url')
let msg = document.querySelector('#msg')

selectBtn.addEventListener('click', e =>{
    e.preventDefault();
    fetch(" https://dailydevotionals.herokuapp.com/api/get/getAll.php")
        .then((response) => response.json())
        .then((data) => {
            const arr = data.data
            let slctDate = day.value;            
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].day === slctDate) {
                    todayContent = arr[i];
                    msg.innerHTML = '';
                }
                else{
                    msg.innerHTML = "Devotional for this date does not exist. Select another date"
                    setTimeout(() => {
                        msg.innerHTML = '';
                        // day.value = '';
                    }, 5000);
                }
            }
    
            body.innerHTML = todayContent.body
            title.value = todayContent.title
            id.value = todayContent.id
            bible_text.value = todayContent.bible_text
            prayer.value = todayContent.prayer
            further_study.value = todayContent.further_study
            am_scripture.value = todayContent.am_scripture
            pm_scripture.value = todayContent.pm_scripture
            week_teaching.value = todayContent.week_teaching
            image_url.value = todayContent.image_url

    
        }).catch(function (error){
            // console.log(error);
        })
})

form.addEventListener('submit', e=>{
    e.preventDefault();
 
    let _token = sessionStorage.getItem('_token');

    dataObj = {};

    dataObj['body'] = body.value;
    dataObj['id'] = id.value;
    dataObj['title'] = title.value;
    dataObj['day'] = day.value;
    dataObj['bible_text'] = bible_text.value;
    dataObj['prayer'] = prayer.value;
    dataObj['further_study'] = further_study.value;
    dataObj['am_scripture'] = am_scripture.value;
    dataObj['pm_scripture'] = pm_scripture.value;
    dataObj['week_teaching'] = week_teaching.value;
    dataObj['image_url'] = image_url.value;
    dataObj['_token'] = _token

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
        if (responseData.status === 'success') {
            form.submit();
        }
      return message;
    }).catch(function (error){
        console.log(error);
    })
})


