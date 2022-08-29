let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;
let form = document.querySelector('form');

form.addEventListener('submit', e=>{
    e.preventDefault();
    dataObj = {}

    dataObj['email'] = email;
    dataObj['password'] = password;

    fetch("https://dailydevotionals.herokuapp.com/api/post/login.php", {
        method: 'post',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        } 
    }).then(function (response){
        return response.json();
    }).then(function (responseData){
        let status = responseData.status;
        let token = responseData._token;
        // if (responseData.status === 'success') {
        //     form.submit();
        // }
        console.log(status);
        console.log(token);
    }).catch(function (error){
        console.log(error);
    })
})