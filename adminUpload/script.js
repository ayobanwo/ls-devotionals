
let form = document.querySelector('form');

form.addEventListener('submit', e=>{
    e.preventDefault();
    let body = document.querySelector('#body').value;
    let title = document.querySelector('#title').value;
    let day = document.querySelector('#day').value;
    let bible_text = document.querySelector('#bible_text').value;
    let prayer = document.querySelector('#prayer').value;
    let further_study = document.querySelector('#further_study').value;
    let am_scripture = document.querySelector('#am_scripture').value;
    let pm_scripture = document.querySelector('#pm_scripture').value;
    let week_teaching = document.querySelector('#week_teaching').value;
    let image_url = document.querySelector('#image_url').value;

    dataObj = {};

    dataObj['body'] = body;
    dataObj['title'] = title;
    dataObj['day'] = day;
    dataObj['bible_text'] = bible_text;
    dataObj['prayer'] = prayer;
    dataObj['further_study'] = further_study;
    dataObj['am_scripture'] = am_scripture;
    dataObj['pm_scripture'] = pm_scripture;
    dataObj['week_teaching'] = week_teaching;
    dataObj['image_url'] = image_url;

    console.log(dataObj);

    fetch("https://dailydevotionals.herokuapp.com/api/post/create.php", {
        method: 'post',
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