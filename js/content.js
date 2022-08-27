
fetch(" https://dailydevotionals.herokuapp.com/api/get/getAll.php")
    .then((response) => response.json())
    .then((data) => {
        const arr = data.data
        console.log(arr);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm+ '-' + dd;
        
        console.log(today);
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

    }).catch(function (error){
        console.log(error);
    })